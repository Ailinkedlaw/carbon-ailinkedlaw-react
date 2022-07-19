/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ProgressIndicator, ProgressStep } from '@carbon/react';
import '../../global/js/utils/props-helper.js';
import { pkg } from '../../settings.js';

// Import portions of React that are needed.

var blockClass = "".concat(pkg.prefix, "--create-influencer");
var componentName = 'CreateInfluencer';
var CreateInfluencer = function CreateInfluencer(_ref) {
  var className = _ref.className,
      currentStep = _ref.currentStep,
      stepData = _ref.stepData;

  var getNumberOfDynamicStepsBeforeCurrentStep = function getNumberOfDynamicStepsBeforeCurrentStep(array, key) {
    var dynamicSteps = [];
    array.forEach(function (item, index) {
      var _array$index;

      if (((_array$index = array[index]) === null || _array$index === void 0 ? void 0 : _array$index[key]) === false && index <= currentStep - 1) {
        dynamicSteps.push(item);
      }
    });
    return dynamicSteps.length;
  }; // renders the step progression components in the left influencer area


  var renderProgressSteps = function renderProgressSteps() {
    var _stepData$, _stepData$2;

    var extractedSteps = stepData === null || stepData === void 0 ? void 0 : stepData.filter(function (item) {
      return !(item !== null && item !== void 0 && item.introStep);
    });
    var progressSteps = extractedSteps === null || extractedSteps === void 0 ? void 0 : extractedSteps.filter(function (item) {
      return item === null || item === void 0 ? void 0 : item.shouldIncludeStep;
    }); // To get the ProgressIndicator's `currentIndex`, accounting for dynamic steps,
    // we need to subtract the number of !shouldIncludeStep/s before the current step
    // which we get from `getNumberOfDynamicStepsBeforeCurrentStep()`

    var totalDynamicSteps = getNumberOfDynamicStepsBeforeCurrentStep(stepData, 'shouldIncludeStep') || 0;
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(blockClass, "__left-nav")
    }, currentStep === 1 && (_stepData$ = stepData[0]) !== null && _stepData$ !== void 0 && _stepData$.introStep ? null : /*#__PURE__*/React.createElement(ProgressIndicator, {
      currentIndex: (_stepData$2 = stepData[0]) !== null && _stepData$2 !== void 0 && _stepData$2.introStep ? currentStep - totalDynamicSteps - 2 // minus 2 because we need to a
      // ccount for the intro step in addition to `currentIndex` being 0 index based and our steps being 1 index based
      : currentStep - totalDynamicSteps - 1 // minus 1 because ProgressIndicator currentIndex
      // prop is 0 index based, but our steps are 1 index based
      ,
      spaceEqually: true,
      vertical: true,
      className: cx("".concat(blockClass, "__progress-indicator"))
    }, progressSteps.map(function (step, stepIndex) {
      return /*#__PURE__*/React.createElement(ProgressStep, {
        label: step.title,
        key: stepIndex,
        secondaryLabel: step.secondaryLabel
      });
    })));
  };

  return /*#__PURE__*/React.createElement("div", {
    className: cx(blockClass, className)
  }, renderProgressSteps());
}; // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

CreateInfluencer.displayName = componentName;
CreateInfluencer.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Used to mark the current step on the ProgressIndicator component
   */
  currentStep: PropTypes.number.isRequired,

  /**
   * The step data that renders the progress items
   */
  stepData: PropTypes.arrayOf(PropTypes.shape({
    introStep: PropTypes.bool,
    secondaryLabel: PropTypes.string,
    shouldIncludeStep: PropTypes.bool,
    title: PropTypes.node
  }))
};

export { CreateInfluencer };
