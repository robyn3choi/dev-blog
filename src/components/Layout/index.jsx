import React from 'react';
import ModeSwitch from '../ModeSwitch';
import '../../assets/scss/init.scss';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="layout">
        {children}
        <ModeSwitch />
      </div>
    );
  }
}

export default Layout;
