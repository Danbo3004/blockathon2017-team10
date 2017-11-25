// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Button from './Button';
import CSSClassnames from '../utils/CSSClassnames';
import { filterByFocusable } from '../utils/DOM';
import Intl from '../utils/Intl';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';

const CLASS_ROOT = CSSClassnames.LAYER;
const APP = CSSClassnames.APP;

class LayerContents extends Component {
  constructor(props, context) {
    super(props, context);

    this._onClick = this._onClick.bind(this);
    this._processTab = this._processTab.bind(this);
    this._onScroll = this._onScroll.bind(this);

    this.state = {
      dropActive: false
    };
  }

  getChildContext() {
    return {
      history: this.props.history,
      intl: this.props.intl,
      onDropChange: active => {
        this.setState({ dropActive: active });
      },
      router: this.props.router,
      store: this.props.store
    };
  }

  componentDidMount() {
    const { hidden, onClose } = this.props;

    if (!hidden) {
      this.anchorStepRef.focus();
      this.anchorStepRef.scrollIntoView();
    }

    this._keyboardHandlers = {
      tab: this._processTab
    };
    if (this.props.onClose) {
      const layerParent = this.containerRef.parentNode;
      this._keyboardHandlers.esc = onClose;
      layerParent.addEventListener('click', this._onClick.bind(this));
    }
    KeyboardAccelerators.startListeningToKeyboard(this, this._keyboardHandlers);
    if (this.props.onScroll) {
      this.containerRef.addEventListener('scroll', this._onScroll);
    }
  }

  componentDidUpdate() {
    const { hidden } = this.props;
    if (hidden) {
      KeyboardAccelerators.stopListeningToKeyboard(
        this,
        this._keyboardHandlers
      );
    }
  }

  componentWillUnmount() {
    const layerParent = this.containerRef.parentNode;

    KeyboardAccelerators.stopListeningToKeyboard(this, this._keyboardHandlers);

    if (this.props.onClose) {
      layerParent.removeEventListener('click', this._onClick.bind(this));
    }
    if (this.props.onScroll) {
      this.containerRef.removeEventListener('scroll', this._onScroll);
    }
  }

  _onClick(event) {
    const { dropActive } = this.state;
    if (!dropActive) {
      const { onClose } = this.props;
      const layerContents = this.containerRef;

      if (layerContents && !layerContents.contains(event.target)) {
        onClose();
      }
    }
  }

  _processTab(event) {
    let items = this.containerRef.getElementsByTagName('*');
    items = filterByFocusable(items);

    if (!items || items.length === 0) {
      event.preventDefault();
    } else {
      if (event.shiftKey) {
        if (event.target === items[0]) {
          items[items.length - 1].focus();
          event.preventDefault();
        }
      } else if (event.target === items[items.length - 1]) {
        items[0].focus();
        event.preventDefault();
      }
    }
  }

  _onScroll(event) {
    this.props.onScroll(event);
  }

  render() {
    const {
      children,
      closer,
      onClose,
      isOverflowVisible,
      minWidth
    } = this.props;

    let closerNode;
    if (typeof closer === 'object') {
      closerNode = closer;
    } else if (onClose && closer) {
      closerNode = (
        <div className={`${CLASS_ROOT}__closer`}>
          <Button
            plain={true}
            icon={<i className="fa fa-times" />}
            onClick={() => onClose(true)}
          />
        </div>
      );
    }

    const style = {};
    if (minWidth) {
      style.minWidth = `${minWidth}px`;
    }

    return (
      <div
        ref={ref => (this.containerRef = ref)}
        style={style}
        className={`${CLASS_ROOT}__container ${isOverflowVisible &&
          `${CLASS_ROOT}__overflow-visible`}`}
      >
        <a
          tabIndex="-1"
          aria-hidden="true"
          ref={ref => (this.anchorStepRef = ref)}
        />
        {closerNode}
        {children}
      </div>
    );
  }
}

LayerContents.propTypes = {
  a11yTitle: PropTypes.string,
  closer: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  history: PropTypes.object,
  intl: PropTypes.object,
  onClose: PropTypes.func,
  onScroll: PropTypes.func,
  router: PropTypes.any,
  store: PropTypes.any,
  isOverflowVisible: PropTypes.bool
};

// Because Layer creates a new DOM render context, the context
// is not transfered. For now, we hard code these specific ones.
// TODO: Either figure out how to introspect the context and transfer
// whatever we find or have callers explicitly indicate which parts
// of the context to transfer somehow.
LayerContents.childContextTypes = {
  history: PropTypes.object,
  intl: PropTypes.object,
  onDropChange: PropTypes.func,
  router: PropTypes.any,
  store: PropTypes.object
};

