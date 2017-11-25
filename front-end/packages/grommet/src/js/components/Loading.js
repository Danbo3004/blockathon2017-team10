'use strict'

import React, { Component, PropTypes } from 'react'
import CSSClassnames from '../utils/CSSClassnames'
import classnames from 'classnames'

const CLASS_ROOT = CSSClassnames.LOADING;
class Loading extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { size } = this.props

    const className = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}--${size}`
    )

    return <div className={className} />
  }
}

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large'])
}

Loading.defaultProps = {
  size: 'medium'
}

export default Loading
