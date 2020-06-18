import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'

export default function Post(props) {
  const { title, date, description, tags } = props.data.node.frontmatter
  const { slug, tagSlugs } = props.data.node.fields

  function renderTags() {
    return (
      <ul className="post__tags">
        {tags.map((tag, i) => (
          <li className="post__tag" key={tag}>
            <Link to={tagSlugs[i]} className="post__tag-link">
              {tags[i]}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="post">
      <h2 className="post__title">
        <Link className="post__title-link" to={slug}>
          {title}
        </Link>
      </h2>
      <p className="post__description">{description}</p>
      {/* <Link className="post__readmore" to={slug}>
          Read
        </Link> */}
      <div className="post__meta">
        <time className="post__meta-time" dateTime={moment(date).format('MMMM D, YYYY')}>
          {moment(date).format('D MMM YYYY')}
        </time>
        <span className="post__meta-divider">•</span>
        {tags && renderTags()}
      </div>
    </div>
  )
}
