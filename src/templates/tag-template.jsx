import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import TagTemplateDetails from '../components/TagTemplateDetails';
import SEO from '../components/SEO';

class TagTemplate extends React.Component {
  render() {
    const { title } = this.props.data.site.siteMetadata;
    const { tag } = this.props.pageContext;

    return (
      <Layout>
        <div>
          <SEO title={`All Posts tagged as "${tag}"`} />
          <Sidebar {...this.props} />
          <TagTemplateDetails {...this.props} />
        </div>
      </Layout>
    );
  }
}

export default TagTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
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
          youtube
        }
      }
    }
    allMdx(
      limit: 1000
      filter: { frontmatter: { tags: { in: [$tag] }, layout: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
            tagSlugs
          }
          frontmatter {
            title
            date
            category
            description
            tags
          }
        }
      }
    }
  }
`;
