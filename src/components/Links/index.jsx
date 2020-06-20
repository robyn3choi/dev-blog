import React from 'react'
import './style.scss'
import '../../assets/fonts/fontello-0fb92fd9/css/fontello.css'

class Links extends React.Component {
  render() {
    const author = this.props.data

    return (
      <div className="links">
        <ul className="links__list">
          <li className="links__list-item">
            <a href={`mailto:${author.email}`}>
              <i className="icon-mail-squared" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={author.github} target="_blank" rel="noopener noreferrer">
              <i className="icon-github-squared" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={author.twitter} target="_blank" rel="noopener noreferrer">
              <i className="icon-twitter-squared" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={author.reddit} target="_blank" rel="noopener noreferrer">
              <i className="icon-reddit-squared" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={author.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="icon-linkedin-squared" />
            </a>
          </li>
        </ul>
      </div>
      // <div className="links">
      //   <ul className="links__list">
      //     <li className="links__list-item">
      //       <a href={`mailto:${author.email}`}>
      //         <i className="icon-mail" />
      //       </a>
      //     </li>
      //     <li className="links__list-item">
      //       <a href={author.github} target="_blank" rel="noopener noreferrer">
      //         <i className="icon-github-circled" />
      //       </a>
      //     </li>
      //     <li className="links__list-item">
      //       <a href={author.twitter} target="_blank" rel="noopener noreferrer">
      //         <i className="icon-twitter" />
      //       </a>
      //     </li>
      //     <li className="links__list-item">
      //       <a href={author.reddit} target="_blank" rel="noopener noreferrer">
      //         <i className="icon-reddit" />
      //       </a>
      //     </li>
      //     <li className="links__list-item">
      //       <a href={author.linkedin} target="_blank" rel="noopener noreferrer">
      //         <i className="icon-linkedin" />
      //       </a>
      //     </li>
      //   </ul>
      // </div>
    )
  }
}

export default Links
