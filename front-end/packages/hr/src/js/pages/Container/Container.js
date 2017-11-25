import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class Container extends Component {
  render() {
    return <div className="app-body">{this.props.children}</div>;
  }
}

Container.contextTypes = {
  router: PropTypes.object.isRequired,
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
