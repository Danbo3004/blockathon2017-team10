import React, { Component } from 'react';

import FileRetrieveContainer from 'containers/FileRetrieveContainer';
import './FileRetrievePage.scss';

const CLASSROOT = 'file-retrieve-page';

class FileRetrievePage extends Component {
  render() {
    return <FileRetrieveContainer />;
  }
}

FileRetrievePage.propTypes = {};

FileRetrievePage.defaultProps = {};

export default FileRetrievePage;
