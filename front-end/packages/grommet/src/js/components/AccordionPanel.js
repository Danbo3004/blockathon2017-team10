// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Header from './Header';
import Button from './Button';
import ListItem from './ListItem';
import Box from './Box';
import CaretNextIcon from './icons/magneto/CaretRight';
import Collapsible from './Collapsible';

import CSSClassnames from '../utils/CSSClassnames';
import Intl from '../utils/Intl';

const CLASS_ROOT = CSSClassnames.ACCORDION_PANEL;

export default class AccordionPanel extends Component {
  constructor() {
    super();

    this._onClickTab = this._onClickTab.bind(this);
  }

  _onClickTab(event) {
    const { onChange } = this.props;
    if (event) {
      event.preventDefault();
    }
    onChange();
  }

  render() {
    const {
      a11yTitle,
      active,
      animate,
      className,
      children,
      heading,
      pad,
      caret,
      caretPos,
      caretExpandOnly,
      isCollapsible,
      headerSize,
      separator
    } = this.props;
    const { intl } = this.context;

    const classes = classnames(CLASS_ROOT, className, {
      [`${CLASS_ROOT}--active`]: active,
      [`${CLASS_ROOT}--inactive-animate`]: !active
    });

    const tabContentTitle = Intl.getMessage(intl, 'Tab Contents', {
      activeTitle: a11yTitle || heading
    });

    let caretComponent = caret ? (
      caret
    ) : (
      <CaretNextIcon
        className={`${CLASS_ROOT}__control ${!isCollapsible && `${CLASS_ROOT}__control--hidden`}`}
        size="xsmall"
      />
    );
    caretComponent = caretExpandOnly
      ? React.cloneElement(caretComponent, { onClick: this._onClickTab })
      : caretComponent;

    const headerComponent =
      caretPos === 'right' ? (
        <Header
          pad={pad}
          direction="row"
          justify="between"
          align="center"
          responsive={false}
          className={`${CLASS_ROOT}__header`}
          size={headerSize}
        >
          {heading}
          {caretComponent}
        </Header>
      ) : (
        <Header
          pad={pad}
          direction="row"
          justify="between"
          align="center"
          responsive={false}
          className={`${CLASS_ROOT}__header`}
          size={headerSize}
        >
          {caretComponent}
          {heading}
        </Header>
      );

    // Render collapsible component, padding left/right = icon size
    const collapsibleComponent =
      caretPos === 'right' ? (
        <Collapsible
          className={classes}
          aria-label={tabContentTitle}
          role="tabpanel"
          active={active}
          animate={animate}
          pad={pad}
        >
          <Box direction="row">
            {children}
            <CaretNextIcon
              className={`${CLASS_ROOT}__control ${CLASS_ROOT}__control--hidden`}
              size="xsmall"
            />
          </Box>
        </Collapsible>
      ) : (
        <Collapsible
          className={classes}
          aria-label={tabContentTitle}
          role="tabpanel"
          active={active}
          animate={animate}
          pad={pad}
        >
          <Box direction="row">
            <CaretNextIcon
              className={`${CLASS_ROOT}__control ${CLASS_ROOT}__control--hidden`}
              size="xsmall"
            />
            {children}
          </Box>
        </Collapsible>
      );

    return (
      <div>
        <ListItem
          className={classes}
          direction="column"
          pad="none"
          aria-expanded={active}
          aria-selected={active}
          role="tab"
          aria-label={a11yTitle || heading}
          separator={active ? 'top' : separator}
        >
          {caretExpandOnly ? (
            headerComponent
          ) : (
            <Button
              className={`${CLASS_ROOT}__content-wrapper`}
              fill={true}
              plain={true}
              onClick={this._onClickTab}
            >
              {headerComponent}
            </Button>
          )}
        </ListItem>
        {isCollapsible && collapsibleComponent}
      </div>
    );
  }
}

AccordionPanel.propTypes = {
  a11yTitle: PropTypes.string,
  active: PropTypes.bool, // set by Accordion
  animate: PropTypes.bool,
  heading: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  pad: Header.propTypes.pad,
  caretExpandOnly: PropTypes.bool,
  caret: PropTypes.node,
  caretPos: PropTypes.oneOf(['left', 'right']),
  isCollapsible: PropTypes.bool,
  headerSize: PropTypes.oneOf(['small', 'medium', 'large']),
  separator: PropTypes.string
};

AccordionPanel.defaultProps = {
  caretExpandOnly: false,
  isCollapsible: true,
  caretPos: 'right',
  headerSize: 'small'
};

AccordionPanel.contextTypes = {
  intl: PropTypes.object
};
