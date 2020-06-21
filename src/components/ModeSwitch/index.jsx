import React from 'react'
import Switch from 'react-switch'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import moon from './moon.png'
import sun from './sun.png'
import './style.scss'

export default class ModeSwitch extends React.Component {
  render() {
    const moonIcon = <img src={moon} alt="dark mode icon" className="mode-switch__icon" />
    const sunicon = <img src={sun} alt="dark mode icon" className="mode-switch__icon" />

    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => {
          // Don't render anything at compile time. Deferring rendering until we
          // know which theme to use on the client avoids incorrect initial
          // state being displayed.
          if (theme == null) {
            return null
          }
          return (
            <label>
              <Switch
                className="mode-switch"
                aria-label="dark/light mode toggle"
                checkedIcon={moonIcon}
                uncheckedIcon={sunicon}
                onChange={checked => toggleTheme(checked ? 'dark' : 'light')}
                checked={theme === 'dark'}
                offColor="#5a78bb"
                onColor="#5a78bb"
              />
            </label>
          )
        }}
      </ThemeToggler>
    )
  }
}
