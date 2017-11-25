import React, { Component, PropTypes } from 'react';
import CSSClassnames from '../utils/CSSClassnames';
import Avatar from 'react-avatar';
import Dropzone from 'react-dropzone';

import Box from './Box';
import LoadingBox from './LoadingBox';

const CLASS_ROOT = CSSClassnames.UPLOAD_AVATAR;

class UploadAvatar extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      name,
      src,
      size,
      round,
      reuploadTitle,
      accept,
      onDrop,
      maxSize,
      isUploading
    } = this.props;
    const style = {
      width: `${size}px`,
      height: `${size}px`
    };

    if (round) style.borderRadius = '50%';

    const empty = isUploading ? (
      <Box
        className={`${CLASS_ROOT}--empty`}
        justify="center"
        align="center"
        style={style}
      >
        <LoadingBox size="small" pad="small" />
      </Box>
    ) : (
      <Dropzone accept={accept} onDrop={onDrop} maxSize={maxSize}>
        <Box
          className={`${CLASS_ROOT}--empty`}
          justify="center"
          align="center"
          style={style}
        />
      </Dropzone>
    );

    return (
      <Box className={CLASS_ROOT}>
        {(name && name.length) || (src && src.length) ? (
          <Box className={`${CLASS_ROOT}--full`}>
            <Avatar round={round} size={size} name={name} src={src} />
            <Dropzone
              accept={accept}
              onDrop={onDrop}
              maxSize={maxSize}
              style={{ width: `${size}px` }}
            >
              {reuploadTitle}
            </Dropzone>
          </Box>
        ) : (
          empty
        )}
      </Box>
    );
  }
}

export default UploadAvatar;

UploadAvatar.propTypes = {
  round: PropTypes.bool,
  size: PropTypes.number,
  name: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.node,
  reuploadTitle: PropTypes.node,
  accept: PropTypes.string,
  onDrop: PropTypes.func,
  maxSize: PropTypes.number,
  isUploading: PropTypes.bool
};

UploadAvatar.defaultProps = {
  size: 120,
  round: true,
  title: (
    <span>
      Đăng tải hình<br />ứng viên
    </span>
  ),
  reuploadTitle: <span>Thay ảnh khác</span>,
  accept: 'image/*',
  maxSize: 1000000
};
