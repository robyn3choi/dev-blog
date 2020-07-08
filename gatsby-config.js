const lost = require('lost');
const pxtorem = require('postcss-pxtorem');

const url = 'https://bitbirdy.dev';

module.exports = {
  siteMetadata: {
    url,
    siteUrl: url,
    title: 'BitBirdy',
    subtitle:
      'A front-end web development blog by Robyn Choi, a professional JavaScripter and amateur pixel artist in Vancouver, BC.',
    description: 'A front-end web development blog by Robyn Choi.',
    copyright: '© 2020 Robyn Choi',
    disqusShortname: '',
    menu: [
      {
        label: 'Posts',
        path: '/',
      },
      {
        label: 'Tags',
        path: '/tags',
      },
      {
        label: 'About',
        path: '/about/',
      },
    ],
    author: {
      name: 'BitBirdy',
      email: 'robyn3choi@gmail.com',
      twitter: 'https://twitter.com/BitBirdyDev',
      github: 'https://github.com/robyn3choi',
      linkedin: 'https://www.linkedin.com/in/robyn-choi',
      reddit: 'https://www.reddit.com/user/bitbirdy',
      portfolio: 'https://robynchoi.me',
      // rss: '#',
    },
  },
  plugins: [
    'gatsby-plugin-dark-mode',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-plugin-feed-mdx',
      options: {
        query: `
          {
            site {
              siteMetadata {
                url
                title
                description: subtitle
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map((edge) =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.url + edge.node.fields.slug,
                  guid: site.siteMetadata.url + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.body }],
                })
              ),
            query: `
              {
                allMdx(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      body
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        layout
                        draft
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        plugins: ['gatsby-remark-images'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 960 },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: 'UA-170244271-1' },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Noto Sans:300,400,500', 'Zilla Slab:400,500,600,700', 'Fira Code'],
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          lost(),
          pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: [
              'font',
              'font-size',
              'line-height',
              'letter-spacing',
              'margin',
              'margin-top',
              'margin-left',
              'margin-bottom',
              'margin-right',
              'padding',
              'padding-top',
              'padding-left',
              'padding-bottom',
              'padding-right',
              'border-radius',
              'width',
              'max-width',
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
          }),
        ],
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'BitBirdy',
        short_name: 'BitBirdy',
        start_url: '/',
        background_color: '#1b1e24',
        theme_color: '#4bb1da',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    // {
    //   resolve: 'gatsby-plugin-next-seo',
    //   options: {
    //     openGraph: {
    //       type: 'website',
    //       url: 'https://bitbirdy.dev/',
    //       site_name: 'BitBirdy',
    //     },
    //     twitter: {
    //       handle: '@_bitbirdy',
    //       cardType: 'summary_large_image',
    //     },
    //   },
    // },
  ],
};
