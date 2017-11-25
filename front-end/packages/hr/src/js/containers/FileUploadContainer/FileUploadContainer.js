import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import Box from '@meditrak/base/dist/components/Box';

import FileUpload from './FileUpload';

import './FileUploadContainer.scss';

@observer
export default class FileUploadContainer extends Component {
  render() {
    return <FileUpload {...this.props} />;
  }
}

FileUploadContainer.propTypes = {};
