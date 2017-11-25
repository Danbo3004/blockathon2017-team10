import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.FLAT_SELECT;

const TYPE_BOX = 'box';
const TYPE_ROUNDED = 'rounded-button';
const TYPE_STICKING = 'sticking-button';

class FlatSelect extends Component {
  constructor(props) {
    super(props);
  }

  renderSticking() {
    const { options, onSelect, value } = this.props;
    const classes = classnames({
      [`${CLASS_ROOT}`]: true,
      [`${CLASS_ROOT}--sticking-button`]: true
    });

    return (
      <div className={classes}>
        {options.map((option, index) => {
          const optionClasses = classnames({
            [`${CLASS_ROOT}__option`]: true,
            [`${CLASS_ROOT}__option--selected`]: option.value === value
          });

          return (
            <span className={optionClasses} onClick={() => onSelect(option)}>
              {option.label}
            </span>
          );
        })}
      </div>
    );
  }

  renderRounded() {
    return <div className={CLASS_ROOT}>Flat select - Rounded Button</div>;
  }

  renderBox() {
    const classes = classnames({
      [`${CLASS_ROOT}`]: true,
      [`${CLASS_ROOT}--box`]: true
    });

    const { options, onSelect, value, gap, description } = this.props;
    const descriptionCaretStyle = {};
    if (description) {
      const caretLeftPosition = this.calcCaretPosition();
      descriptionCaretStyle.left = `${caretLeftPosition || '0px'}`;
    }

    return (
      <div className={`${CLASS_ROOT}__wrapper`}>
        <div className={classes}>
          {options.map((option, index) => {
            const optionClasses = classnames({
              [`${CLASS_ROOT}__option`]: true,
              [`${CLASS_ROOT}__option--selected`]: option.value === value
            });

            const style = {};
            if (gap && index > 0) {
              style.marginLeft = `${gap}px`;
            }

            return (
              <div
                className={optionClasses}
                style={style}
                onClick={() => onSelect(option)}
                key={index}
              >
                <div className={`${CLASS_ROOT}__option-label`}>
                  {option.label}
                </div>
                {option.subLabel ? (
                  <div className={`${CLASS_ROOT}__option-sub-label`}>
                    {option.subLabel}
                  </div>
                ) : null}
                {option.image ? (
                  <div className={`${CLASS_ROOT}__option-image`}>
                    {option.image}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        {description ? (
          <div className={`${CLASS_ROOT}__description`}>
            {description}
            <div
              className={`${CLASS_ROOT}__description-caret`}
              style={descriptionCaretStyle}
            />
          </div>
        ) : null}
      </div>
    );
  }

  calcCaretPosition() {
    const { options, gap, value } = this.props;
    let selectedPosition = -1;

    options.forEach((option, index) => {
      if (option.value === value) selectedPosition = index;
    });

    const allGap = gap * (options.length - 1);

    return `calc(((100% - ${allGap}px) / ${options.length *
      2}) * ${selectedPosition * 2 + 1} + ${gap * selectedPosition}px)`;
  }

  render() {
    return this.props.type === TYPE_BOX
      ? this.renderBox()
      : this.props.type === TYPE_ROUNDED
        ? this.renderRounded()
        : this.renderSticking();
  }
}

FlatSelect.propTypes = {
  type: PropTypes.oneOf([TYPE_BOX, TYPE_ROUNDED, TYPE_STICKING]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      subLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.node
    })
  ).isRequired,
  value: PropTypes.any,
  gap: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  description: PropTypes.node
};

FlatSelect.defaultProps = {
  type: 'sticking-button',
  gap: 0,
  options: [
    {
      value: 1,
      label: 1
    },
    {
      value: 2,
      label: 2
    },
    {
      value: 3,
      label: 3
    }
  ]
};

export default FlatSelect;
