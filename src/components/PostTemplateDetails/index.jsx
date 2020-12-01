import React from 'react';
import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import moment from 'moment';
import Links from '../Links';
import EmailSubscribe from '../EmailSubscribe';
import './style.scss';

class PostTemplateDetails extends React.Component {
  render() {
    const { subtitle, author } = this.props.data.site.siteMetadata;
    const post = this.props.data.mdx;
    const tags = post.fields.tagSlugs;
    const { previous, next } = this.props.pageContext;

    function renderTags() {
      return (
        <ul className="post-single__tags tags">
          {tags.map((tag, i) => (
            <li className="post-single__tag tag" key={tag}>
              <Link to={tags[i]} className="post-single__tag-link tag-link">
                {post.frontmatter.tags[i]}
              </Link>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="post-single">
        <div className="post-single__home-link">
          <Link to="/">BitBirdy</Link>
        </div>
        <div className="post-single__inner">
          <h1 className="post-single__title">{post.frontmatter.title}</h1>
          <div className="post-single__meta">
            <time className="post-single__meta-time" dateTime={moment(post.frontmatter.date).format('MMMM D, YYYY')}>
              {moment(post.frontmatter.date).format('D MMM YYYY')}
            </time>
            <span className="post-single__meta-divider">•</span>
            {tags && renderTags()}
          </div>
          <div className="post-single__body">
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
        </div>
        <hr />
        <div className="post-single__footer">
          <p className="post-single__footer-text">
            {subtitle}
            &nbsp;To see some of my work, check out my&nbsp;
            <a href={author.portfolio} target="_blank" rel="noopener noreferrer">
              portfolio website
            </a>
            .
          </p>
          <Links data={author} />
          <div className="post-single__footer-nav">
            <div className="post-single__footer-nav-link">
              {previous && (
                <Link className="post-single__footer-prev" to={previous.fields.slug} rel="prev">
                  <i className="arrow left" />
                  {previous.frontmatter.title}
                </Link>
              )}
            </div>
            <div className="post-single__footer-nav-link">
              <Link className="post-single__footer-home" to="/">
                All Posts
              </Link>
            </div>
            <div className="post-single__footer-nav-link">
              {next && (
                <Link className="post-single__footer-next" to={next.fields.slug} rel="next">
                  {next.frontmatter.title}
                  <i className="arrow right" />
                </Link>
              )}
            </div>
          </div>
          <EmailSubscribe isInFooter />
        </div>
      </div>
    );
  }
}

export default PostTemplateDetails;
