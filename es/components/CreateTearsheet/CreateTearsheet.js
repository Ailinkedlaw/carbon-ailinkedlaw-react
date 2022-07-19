/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef, useState, useRef, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form } from '@carbon/react';
import wrapFocus from '../../global/js/utils/wrapFocus.js';
import { TearsheetShell } from '../Tearsheet/TearsheetShell.js';
import { pkg } from '../../settings.js';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';
import { lastIndexInArray } from '../../global/js/utils/lastIndexInArray.js';
import { usePreviousValue } from '../../global/js/hooks/usePreviousValue.js';
import { useCreateComponentFocus } from '../../global/js/hooks/useCreateComponentFocus.js';
import { useValidCreateStepCount } from '../../global/js/hooks/useValidCreateStepCount.js';
import { useResetCreateComponent } from '../../global/js/hooks/useResetCreateComponent.js';
import { useCreateComponentStepChange } from '../../global/js/hooks/useCreateComponentStepChange.js';
import { CreateInfluencer } from '../CreateInfluencer/CreateInfluencer.js';

var _excluded = ["backButtonText", "cancelButtonText", "children", "className", "description", "influencerWidth", "initialStep", "label", "nextButtonText", "onClose", "onRequestSubmit", "open", "submitButtonText", "title", "verticalPosition"];
var componentName = 'CreateTearsheet';
var blockClass = "".concat(pkg.prefix, "--tearsheet-create"); // This is a general context for the steps container
// containing information about the state of the container
// and providing some callback methods for steps to use

var StepsContext = /*#__PURE__*/createContext(null); // This is a context supplied separately to each step in the container
// to let it know what number it is in the sequence of steps

var StepNumberContext = /*#__PURE__*/createContext(-1); // Default values for props

var defaults = {
  verticalPosition: 'normal',
  influencerWidth: 'narrow'
};
var CreateTearsheet = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var backButtonText = _ref.backButtonText,
      cancelButtonText = _ref.cancelButtonText,
      children = _ref.children,
      className = _ref.className,
      description = _ref.description,
      _ref$influencerWidth = _ref.influencerWidth,
      influencerWidth = _ref$influencerWidth === void 0 ? defaults.influencerWidth : _ref$influencerWidth,
      initialStep = _ref.initialStep,
      label = _ref.label,
      nextButtonText = _ref.nextButtonText,
      onClose = _ref.onClose,
      onRequestSubmit = _ref.onRequestSubmit,
      open = _ref.open,
      submitButtonText = _ref.submitButtonText,
      title = _ref.title,
      _ref$verticalPosition = _ref.verticalPosition,
      verticalPosition = _ref$verticalPosition === void 0 ? defaults.verticalPosition : _ref$verticalPosition,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      createTearsheetActions = _useState2[0],
      setCreateTearsheetActions = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      shouldViewAll = _useState4[0],
      setShouldViewAll = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      currentStep = _useState6[0],
      setCurrentStep = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isSubmitting = _useState8[0],
      setIsSubmitting = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isDisabled = _useState10[0],
      setIsDisabled = _useState10[1];

  var _useState11 = useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      onNext = _useState12[0],
      _setOnNext = _useState12[1];

  var _useState13 = useState(),
      _useState14 = _slicedToArray(_useState13, 2),
      onMount = _useState14[0],
      _setOnMount = _useState14[1];

  var _useState15 = useState([]),
      _useState16 = _slicedToArray(_useState15, 2),
      stepData = _useState16[0],
      setStepData = _useState16[1];

  var _useState17 = useState(1),
      _useState18 = _slicedToArray(_useState17, 2),
      firstIncludedStep = _useState18[0],
      setFirstIncludedStep = _useState18[1];

  var _useState19 = useState(null),
      _useState20 = _slicedToArray(_useState19, 2),
      lastIncludedStep = _useState20[0],
      setLastIncludedStep = _useState20[1];

  var previousState = usePreviousValue({
    currentStep: currentStep,
    open: open
  });
  var contentRef = useRef();
  useEffect(function () {
    var firstItem = stepData.findIndex(function (item) {
      return item === null || item === void 0 ? void 0 : item.shouldIncludeStep;
    }) + 1;
    var lastItem = lastIndexInArray(stepData, 'shouldIncludeStep', true);

    if (firstItem !== firstIncludedStep) {
      setFirstIncludedStep(firstItem);
    }

    if (lastItem !== lastIncludedStep) {
      setLastIncludedStep(lastItem);
    }
  }, [stepData, firstIncludedStep, lastIncludedStep]);
  useCreateComponentFocus({
    previousState: previousState,
    currentStep: currentStep,
    blockClass: blockClass,
    onMount: onMount
  });
  useValidCreateStepCount(stepData.length, componentName);
  useResetCreateComponent({
    firstIncludedStep: firstIncludedStep,
    previousState: previousState,
    open: open,
    setCurrentStep: setCurrentStep,
    initialStep: initialStep,
    totalSteps: stepData === null || stepData === void 0 ? void 0 : stepData.length,
    componentName: componentName
  });
  useCreateComponentStepChange({
    firstIncludedStep: firstIncludedStep,
    lastIncludedStep: lastIncludedStep,
    stepData: stepData,
    onNext: onNext,
    isSubmitDisabled: isDisabled,
    setCurrentStep: setCurrentStep,
    setIsSubmitting: setIsSubmitting,
    setShouldViewAll: setShouldViewAll,
    onClose: onClose,
    onRequestSubmit: onRequestSubmit,
    componentName: componentName,
    currentStep: currentStep,
    shouldViewAll: shouldViewAll,
    backButtonText: backButtonText,
    cancelButtonText: cancelButtonText,
    submitButtonText: submitButtonText,
    nextButtonText: nextButtonText,
    isSubmitting: isSubmitting,
    componentBlockClass: blockClass,
    setCreateComponentActions: setCreateTearsheetActions
  }); // adds focus trap functionality

  /* istanbul ignore next */

  var handleBlur = function handleBlur(_ref2) {
    var oldActiveNode = _ref2.target,
        currentActiveNode = _ref2.relatedTarget;
    var visibleStepInnerContent = document.querySelector(".".concat(pkg.prefix, "--tearsheet__body"));

    if (open && visibleStepInnerContent) {
      wrapFocus({
        bodyNode: visibleStepInnerContent,
        currentActiveNode: currentActiveNode,
        oldActiveNode: oldActiveNode
      });
    }
  };

  return /*#__PURE__*/React.createElement(TearsheetShell, _extends({}, rest, getDevtoolsProps(componentName), {
    actions: createTearsheetActions,
    className: cx(blockClass, className),
    description: description,
    hasCloseIcon: false,
    influencer: /*#__PURE__*/React.createElement(CreateInfluencer, {
      currentStep: currentStep,
      stepData: stepData
    }),
    influencerPosition: "left",
    influencerWidth: influencerWidth,
    label: label,
    onClose: onClose,
    open: open,
    size: "wide",
    title: title,
    verticalPosition: verticalPosition,
    ref: ref
  }), /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__content"),
    onBlur: handleBlur,
    ref: contentRef
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(StepsContext.Provider, {
    value: {
      currentStep: currentStep,
      setIsDisabled: setIsDisabled,
      setOnNext: function setOnNext(fn) {
        return _setOnNext(function () {
          return fn;
        });
      },
      setOnMount: function setOnMount(fn) {
        return _setOnMount(function () {
          return fn;
        });
      },
      setStepData: setStepData,
      stepData: stepData
    }
  }, React.Children.map(children, function (child, index) {
    return /*#__PURE__*/React.createElement(StepNumberContext.Provider, {
      value: index + 1
    }, child);
  })))));
}); // Return a placeholder if not released and not enabled by feature flag

