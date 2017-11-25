// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';
import Intl from '../../../utils/Intl';
import Props from '../../../utils/Props';

const CLASS_ROOT  = CSSClassnames.CONTROL_ICON;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Icon extends Component {
  render() {
    const {className, colorIndex, noFill} = this.props;
    let {a11yTitle, size, responsive} = this.props;
    let {intl}                        = this.context;

    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-camera`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]      : size,
        [`${CLASS_ROOT}--responsive`]   : responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex,
        [`${CLASS_ROOT}--no-fill`]: noFill
      },
      "color-index-plain"
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'camera');

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'camera');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return (
      <svg className={classes} {...restProps} width="29" height="24" viewBox="0 0 29 24" xmlns="http://www.w3.org/2000/svg" aria-label={a11yTitle}>
        <title>DEEB0FE8-C0F4-4479-9CFC-2FAA4AC67AF5</title>
        <path d="M1.851 5.846l-.925.923h6.742l.256-.51 2.468-4.923-.828.51h9.872l-.828-.51 2.468 4.923.256.51h6.742l-.925-.923v17.23l.925-.922H.926l.925.923V5.847zM0 24H29V4.923h-7.096l.828.51L20.264.51 20.008 0H8.992l-.256.51-2.468 4.923.828-.51H0V24zm21.596-10.77c0-3.908-3.177-7.076-7.096-7.076S7.404 9.322 7.404 13.23c0 3.908 3.177 7.077 7.096 7.077s7.096-3.169 7.096-7.077zm-12.34 0C9.255 10.343 11.602 8 14.5 8s5.245 2.342 5.245 5.23c0 2.89-2.348 5.232-5.245 5.232-2.897 0-5.245-2.342-5.245-5.231z" fill="#DCDCDC" fillRule="evenodd"/>
      </svg>
    )
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Camera';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle : PropTypes.string,
  colorIndex: PropTypes.string,
  size      : PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool,
  noFill: PropTypes.bool
};
