'use strict'

import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import CSSClassnames from '../utils/CSSClassnames'

import Loading from './Loading'
import Box from './Box'

const CLASS_ROOT = CSSClassnames.LOADING_BOX;
class LoadingBox extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {className, size, pad, label} = this.props

    const classes = classnames(
      CLASS_ROOT,
      className,
      `${CLASS_ROOT}--${size}`
    )

    return (
      <Box className={classes} pad={pad} justify="center" align="center">
        <Loading size={size}/>
        <span className={`${CLASS_ROOT}__label`}>{label}</span>
      </Box>
    )
  }
}

LoadingBox.propTypes = {
  size : PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string,
  pad  : PropTypes.object
}

LoadingBox.defaultProps = {
  size : 'medium',
  pad  : {vertical: 'large'},
  label: 'Đang tải...'
}

export default LoadingBox
