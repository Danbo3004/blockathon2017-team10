import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SIMPLE_USER_ITEM;

class SimpleUserItem extends Component {
  render() {
    const { name, avatarSrc } = this.props;
    return (
      <div className={CLASS_ROOT}>
        <Avatar
          className={`${CLASS_ROOT}__avatar`}
          round={true}
          size={22}
          name={name}
          src={avatarSrc}
        />
        <span className={`${CLASS_ROOT}__name`}>{name}</span>
      </div>
    );
  }
}

SimpleUserItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatarSrc: PropTypes.string.isRequired
};

SimpleUserItem.defaultProps = {};

export default SimpleUserItem;
