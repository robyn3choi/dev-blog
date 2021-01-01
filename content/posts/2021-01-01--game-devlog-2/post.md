---
title: 'Game Devlog #2: Player Sprites and More Aiming'
date: '2021-01-01'
layout: post
draft: false
path: '/posts/game-devlog-2/'
category: ''
tags:
  - 'Games'
  - 'Godot Engine'
  - 'Pixel art'
description: "Imagine Enter the Gungeon but you're a Siberian Husky."
---

## Art

I decided that I wanted all the characters to be animals, like in Night in the Woods. I love dogs, so I drew the player
character as the first dog that came to mind, which for some reason turned out to be a Siberian Husky. I haven't really
interacted with any but they look pretty cool. There's still a lot of refining to do, but here's what the player looks
like from all possible angles:

![Player from all angles](./player-all-views.png)

My next step will be creating running animations for the player. I don't have much experience with pixel art animation
but I'm looking forward to figuring it out.

## Code

I continued implementing the aiming mechanic, imitating Enter the Gungeon with how gun rotates and switches hands.
Here's how it looks with a static player sprite:

![Aiming](./aiming.gif)

It took me a while to get the aiming right, and there were a few unexpected obstacles that we'll go over. My `Gun.gd`
script is a bit long so we'll go through it in chunks. This is the main logic:

```GDScript
# Gun.gd
extends Node2D

export var left_pos: Vector2
export var right_pos: Vector2

var is_on_right = true
var switch_buffer = 40
var switch_disable_distance = 500
onready var muzzle_offset_y = $Sprite/Muzzle.global_position.y - global_position.y

func _ready():
	position = right_pos

func _input(event):
	if event is InputEventMouseMotion:
		# keep rotation_degrees between 0 and 360
		rotation_degrees = fposmod(rotation_degrees, 360.0)
		var is_switch_disabled = is_switch_disabled()

		if should_be_on_right() && !is_on_right && !is_switch_disabled:
			switch_to_right()
		elif !should_be_on_right() && is_on_right && !is_switch_disabled:
			switch_to_left()

		look_at_aim_point(event.position)
```

`left_pos` and `right_pos` are the positions of the player's left and right hands. The gun's position switches between
these when certain rotation degrees are reached.

Ignore `is_switch_disabled` for now, we'll get into that in a bit. Here's the code that determines whether the gun has
reached the rotation threshold to switch hands:

```GDScript
func should_be_on_right():
	if is_on_right:
		return rotation_degrees <= 90 + switch_buffer || rotation_degrees > 270 - switch_buffer
	else:
		return rotation_degrees <= 90 - switch_buffer || rotation_degrees > 270 + switch_buffer
```

When `rotation_degrees` is 0, the gun is pointing straight to the right. This means that when `rotation_degrees` is 90,
it's pointing down, and when `rotation_degrees` is 270, it's pointing up. So if
`rotation_degrees <= 90 || rotation_degrees > 270`, the gun is pointing toward the right and should be in the right
hand. Otherwise, it should be in the left hand.

So what's `switch_buffer` doing in there? In the gif above, you'll notice that the gun doesn't switch hands right when
the cursor crosses the 90° or 270° threshold. There's actually a buffer of 40° where the gun will not stay on its
current hand. Without this buffer, the gun would rapidly switch back and forth between hands when its rotation was near
the switch threshold. This is because the gun's rotation changes when it switches hands, since it needs to point to the
cursor. So if the gun is on the right and reaches 90°, it would switch to the left and rotate so that it's aiming at the
cursor, but now its rotation is actually less than 90°. Here's what happens without this buffer:

![Without switch_buffer](./without-buffer.gif)

This is how the gun actually switches hands:

```GDScript
func switch_to_left():
	# flip the sprite
	$Sprite.scale = Vector2(1, -1)
	# shift the sprite so it looks like it flipped along the bottom of the sprite instead of the middle
	# without this, it look
	$Sprite.position.y += $Sprite.texture.get_height()
	# go to the left hand
	position = left_pos
	is_on_right = false

func switch_to_right():
	$Sprite.scale = Vector2(1, 1)
	$Sprite.position.y -= $Sprite.texture.get_height()
	position = right_pos
	is_on_right = true

```

Without `$Sprite.position.y += $Sprite.texture.get_height()` and the inverse, this is what would happen:

![Without shifting $Sprite.position.y](./without-shift.gif)

When `is_switch_disabled` is `true`, the gun will not switch hands even when the gun's rotation is at a point where it
would normally would switch. This was necessary to prevent the gun from rapidly switching hands when the gun's rotation
was near the threshold.
