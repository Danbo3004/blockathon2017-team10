import React, { Component } from 'react';

import GenKeyContainer from 'containers/GenKeyContainer';
import './GenKeyPage.scss';

const CLASSROOT = 'genkey-page';

class GenKeyPage extends Component {
  render() {
    return <GenKeyContainer />;
  }
}

GenKeyPage.propTypes = {};

GenKeyPage.defaultProps = {};

export default GenKeyPage;
