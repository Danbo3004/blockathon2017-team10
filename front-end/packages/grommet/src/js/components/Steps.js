'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Steps extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { steps, currentStep } = this.props;

    return (
      <div className="steps">
        {steps.map((step, index) => {
          const classes = classnames({
            [`step`]: true,
            [`step--current`]: index == currentStep,
            [`step--incoming`]: index > currentStep,
            [`step--finished`]: index < currentStep
          });
          return (
            <div className={classes} key={index}>
              <span className="step-index">{index + 1}</span>
              <span className="step-name">{step}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

Steps.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Zero-based index */
  currentStep: PropTypes.number.isRequired
};

Steps.defaultProps = {
  steps: ['Step 1', 'Step 2', 'Step 3'],
  currentStep: 0
};

export default Steps;
