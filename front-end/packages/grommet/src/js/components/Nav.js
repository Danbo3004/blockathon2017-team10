'use strict';

import React, { Component, PropTypes } from 'react';
import map from 'lodash/map';

import Menu from './Menu';
import Box from './Box';
import DropDown from './DropDown';
import CSSClassnames from '../utils/CSSClassnames';
import classnames from 'classnames';

const CLASS_ROOT = CSSClassnames.NAV;
class Nav extends Component {
  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(path) {
    const { router } = this.context;

    if (router) {
      router.push(path);
    }
  }

  isSubMenu(base, target) {
    if (base === '/') return base === target;
    return (
      target &&
      target.length &&
      base &&
      base.length &&
      target.indexOf(base) === 0
    );
  }

  renderMenuItem(item, key, isSub) {
    const { router } = this.context;
    const active = router && this.isSubMenu(item.content, location.pathname);

    const className = isSub
      ? classnames(`${CLASS_ROOT}__sub__item`, {
        [`${CLASS_ROOT}__sub__item--active`]: active
      })
      : classnames(`${CLASS_ROOT}__item`, {
        [`${CLASS_ROOT}__item--active`]: active
      });

    return (
      <Box
        key={key}
        className={className}
        onClick={() => this.onItemClick(item.content)}
      >
        {item.label}
      </Box>
    );
  }

  render() {
    const { items } = this.props;
    const { router } = this.context;

    return (
      <Menu direction="row" className={CLASS_ROOT}>
        {map(items, (item, pos) => {
          if (typeof item.content === 'string') {
            return this.renderMenuItem(item, pos, false);
          } else {
            let active = false;
            if (router) {
              for (let i = 0; i < item.content.length; i++) {
                if (
                  this.isSubMenu(item.content[i].content, location.pathname)
                ) {
                  active = true;
                  break;
                }
              }
            }

            const className = classnames(`${CLASS_ROOT}__item`, {
              [`${CLASS_ROOT}__item--active`]: active
            });

            const dropdownBody = (
              <Box direction="column" className={`${CLASS_ROOT}__sub`}>
                {map(item.content, (subItem, subPos) => {
                  return this.renderMenuItem(subItem, subPos, true);
                })}
              </Box>
            );

            return (
              <DropDown
                body={dropdownBody}
                rootClassName={`${CLASS_ROOT}__dropdown`}
                key={pos}
              >
                <Box direction="row" className={className}>
                  <Box
                    direction="column"
                    justify="center"
                    margin={{ right: 'small' }}
                  >
                    {item.label}
                  </Box>
                  <Box justify="center">
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </Box>
                </Box>
              </DropDown>
            );
          }
        })}
      </Menu>
    );
  }
}

Nav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

Nav.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Nav;
