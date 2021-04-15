import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PostTemplateDetails from '../components/PostTemplateDetails';
import SEO from '../components/SEO';

class PostTemplate extends React.Component {
  render() {
    const { subtitle } = this.props.data.site.siteMetadata;
    const post = this.props.data.mdx;
    const { title: postTitle, description: postDescription, ogimage } = post.frontmatter;

    const description = postDescription !== null ? postDescription : subtitle;
    const ogImagePath = ogimage && ogimage.childImageSharp.fixed.src;

    return (
      <Layout>
        <div>
          <SEO title={`${postTitle}`} description={description} image={ogImagePath} />
          <PostTemplateDetails {...this.props} />
        </div>
      </Layout>
    );
  }
}

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
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
        disqusShortname
        url
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        tagSlugs
        slug
      }
      frontmatter {
        title
        tags
        date
        description
        ogimage {
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
    }
  }
`;