export default class Layer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._originalFocusedElement = document.activeElement;
    this._originalScrollPosition = {
      top: window.scrollY,
      left: window.scrollX
    };
    this._addLayer();
    this._renderLayer();
  }

  componentDidUpdate() {
    this._renderLayer();
  }

  componentWillUnmount() {
    if (this._originalFocusedElement) {
      if (this._originalFocusedElement.focus) {
        // wait for the fixed positioning to come back to normal
        // see layer styling for reference
        setTimeout(() => {
          this._originalFocusedElement.focus();
          window.scrollTo(
            this._originalScrollPosition.left,
            this._originalScrollPosition.top
          );
        }, 0);
      } else if (
        this._originalFocusedElement.parentNode &&
        this._originalFocusedElement.parentNode.focus
      ) {
        // required for IE11 and Edge
        this._originalFocusedElement.parentNode.focus();
        window.scrollTo(
          this._originalScrollPosition.left,
          this._originalScrollPosition.top
        );
      }
    }
    this._removeLayer();
  }

  _classesFromProps() {
    const { align, className, closer, flush, hidden, peek } = this.props;

    return classnames(
      'grommet',
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--align-${this.props.align}`]: align,
        [`${CLASS_ROOT}--closeable`]: closer,
        [`${CLASS_ROOT}--flush`]: flush,
        [`${CLASS_ROOT}--hidden`]: hidden,
        [`${CLASS_ROOT}--peek`]: peek
      },
      className
    );
  }

  _addLayer() {
    const { id } = this.props;

    const element = document.createElement('div');
    if (id) {
      element.id = id;
    }
    element.className = this._classesFromProps();
    // insert before .app, if possible.
    var appElements = document.querySelectorAll(`.${APP}`);
    var beforeElement;
    if (appElements.length > 0) {
      beforeElement = appElements[0];
    } else {
      beforeElement = document.body.firstChild;
    }
    if (beforeElement) {
      this._element = beforeElement.parentNode.insertBefore(
        element,
        beforeElement
      );
    }
  }

  _handleAriaHidden(hideOverlay) {
    const ariaHidden = hideOverlay || false;
    const grommetApps = document.querySelectorAll(`.${APP}`);
    const visibleLayers = document.querySelectorAll(
      `.${CLASS_ROOT}:not(.${CLASS_ROOT}--hidden)`
    );

    if (grommetApps) {
      Array.prototype.slice.call(grommetApps).forEach(grommetApp => {
        if (ariaHidden && visibleLayers.length === 0) {
          // make sure to only show grommet apps if there is no other layer
          grommetApp.setAttribute('aria-hidden', false);
          grommetApp.classList.remove(`${APP}--hidden`);
          // scroll body content to the original position
          grommetApp.style.top = `-${this._originalScrollPosition.top}px`;
          grommetApp.style.left = `-${this._originalScrollPosition.left}px`;
        } else {
          grommetApp.setAttribute('aria-hidden', true);
          grommetApp.classList.add(`${APP}--hidden`);
          // this must be null to work
          grommetApp.style.top = null;
          grommetApp.style.left = null;
        }
      }, this);
    }
  }

  _renderLayer() {
    if (this._element) {
      this._element.className = this._classesFromProps();
      const contents = (
        <LayerContents
          {...this.props}
          history={this.context.history}
          intl={this.context.intl}
          router={this.context.router}
          store={this.context.store}
        />
      );
      ReactDOM.render(contents, this._element, () => {
        const { hidden } = this.props;
        if (hidden) {
          this._handleAriaHidden(true);
        } else {
          this._handleAriaHidden(false);
        }
      });
    }
  }

  _removeLayer() {
    this._element.removeEventListener('animationend', this._onAnimationEnd);

    ReactDOM.unmountComponentAtNode(this._element);
    this._element.parentNode.removeChild(this._element);
    this._element = undefined;

    // make sure to handle aria attributes after the layer is removed
    this._handleAriaHidden(true);
  }

  render() {
    return <span style={{ display: 'none' }} />;
  }
}

Layer.propTypes = {
  align: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
  closer: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  flush: PropTypes.bool,
  hidden: PropTypes.bool,
  peek: PropTypes.bool,
  onClose: PropTypes.func,
  onScroll: PropTypes.func,
  minWidth: PropTypes.number
};

Layer.contextTypes = {
  router: PropTypes.any,
  history: PropTypes.object,
  intl: PropTypes.object,
  store: PropTypes.object
};

Layer.defaultProps = {
  align: 'center'
};
