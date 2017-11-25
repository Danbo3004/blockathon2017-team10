import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import Header from '@meditrak/base/dist/components/Header';
import Nav from '@meditrak/base/dist/components/Nav';
import NavProfile from '@meditrak/base/dist/components/NavProfile';
import Anchor from '@meditrak/base/dist/components/Anchor';

import './MainHeader.scss';

const CLASSROOT = 'main-header';

class MainHeader extends Component {
  render() {
    return (
      <Header className={CLASSROOT}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="app-header">
                <div className="app-header__left-col">
                  <div className="logo">+MEDITRAK</div>
                  <Nav items={this.props.menuItems} />
                </div>
                <div className="app-header__right-col">
                  <NavProfile
                    name="Tony Stark"
                    avatarUrl="http://s3.amazonaws.com/media.leeftr.com/assets/users/square/avatar-673e421c0d8d30033ad2d10010105857.png"
                    body={
                      <div className="profile-dropdown app-header__profile-dropdown">
                        <Avatar
                          className="profile-dropdown__avatar"
                          size={50}
                          round
                          src="http://s3.amazonaws.com/media.leeftr.com/assets/users/square/avatar-673e421c0d8d30033ad2d10010105857.png"
                        />
                        <div className="profile-dropdown__name">Tony Stark</div>
                        <div className="profile-dropdown__menu">
                          <Anchor path="/login" label="Log Out" />
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header>
    );
  }
}

MainHeader.propTypes = {
  menuItems: PropTypes.array.isRequired,
};

MainHeader.defaultProps = {};

export default MainHeader;
