const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const slash = require('slash');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post-template.jsx');
    const pageTemplate = path.resolve('./src/templates/page-template.jsx');
    const tagTemplate = path.resolve('./src/templates/tag-template.jsx');
    const categoryTemplate = path.resolve('./src/templates/category-template.jsx');

    graphql(`
      {
        allMdx(
          limit: 1000
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                layout
                category
                title
              }
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }

      const posts = result.data.allMdx.edges.filter((edge) => edge.node.frontmatter.layout === 'post');
      posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
          path: post.node.fields.slug,
          component: slash(postTemplate),
          context: { slug: post.node.fields.slug, previous, next },
        });
      });

      _.each(result.data.allMdx.edges, (edge) => {
        if (_.get(edge, 'node.frontmatter.layout') === 'page') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(pageTemplate),
            context: { slug: edge.node.fields.slug },
          });
        } else if (_.get(edge, 'node.frontmatter.layout') === 'post') {
          // createPage({
          //   path: edge.node.fields.slug,
          //   component: slash(postTemplate),
          //   context: { slug: edge.node.fields.slug },
          // })

          let tags = [];
          if (_.get(edge, 'node.frontmatter.tags')) {
            tags = tags.concat(edge.node.frontmatter.tags);
          }

          tags = _.uniq(tags);
          _.each(tags, (tag) => {
            const tagPath = `/tags/${_.kebabCase(tag)}/`;
            createPage({
              path: tagPath,
              component: tagTemplate,
              context: { tag },
            });
          });

          let categories = [];
          if (_.get(edge, 'node.frontmatter.category')) {
            categories = categories.concat(edge.node.frontmatter.category);
          }

          categories = _.uniq(categories);
          _.each(categories, (category) => {
            const categoryPath = `/categories/${_.kebabCase(category)}/`;
            createPage({
              path: categoryPath,
              component: categoryTemplate,
              context: { category },
            });
          });
        }
      });

      resolve();
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath);
    const slug = `/${parsedFilePath.dir.split('--')[1]}/`;
    createNodeField({ node, name: 'slug', value: slug });
  } else if (node.internal.type === 'Mdx' && typeof node.slug === 'undefined') {
    const fileNode = getNode(node.parent);
    let slug;
    if (typeof node.frontmatter.path !== 'undefined') {
      slug = node.frontmatter.path;
    } else {
      slug = fileNode.fields.slug;
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map((tag) => `/tags/${_.kebabCase(tag)}/`);
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${_.kebabCase(node.frontmatter.category)}/`;
      createNodeField({ node, name: 'categorySlug', value: categorySlug });
    }
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
