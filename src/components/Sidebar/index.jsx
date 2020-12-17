import React from 'react';
import get from 'lodash/get';
import { Link } from 'gatsby';
import Menu from '../Menu';
import Links from '../Links';
import EmailSubscribe from '../EmailSubscribe';
import profilePic from './bitbirdy.png';
import './style.scss';

class Sidebar extends React.Component {
  render() {
    const { location } = this.props;
    const { author, subtitle, copyright, menu } = this.props.data.site.siteMetadata;
    const isHomePage = get(location, 'pathname', '/') === '/';

    /* eslint-disable jsx-a11y/img-redundant-alt */
    const authorBlock = (
      <div>
        <Link to="/">
          {/* <span className="sidebar__avatar-background" /> */}
          <img src={profilePic} className="sidebar__avatar" alt={author.name} />
        </Link>
        {isHomePage ? (
          <h1 className="sidebar__author-title">
            <Link className="sidebar__author-title-link" to="/">
              {author.name}
            </Link>
          </h1>
        ) : (
          <h2 className="sidebar__author-title">
            <Link className="sidebar__author-title-link" to="/">
              {author.name}
            </Link>
          </h2>
        )}
        <p className="sidebar__author-subtitle">{subtitle}</p>
        <p className="sidebar__author-subtitle">
          To see some of my work, check out my&nbsp;
          <a href={author.portfolio} target="_blank" rel="noopener noreferrer">
            portfolio website
          </a>
          .
        </p>
      </div>
    );
    /* eslint-enable jsx-a11y/img-redundant-alt */

    return (
      <div className="sidebar">
        <div className="sidebar__inner">
          <div className="sidebar__author">{authorBlock}</div>
          <div>
            <Menu data={menu} />
            <Links data={author} />
            <EmailSubscribe />
            <p className="sidebar__copyright">{copyright}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
