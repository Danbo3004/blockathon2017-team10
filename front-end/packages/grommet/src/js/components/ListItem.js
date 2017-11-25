// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Props from '../utils/Props';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.LIST_ITEM;

export default class ListItem extends Component {
  render() {
    const { children, className, onClick, header } = this.props;

    const classes = classnames(CLASS_ROOT, className, {
      [`${CLASS_ROOT}--selectable`]: onClick,
      [`${CLASS_ROOT}--header`]: header
    });

    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    const restProps = Props.omit(this.props, Object.keys(ListItem.propTypes));

    return (
      <Box {...boxProps} {...restProps} tag="li" className={classes}>
        {children}
      </Box>
    );
  }
}

ListItem.propTypes = {
  ...Box.propTypes,
  header: PropTypes.bool
};

ListItem.defaultProps = {
  align: 'center',
  direction: 'row',
  pad: { horizontal: 'medium', vertical: 'small' },
  separator: 'bottom',
  role: 'listitem',
  header: false
};
