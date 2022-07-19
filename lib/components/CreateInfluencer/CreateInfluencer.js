/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var cx = require('classnames');
var react = require('@carbon/react');
require('../../global/js/utils/props-helper.js');
var settings = require('../../settings.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

// Import portions of React that are needed.

var blockClass = "".concat(settings.pkg.prefix, "--create-influencer");
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
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "".concat(blockClass, "__left-nav")
    }, currentStep === 1 && (_stepData$ = stepData[0]) !== null && _stepData$ !== void 0 && _stepData$.introStep ? null : /*#__PURE__*/React__default["default"].createElement(react.ProgressIndicator, {
      currentIndex: (_stepData$2 = stepData[0]) !== null && _stepData$2 !== void 0 && _stepData$2.introStep ? currentStep - totalDynamicSteps - 2 // minus 2 because we need to a
      // ccount for the intro step in addition to `currentIndex` being 0 index based and our steps being 1 index based
      : currentStep - totalDynamicSteps - 1 // minus 1 because ProgressIndicator currentIndex
      // prop is 0 index based, but our steps are 1 index based
      ,
      spaceEqually: true,
      vertical: true,
      className: cx__default["default"]("".concat(blockClass, "__progress-indicator"))
    }, progressSteps.map(function (step, stepIndex) {
      return /*#__PURE__*/React__default["default"].createElement(react.ProgressStep, {
        label: step.title,
        key: stepIndex,
        secondaryLabel: step.secondaryLabel
      });
    })));
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: cx__default["default"](blockClass, className)
  }, renderProgressSteps());
}; // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

CreateInfluencer.displayName = componentName;
CreateInfluencer.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes__default["default"].string,

  /**
   * Used to mark the current step on the ProgressIndicator component
   */
  currentStep: PropTypes__default["default"].number.isRequired,

  /**
   * The step data that renders the progress items
   */
  stepData: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    introStep: PropTypes__default["default"].bool,
    secondaryLabel: PropTypes__default["default"].string,
    shouldIncludeStep: PropTypes__default["default"].bool,
    title: PropTypes__default["default"].node
  }))
};

exports.CreateInfluencer = CreateInfluencer;
