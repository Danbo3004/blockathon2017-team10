'use strict';

import React, { Component, PropTypes } from 'react';

import DropDown from './DropDown';
import Box from './Box';
import Avatar from 'react-avatar';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.NAV_PROFILE;
class NavProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, avatarUrl, body, togglePopover, ...rest } = this.props;
    return (
      <DropDown
        body={body}
        className={CLASS_ROOT}
        rootClassName={`${CLASS_ROOT}__dropdown`}
        togglePopover={togglePopover}
        pad="none"
        {...rest}
      >
        <Box direction="row" pad={{ horizontal: 'small' }}>
          <Box justify="center">
            <Avatar size={32} round src={avatarUrl} />
          </Box>
          <Box
            direction="column"
            justify="center"
            pad={{ horizontal: 'small' }}
            className={`${CLASS_ROOT}__info`}
          >
            <Box className={`${CLASS_ROOT}__info__name`}>{name}</Box>
          </Box>
          <Box justify="center">
            <i className="fa fa-caret-down" aria-hidden="true" />
          </Box>
        </Box>
      </DropDown>
    );
  }
}

NavProfile.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  body: PropTypes.node.isRequired
};

NavProfile.defaultProps = {};

export default NavProfile;
