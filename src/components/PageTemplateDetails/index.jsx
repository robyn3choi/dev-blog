import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Sidebar from '../Sidebar';
import './style.scss';

class PageTemplateDetails extends React.Component {
  render() {
    const page = this.props.data.mdx;

    return (
      <div>
        <Sidebar {...this.props} />
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <h1 className="page__title">{page.frontmatter.title}</h1>
              <div className="page__body">
                <MDXRenderer>{page.body}</MDXRenderer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageTemplateDetails;
