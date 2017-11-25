import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Anchor from './Anchor';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.BREADCRUMB;

class Breadcrumb extends Component {
  render() {
    const items = this.props.items;

    return (
      <div className={CLASS_ROOT}>
        {items.map(item => {
          return <Anchor label={item.label} path={item.path} />;
        })}
      </div>
    );
  }
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string
    })
  ).isRequired
};

Breadcrumb.defaultProps = {};

export default Breadcrumb;
