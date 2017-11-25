import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.COUNTING_TAB_TITLE;

class CountingTabTitle extends Component {
  render() {
    const { number, description } = this.props;
    return (
      <div className={CLASS_ROOT}>
        <div className={`${CLASS_ROOT}__number`}>{number}</div>
        <div className={`${CLASS_ROOT}__description`}>{description}</div>
      </div>
    );
  }
}

CountingTabTitle.propTypes = {
  number: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
};

CountingTabTitle.defaultProps = {
  number: 0
};

export default CountingTabTitle;
