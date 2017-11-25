// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Intl from '../utils/Intl';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TABS;

export default class Tabs extends Component {
  constructor(props, context) {
    super(props, context);

    this._activateTab = this._activateTab.bind(this);

    this.state = {
      activeIndex: props.activeIndex || 0,
      justify: props.justify
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.activeIndex || 0 === nextProps.activeIndex) &&
      this.state.activeIndex !== nextProps.activeIndex
    ) {
      this.setState({ activeIndex: nextProps.activeIndex });
    }
  }

  _activateTab(index) {
    if (!this.props.hasOwnProperty('activeIndex')) {
      this.setState({ activeIndex: index });
    }
    if (this.props.onActive) {
      this.props.onActive(index);
    }
  }

  render() {
    const {
      children,
      className,
      justify,
      responsive,
      vertical,
      stretch,
      topHighlight,
      radio,
      ...props
    } = this.props;
    delete props.activeIndex;
    delete props.onActive;
    const { activeIndex } = this.state;
    const { intl } = this.context;
    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--justify-${justify}`]: justify,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${CLASS_ROOT}--stretch`]: stretch,
        [`${CLASS_ROOT}--top-highlight`]: topHighlight,
        [`${CLASS_ROOT}--radio`]: radio
      },
      className
    );

    let activeContainer;
    let activeTitle;
    const tabs = React.Children.map(
      children,
      (tab, index) => {
        const tabProps = tab.props || tab._store.props || {};

        const isTabActive = index === activeIndex;

        if (isTabActive) {
          activeContainer = tabProps.children;
          activeTitle = tabProps.title;
        }

        return React.cloneElement(tab, {
          active: isTabActive,
          id: `tab-${index}`,
          onRequestForActive: () => {
            this._activateTab(index);
          }
        });
      },
      this
    );

    const tabContentTitle = Intl.getMessage(intl, 'Tab Contents', {
      activeTitle: activeTitle
    });

    let containerClassName = '';
    if (vertical) {
      containerClassName = `${CLASS_ROOT}--vertical`;
    }

    return (
      <div role="tablist" className={containerClassName}>
        <ul {...props} className={classes}>
          {tabs}
        </ul>
        <div aria-label={tabContentTitle} role="tabpanel">
          {activeContainer}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  activeIndex: PropTypes.number,
  justify: PropTypes.oneOf(['start', 'center', 'end', 'justify']),
  vertical: PropTypes.bool,
  responsive: PropTypes.bool,
  onActive: PropTypes.func,
  stretch: PropTypes.bool,
  topHighlight: PropTypes.bool,
  radio: PropTypes.bool
};

Tabs.contextTypes = {
  intl: PropTypes.object
};

Tabs.defaultProps = {
  justify: 'center',
  vertical: false,
  responsive: true,
  stretch: false
};
