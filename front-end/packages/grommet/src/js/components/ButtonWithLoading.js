// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Button from './Button';
import Loading from './Loading';

const CLASS_ROOT = CSSClassnames.BUTTON;

export default class ButtonWithLoading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, isLoading, loadingLabel, disabled, ...rest } = this.props;

    const classes = classnames(className, `${CLASS_ROOT}--loading`);

    return disabled ? (
      <Button className={classes} {...rest} onClick={null} href="" />
    ) : isLoading ? (
      <Button className={classes} label={loadingLabel} icon={<Loading size="small" />} {...rest} />
    ) : (
      <Button {...rest} />
    );
  }
}

ButtonWithLoading.propTypes = {
  loadingLabel: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool
};

ButtonWithLoading.defaultProps = {
  loadingLabel: 'Saving...',
  isLoading: false,
  disabled: false
};
