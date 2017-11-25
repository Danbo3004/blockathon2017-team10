import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';

import MainHeader from './MainHeader';

import './LoggedPage.scss';

const CLASSROOT = 'logged-page';

@injectIntl
class LoggedPage extends Component {
  render() {
    const { intl } = this.props;

    const menuItems = [
      {
        label: 'Generate key',
        content: '/keys',
      },
      {
        label: 'Medical record',
        content: [
          {
            label: 'Store',
            content: '/record/store',
          },
          {
            label: 'Retrieve',
            content: '/record/retrieve',
          },
        ],
      },
    ];

    return (
      <div className={CLASSROOT}>
        <MainHeader menuItems={menuItems} />
        <div className={`${CLASSROOT}__body`}>{this.props.children}</div>
      </div>
    );
  }
}

LoggedPage.propTypes = {
  children: PropTypes.any,
  intl: PropTypes.any,
};

LoggedPage.defaultProps = {};

export default LoggedPage;
