/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var cx = require('classnames');
var react = require('@carbon/react');
var CreateTearsheet = require('./CreateTearsheet.js');
var settings = require('../../settings.js');
var pconsole = require('../../global/js/utils/pconsole.js');
var usePreviousValue = require('../../global/js/hooks/usePreviousValue.js');
var useRetrieveStepData = require('../../global/js/hooks/useRetrieveStepData.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["children", "className", "description", "disableSubmit", "fieldsetLegendText", "hasFieldset", "includeStep", "introStep", "onNext", "onMount", "secondaryLabel", "subtitle", "title"];
var componentName = 'CreateTearsheetStep';
var blockClass = "".concat(settings.pkg.prefix, "--tearsheet-create__step"); // Default values for props

var defaults = {
  hasFieldset: true,
  includeStep: true
}; // eslint-disable-next-line react/display-name

exports.CreateTearsheetStep = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _cx;

  var children = _ref.children,
      className = _ref.className,
      description = _ref.description,
      disableSubmit = _ref.disableSubmit,
      fieldsetLegendText = _ref.fieldsetLegendText,
      _ref$hasFieldset = _ref.hasFieldset,
      hasFieldset = _ref$hasFieldset === void 0 ? defaults.hasFieldset : _ref$hasFieldset,
      _ref$includeStep = _ref.includeStep,
      includeStep = _ref$includeStep === void 0 ? defaults.includeStep : _ref$includeStep,
      introStep = _ref.introStep,
      onNext = _ref.onNext,
      onMount = _ref.onMount,
      secondaryLabel = _ref.secondaryLabel,
      subtitle = _ref.subtitle,
      title = _ref.title,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var stepsContext = React.useContext(CreateTearsheet.StepsContext);
  var stepNumber = React.useContext(CreateTearsheet.StepNumberContext);

  var _useState = React.useState(),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      shouldIncludeStep = _useState2[0],
      setShouldIncludeStep = _useState2[1];

  var previousState = usePreviousValue.usePreviousValue({
    currentStep: stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep
  });
  useRetrieveStepData.useRetrieveStepData({
    stepsContext: stepsContext,
    stepNumber: stepNumber,
    introStep: introStep,
    shouldIncludeStep: shouldIncludeStep,
    secondaryLabel: secondaryLabel,
    title: title
  }); // This useEffect reports back the onMount value so that they can be used
  // in the appropriate custom hooks.

  React.useEffect(function () {
    if (stepNumber === (stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep) && (previousState === null || previousState === void 0 ? void 0 : previousState.currentStep) !== (stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep)) {
      stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.setOnMount(onMount);
    }
  }, [onMount, stepsContext, stepNumber, previousState === null || previousState === void 0 ? void 0 : previousState.currentStep]); // Used to take the `includeStep` prop and use it as a local state value

  React.useEffect(function () {
    setShouldIncludeStep(includeStep);
  }, [includeStep, stepsContext, title]); // Whenever we are the current step, supply our disableSubmit and onNext values to the
  // steps container context so that it can manage the 'Next' button appropriately.

  React.useEffect(function () {
    if (stepNumber === (stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep)) {
      stepsContext.setIsDisabled(disableSubmit);
      stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.setOnNext(onNext); // needs to be updated here otherwise there could be stale state values from only initially setting onNext
    }
  }, [stepsContext, stepNumber, disableSubmit, onNext]);
  return stepsContext ? /*#__PURE__*/React__default["default"].createElement("div", _rollupPluginBabelHelpers["extends"]({}, rest, {
    className: cx__default["default"](blockClass, className, (_cx = {}, _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(blockClass, "__step--hidden-step"), stepNumber !== (stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep)), _rollupPluginBabelHelpers.defineProperty(_cx, "".concat(blockClass, "__step--visible-step"), stepNumber === (stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep)), _cx)),
    ref: ref
  }), /*#__PURE__*/React__default["default"].createElement(react.Grid, {
    narrow: true
  }, /*#__PURE__*/React__default["default"].createElement(react.Column, {
    xlg: 12,
    lg: 12,
    md: 8,
    sm: 8
  }, /*#__PURE__*/React__default["default"].createElement("h4", {
    className: "".concat(blockClass, "--title")
  }, title), subtitle && /*#__PURE__*/React__default["default"].createElement("h6", {
    className: "".concat(blockClass, "--subtitle")
  }, subtitle), description && /*#__PURE__*/React__default["default"].createElement("p", {
    className: "".concat(blockClass, "--description")
  }, description))), hasFieldset ? /*#__PURE__*/React__default["default"].createElement(react.FormGroup, {
    legendText: fieldsetLegendText,
    className: "".concat(blockClass, "--fieldset")
  }, children) : children) : pconsole["default"].warn("You have tried using a ".concat(componentName, " component outside of a CreateTearsheet.\n        This is not allowed. ").concat(componentName, "s should always be children of the CreateTearsheet"));
}); // Return a placeholder if not released and not enabled by feature flag

exports.CreateTearsheetStep = settings.pkg.checkComponentEnabled(exports.CreateTearsheetStep, componentName);
exports.CreateTearsheetStep.propTypes = {
  /**
   * Content that shows in the tearsheet step
   */
  children: PropTypes__default["default"].node,

  /**
   * Sets an optional className to be added to the tearsheet step
   */
  className: PropTypes__default["default"].string,

  /**
   * Sets an optional description on the step component
   */
  description: PropTypes__default["default"].string,

  /**
   * This will conditionally disable the submit button in the multi step Tearsheet
   */
  disableSubmit: PropTypes__default["default"].bool,

  /**
   * This is the required legend text that appears above a fieldset html element for accessibility purposes.
   * You can set the `hasFieldset` prop to false if you have multiple fieldset
   * elements or want to control the children of your Full Page's step content.
   * Otherwise, use CSS to hide/remove this label text.
   */
  fieldsetLegendText: PropTypes__default["default"].string.isRequired.if(function (_ref2) {
    var hasFieldset = _ref2.hasFieldset;
    return !!hasFieldset;
  }),

  /**
   * This optional prop will render your form content inside of a fieldset html element
   * and is defaulted to true.
   * You can set this prop to `false` if you have multiple fieldset elements or want to control the children of your Full Page's step content.
   */
  hasFieldset: PropTypes__default["default"].bool,

  /**
   * This prop is used to help track dynamic steps.
   * If this value is `false` then the step is not included in the visible steps or the ProgressIndicator steps.
   * If this value is `true` then the step will be included in the list of visible steps, as well as being included in the ProgressIndicator step list
   */
  includeStep: PropTypes__default["default"].bool,

  /**
   * This prop can be used on the first step to mark it as an intro step, which will not render the progress indicator steps
   */
  introStep: PropTypes__default["default"].bool,

  /**
   * Optional function to be called on initial mount of a step.
   * For example, this can be used to fetch data that is required on a particular step.
   */
  onMount: PropTypes__default["default"].func,

  /**
   * Optional function to be called on a step change.
   * For example, this can be used to validate input fields before proceeding to the next step.
   * This function can _optionally_ return a promise that is either resolved or rejected and the
   * CreateTearsheet will handle the submitting state of the next button.
   */
  onNext: PropTypes__default["default"].func,

  /**
   * Sets the optional secondary label on the progress step component
   */
  secondaryLabel: PropTypes__default["default"].string,

  /**
   * Sets an optional subtitle on the step component
   */
  subtitle: PropTypes__default["default"].string,

  /**
   * Sets the title text for a tearsheet step
   */
  title: PropTypes__default["default"].node.isRequired
};
