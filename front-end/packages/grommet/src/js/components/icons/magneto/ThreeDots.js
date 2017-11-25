// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

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
      `${CLASS_ROOT}-three-dots`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      },
      'color-index-plain'
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'three-dots');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return (
      <svg
        {...restProps}
        version="1.1"
        viewBox="0 0 20 4"
        width="20px"
        height="4px"
        role="img"
        className={classes}
        aria-label={a11yTitle}
      >
        <g id="Page-1" stroke="none" strokeWidth="0" fill="none">
          <g id="three-dots" transform="translate(-1251.000000, -295.000000)">
            <g id="Group-14" transform="translate(435.000000, 265.000000)">
              <g id="Group-7-Copy-5" transform="translate(30.000000, 19.000000)">
                <g id="Group-8" transform="translate(612.000000, 0.000000)">
                  <g id="Group-7" transform="translate(167.315789, 0.000000)">
                    <g id="3dots" transform="translate(7.000000, 11.000000)">
                      <ellipse id="Oval-3" cx="1.82261209" cy="2" rx="1.82261209" ry="2" />
                      <ellipse id="Oval-3-Copy" cx="9.84210526" cy="2" rx="1.82261209" ry="2" />
                      <ellipse id="Oval-3-Copy-2" cx="17.8615984" cy="2" rx="1.82261209" ry="2" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
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

Icon.displayName = 'CaretNext';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};