CreateTearsheet = pkg.checkComponentEnabled(CreateTearsheet, componentName); // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

CreateTearsheet.displayName = componentName; // Note that the descriptions here should be kept in sync with those for the
// corresponding props for TearsheetNarrow and TearsheetShell components.

CreateTearsheet.propTypes = {
  /**
   * The back button text
   */
  backButtonText: PropTypes.string.isRequired,

  /**
   * The cancel button text
   */
  cancelButtonText: PropTypes.string.isRequired,

  /**
   * The main content of the tearsheet
   */
  children: PropTypes.node,

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className: PropTypes.string,

  /**
   * A description of the flow, displayed in the header area of the tearsheet.
   */
  description: PropTypes.node,

  /**
   * Used to set the size of the influencer
   */
  influencerWidth: PropTypes.oneOf(['narrow', 'wide']),

  /**
   * This can be used to open the component to a step other than the first step.
   * For example, a create flow was previously in progress, data was saved, and
   * is now being completed.
   */
  initialStep: PropTypes.number,

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label: PropTypes.node,

  /**
   * The next button text
   */
  nextButtonText: PropTypes.string.isRequired,

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onClose: PropTypes.func,

  /**
   * Specify a handler for submitting the multi step tearsheet (final step).
   * This function can _optionally_ return a promise that is either resolved or
   * rejected and the CreateTearsheet will handle the submitting state of the create button.
   */
  onRequestSubmit: PropTypes.func.isRequired,

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open: PropTypes.bool,

  /**
   * The submit button text
   */
  submitButtonText: PropTypes.string.isRequired,

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title: PropTypes.node,

  /**
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position (the default) is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition: PropTypes.oneOf(['normal', 'lower'])
};

export { CreateTearsheet, StepNumberContext, StepsContext };
