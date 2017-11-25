// (C) Copyleft 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';
import Intl from '../../../utils/Intl';
import Props from '../../../utils/Props';

const CLASS_ROOT = CSSClassnames.CONTROL_ICON;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Icon extends Component {
  render() {
    const { className, colorIndex } = this.props;
    let { a11yTitle, size, responsive } = this.props;
    let { intl } = this.context;

    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-carret-left`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      },
      'color-index-plain'
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'carret-down');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return (
      <svg
        {...restProps}
        width="9px"
        height="12px"
        viewBox="0 0 6 8"
        className={classes}
        aria-label={a11yTitle}
      >
        <g stroke="none" fillRule="evenodd">
          <g transform="translate(-149.000000, -327.000000)">
            <polygon
              transform="translate(152.000000, 331.000000) scale(-1, 1) rotate(90.000000) translate(-152.000000, -331.000000) "
              points="152 329 156 333 148 333"
            />
          </g>
        </g>
      </svg>
    );
  }
}

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'CarretLeft';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};
