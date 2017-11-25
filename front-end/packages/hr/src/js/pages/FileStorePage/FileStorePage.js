import React, { Component } from 'react';

import FileStoreContainer from 'containers/FileStoreContainer';
import './FileStorePage.scss';

const CLASSROOT = 'filestore-page';

class FileStorePage extends Component {
  render() {
    return <FileStoreContainer />;
  }
}

FileStorePage.propTypes = {};

FileStorePage.defaultProps = {};

export default FileStorePage;
