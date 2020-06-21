import React from 'react'
import Helmet from 'react-helmet'
import ModeSwitch from '../ModeSwitch'
import '../../assets/scss/init.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet defaultTitle="BitBirdy - A front-end web dev blog" />
        {children}
        <ModeSwitch />
      </div>
    )
  }
}

export default Layout
