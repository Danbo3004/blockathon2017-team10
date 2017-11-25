// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Button from './Button';
import RadioButton from './RadioButton';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TAB;

export default class Tab extends Component {

  constructor() {
    super();

    this._onClickTab = this._onClickTab.bind(this);
  }

  _onClickTab(event) {
    const {onRequestForActive} = this.props;
    if (event) {
      event.preventDefault();
    }
    onRequestForActive();
  }

  render() {
    const {active, radio, className, id, title, ...props} = this.props;
    delete props.onRequestForActive;
    const classes = classnames(
      CLASS_ROOT, {
        [`${CLASS_ROOT}--active`]: active
      },
      className
    );

    let radioButton = '';
    if (radio != '') {
      radioButton = (
        <RadioButton name={radio} id={`tab_radio_${id}`} label='' checked={active}></RadioButton>
      );
    }

    let titleNode;
    titleNode = (
      <Button className={`${CLASS_ROOT}__button`} plain={true}
              role='tab' aria-selected={active}
              onClick={this._onClickTab} aria-expanded={active}>
        {radioButton}
        <label className={`${CLASS_ROOT}__label`} htmlFor={id}>
          {title}
        </label>
      </Button>
    );

    return (
      <li {...props} className={classes} id={id}>
        {titleNode}
      </li>
    );
  }
}

Tab.propTypes = {
  title             : PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.bool.isRequired
  ]),
  radio             : PropTypes.string,
  active            : PropTypes.bool,
  id                : PropTypes.string,
  onRequestForActive: PropTypes.func // from Tabs
};

Tab.defaultProps = {
  radio: ''
};
