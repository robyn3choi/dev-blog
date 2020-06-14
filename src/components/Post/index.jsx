import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'

export default function Post(props) {
  const { title, date, category, description, tags } = props.data.node.frontmatter
  const { slug, categorySlug, tagSlugs } = props.data.node.fields
  console.log(tags)
  function renderTags() {
    return (
      <div className="post__tags">
        <ul className="post__tags-list">
          {tags.map((tag, i) => (
            <li className="post__tags-list-item" key={tag}>
              <Link to={tagSlugs[i]} className="post__tags-list-item-link">
                {tags[i]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="post">
      <h2 className="post__title">
        <Link className="post__title-link" to={slug}>
          {title}
        </Link>
      </h2>
      <div className="post__meta">
        <time className="post__meta-time" dateTime={moment(date).format('MMMM D, YYYY')}>
          {moment(date).format('MMM DD YYYY')}
        </time>
        <span className="post__meta-divider" />
        {tags && renderTags()}
      </div>
      <p className="post__description">{description}</p>
      {/* <Link className="post__readmore" to={slug}>
          Read
        </Link> */}
    </div>
  )
}
