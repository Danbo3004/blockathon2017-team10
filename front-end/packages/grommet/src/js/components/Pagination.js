'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

import ReactPaginate from 'react-paginate';
import CaretRight from './icons/magneto/CaretRight';
import CaretLeft from './icons/magneto/CaretLeft';
import ThreeDots from './icons/magneto/ThreeDots';

const CLASS_ROOT = CSSClassnames.PAGINATION;

class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactPaginate
        nextLabel={<CaretRight size="small" />}
        previousLabel={<CaretLeft size="small" />}
        breakLabel={<ThreeDots size="small" />}
        containerClassName={CLASS_ROOT}
        pageClassName={`${CLASS_ROOT}__page`}
        pageLinkClassName={`${CLASS_ROOT}__page-link`}
        activeClassName={`${CLASS_ROOT}__page--active`}
        previousClassName={`${CLASS_ROOT}__previous`}
        breakClassName={`${CLASS_ROOT}__break`}
        nextClassName={`${CLASS_ROOT}__next`}
        previousLinkClassName={`${CLASS_ROOT}__previous-link`}
        nextLinkClassName={`${CLASS_ROOT}__next-link`}
        disabledClassName={`${CLASS_ROOT}__button--disabled`}
        {...this.props}
      />
    );
  }
}
export default Pagination;
