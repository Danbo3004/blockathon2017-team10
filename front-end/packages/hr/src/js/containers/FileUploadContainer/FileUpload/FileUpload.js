import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import Box from '@meditrak/base/dist/components/Box';
import Anchor from '@meditrak/base/dist/components/Anchor';

import './FileUpload.scss';

const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  console.log(reader);
};

const FileUpload = observer(({ onSelect, file }) => {
  let fileInputRef;

  const handleOnSelect = (event) => {
    event.preventDefault();
    onSelect(event.target.files[0]);
  };

  return (
    <Box className="file-upload">
      <input
        ref={(ref) => {
          fileInputRef = ref;
        }}
        type="file"
        onChange={handleOnSelect}
        className="file-upload__input"
      />
      <Box direction="row" pad={{ between: 'small' }}>
        <Anchor onClick={() => fileInputRef.click()} label="Choose file" />
        <span>{file && file.name}</span>
      </Box>
    </Box>
  );
});

FileUpload.propTypes = {
  onSelect: PropTypes.func,
};

export default FileUpload;
