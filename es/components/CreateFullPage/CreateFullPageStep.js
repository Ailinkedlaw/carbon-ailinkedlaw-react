/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, extends as _extends, defineProperty as _defineProperty } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings.js';
import { FormGroup } from '@carbon/react';
import { StepsContext, StepNumberContext } from './CreateFullPage.js';
import pconsole from '../../global/js/utils/pconsole.js';
import { usePreviousValue } from '../../global/js/hooks/usePreviousValue.js';
import { useRetrieveStepData } from '../../global/js/hooks/useRetrieveStepData.js';

var _excluded = ["children", "className", "subtitle", "description", "disableSubmit", "includeStep", "introStep", "title", "hasFieldset", "fieldsetLegendText", "onNext", "onMount", "secondaryLabel"];
var componentName = 'CreateFullPageStep';
var blockClass = "".concat(pkg.prefix, "--create-full-page__step"); // Default values for props

var defaults = {
  includeStep: true
}; // eslint-disable-next-line react/display-name

var CreateFullPageStep = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _cx;

  var children = _ref.children,
      className = _ref.className,
      subtitle = _ref.subtitle,
      description = _ref.description,
      disableSubmit = _ref.disableSubmit,
      _ref$includeStep = _ref.includeStep,
      includeStep = _ref$includeStep === void 0 ? defaults.includeStep : _ref$includeStep,
      introStep = _ref.introStep,
      title = _ref.title,
      hasFieldset = _ref.hasFieldset,
      fieldsetLegendText = _ref.fieldsetLegendText,
      onNext = _ref.onNext,
      onMount = _ref.onMount,
      secondaryLabel = _ref.secondaryLabel,
      rest = _objectWithoutProperties(_ref, _excluded);

  var stepsContext = useContext(StepsContext);
  var stepNumber = useContext(StepNumberContext);

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      shouldIncludeStep = _useState2[0],
      setShouldIncludeStep = _useState2[1];

  var previousState = usePreviousValue({
    currentStep: stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep
  });
  useRetrieveStepData({
    stepsContext: stepsContext,
    stepNumber: stepNumber,
    introStep: introStep,
    shouldIncludeStep: shouldIncludeStep,
    secondaryLabel: secondaryLabel,
    title: title
  }); // This useEffect reports back the onMount value so that they can be used
  // in the appropriate custom hooks.

  useEffect(function () {
    if (stepNumber === (stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep) && (previousState === null || previousState === void 0 ? void 0 : previousState.currentStep) !== (stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep)) {
      stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.setOnMount(onMount);
    }
  }, [onMount, stepsContext, stepNumber, previousState === null || previousState === void 0 ? void 0 : previousState.currentStep]);
  useEffect(function () {
    setShouldIncludeStep(includeStep);
  }, [includeStep, stepsContext, title]); // Whenever we are the current step, supply our disableSubmit and onNext values to the
  // steps container context so that it can manage the 'Next' button appropriately.

  useEffect(function () {
    if (stepNumber === (stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep)) {
      stepsContext.setIsDisabled(disableSubmit);
      stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.setOnNext(onNext); // needs to be updated here otherwise there could be stale state values from only initially setting onNext
    }
  }, [stepsContext, stepNumber, disableSubmit, onNext]);
  return stepsContext ? /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    className: cx(blockClass, className, (_cx = {}, _defineProperty(_cx, "".concat(blockClass, "__step--hidden-step"), stepNumber !== (stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep)), _defineProperty(_cx, "".concat(blockClass, "__step--visible-step"), stepNumber === (stepsContext === null || stepsContext === void 0 ? void 0 : stepsContext.currentStep)), _cx)),
    ref: ref
  }), /*#__PURE__*/React.createElement("h5", {
    className: "".concat(blockClass, "-title")
  }, title), subtitle && /*#__PURE__*/React.createElement("h6", {
    className: "".concat(blockClass, "-subtitle")
  }, subtitle), description && /*#__PURE__*/React.createElement("p", {
    className: "".concat(blockClass, "-description")
  }, description), hasFieldset ? /*#__PURE__*/React.createElement(FormGroup, {
    legendText: fieldsetLegendText,
    className: "".concat(blockClass, "-fieldset")
  }, children) : children) : pconsole.warn("You have tried using a ".concat(componentName, " component outside of a CreateFullPage. This is not allowed.\n        ").concat(componentName, "s should always be children of the CreateFullPage"));
}); // Return a placeholder if not released and not enabled by feature flag

CreateFullPageStep = pkg.checkComponentEnabled(CreateFullPageStep, componentName);
CreateFullPageStep.propTypes = {
  /**
   * Content that shows in the CreateFullPage step
   */
  children: PropTypes.node,

  /**
   * Sets an optional className to be added to the CreateFullPage step
   */
  className: PropTypes.string,

  /**
   * Sets an optional description on the progress step component
   */
  description: PropTypes.string,

  /**
   * This will conditionally disable the submit button in the multi step CreateFullPage
   */
  disableSubmit: PropTypes.bool,

  /**
   * This is the legend text that appears above a fieldset html element for accessibility purposes.
   * It is required when the optional `hasFieldset` prop is provided to a FullPageStep.
   */
  fieldsetLegendText: PropTypes.string.isRequired.if(function (_ref2) {
    var hasFieldset = _ref2.hasFieldset;
    return hasFieldset === true;
  }),

  /**
   * This optional prop will render your form content inside of a fieldset html element
   */
  hasFieldset: PropTypes.bool,

  /**
   * This prop is used to help track dynamic steps.
   * If this value is `false` then the step is not included in the visible steps or the ProgressIndicator steps.
   * If this value is `true` then the step will be included in the list of visible steps,
   * as well as being included in the ProgressIndicator step list
   */
  includeStep: PropTypes.bool,

  /**
   * This prop can be used on the first step to mark it as an intro step, which will not render the progress indicator steps
   */
  introStep: PropTypes.bool,

  /**
   * Optional function to be called on initial mount of a step.
   * For example, this can be used to fetch data that is required on a particular step.
   */
  onMount: PropTypes.func,

  /**
   * Optional function to be called on a step change.
   * For example, this can be used to validate input fields before proceeding to the next step.
   * This function can _optionally_ return a promise that is either resolved or rejected and
   * the CreateFullPage will handle the submitting state of the next button.
   */
  onNext: PropTypes.func,

  /**
   * Sets the optional secondary label on the progress step component
   */
  secondaryLabel: PropTypes.string,

  /**
   * Sets an optional subtitle on the progress step component
   */
  subtitle: PropTypes.string,

  /**
   * Sets the title text for a create full page step
   */
  title: PropTypes.node.isRequired
};

export { CreateFullPageStep };
