import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Disqus from '../Disqus/Disqus'
import './style.scss'

class PostTemplateDetails extends React.Component {
  render() {
    const { subtitle, author } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const tags = post.fields.tagSlugs

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/">
          All Articles
        </Link>
      </div>
    )

    function renderTags() {
      return (
        <ul className="post-single__tags">
          {tags.map((tag, i) => (
            <li className="post-single__tag" key={tag}>
              <Link to={tags[i]} className="post-single__tag-link">
                {post.frontmatter.tags[i]}
              </Link>
            </li>
          ))}
        </ul>
      )
    }

    const commentsBlock = (
      <div>
        <Disqus postNode={post} siteMetadata={this.props.data.site.siteMetadata} />
      </div>
    )

    return (
      <div>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{post.frontmatter.title}</h1>
            {/* <time className="post-single__date">{moment(post.frontmatter.date).format('D MMM YYYY')}</time> */}
            <div className="post-single__meta">
              <time className="post-single__meta-time" dateTime={moment(post.frontmatter.date).format('MMMM D, YYYY')}>
                {moment(post.frontmatter.date).format('D MMM YYYY')}
              </time>
              <span className="post-single__meta-divider">•</span>
              {tags && renderTags()}
            </div>
            <div
              className="post-single__body"
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
          <div className="post-single__footer">
            {/* {tagsBlock} */}
            <hr />
            <p className="post-single__footer-text">
              {subtitle}
              {/* <a
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <br /> <strong>{author.name}</strong> on Twitter
              </a> */}
            </p>
            {commentsBlock}
          </div>
        </div>
      </div>
    )
  }
}

export default PostTemplateDetails
