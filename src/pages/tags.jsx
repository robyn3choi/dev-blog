import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import SEO from '../components/SEO';

class TagsRoute extends React.Component {
  render() {
    const { title } = this.props.data.site.siteMetadata;
    const tags = this.props.data.allMdx.group;

    return (
      <Layout>
        <div>
          <SEO title={`All Tags`} />
          <Sidebar {...this.props} />
          <div className="content">
            <div className="content__inner">
              <div className="page">
                <h1 className="page__title">Tags</h1>
                <div className="page__body">
                  <ul className="tags">
                    {tags.map((tag) => (
                      <li key={tag.fieldValue} className="tag">
                        <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className="tag-link">
                          {tag.fieldValue} ({tag.totalCount})
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TagsRoute;

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          github
          linkedin
          reddit
          portfolio
          twitter
        }
      }
    }
    allMdx(limit: 2000, filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
