'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-popover';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.DROPDOWN;
class DropDown extends Component {
  constructor(props) {
    super(props);
    this.togglePopover = this.togglePopover.bind(this);

    this.state = {
      isOpen: false
    };
  }
  // @TODO: vi.nt - need to verify this logic, may be it'll conflict with function togglePopover in this  component
  componentWillReceiveProps(nextProps) {
    if (
      this.props.togglePopover !== undefined &&
      nextProps.togglePopover !== undefined
    ) {
      if (this.props.togglePopover !== nextProps.togglePopover) {
        console.log('togle popover from external', nextProps.togglePopover);
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    }
  }

  togglePopover(state) {
    if (state === undefined) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    } else {
      this.setState({
        isOpen: state
      });
    }
  }

  render() {
    const {
      className,
      bodyClassName,
      rootClassName,
      place,
      body,
      dark,
      showOnHover,
      pad,
      isAlwaysCloseWhenClick,
      ...rest
    } = this.props;

    return (
      <Popover
        isOpen={this.state.isOpen}
        place={place}
        {...rest}
        className={`${CLASS_ROOT}__popup ${CLASS_ROOT}__popup--${place} ${dark
          ? `${CLASS_ROOT}__popup--dark`
          : ''} ${rootClassName || ''}`}
        body={
          <div
            className={`${CLASS_ROOT}__body ${CLASS_ROOT}__body--pad-${pad} ${bodyClassName ||
              ''}`}
          >
            {body}
          </div>
        }
        onOuterAction={() => this.togglePopover()}
        isAlwaysCloseWhenClick={isAlwaysCloseWhenClick}
      >
        <div
          onClick={showOnHover ? () => {} : () => this.togglePopover()}
          onMouseOver={showOnHover ? () => this.togglePopover(true) : () => {}}
          onMouseOut={showOnHover ? () => this.togglePopover(false) : () => {}}
          className={`${CLASS_ROOT} ${className || ''}`}
        >
          {this.props.children}
        </div>
      </Popover>
    );
  }
}

DropDown.propTypes = {
  body: PropTypes.any.isRequired,
  place: PropTypes.oneOf(['left', 'right', 'below', 'above']),
  pad: PropTypes.oneOf(['small', 'none', 'large']),
  showOnHover: PropTypes.bool,
  dark: PropTypes.bool,
  isAlwaysCloseWhenClick: PropTypes.bool,
  bodyClassName: PropTypes.string,
  rootClassName: PropTypes.string
};

DropDown.defaultProps = {
  place: 'below',
  showOnHover: false,
  pad: 'small',
  dark: false,
  isAlwaysCloseWhenClick: false
};

export default DropDown;
