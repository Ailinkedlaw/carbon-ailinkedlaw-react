/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools.js';
import { pkg } from '../../settings.js';
import { Form, ComposedModal, ModalHeader, ModalBody, ModalFooter, Button } from '@carbon/react';
import { lastIndexInArray } from '../../global/js/utils/lastIndexInArray.js';
import { usePreviousValue } from '../../global/js/hooks/usePreviousValue.js';
import { useCreateComponentFocus } from '../../global/js/hooks/useCreateComponentFocus.js';
import { useValidCreateStepCount } from '../../global/js/hooks/useValidCreateStepCount.js';
import { useCreateComponentStepChange } from '../../global/js/hooks/useCreateComponentStepChange.js';
import { CreateInfluencer } from '../CreateInfluencer/CreateInfluencer.js';
import { ActionSet } from '../ActionSet/ActionSet.js';

var _excluded = ["backButtonText", "cancelButtonText", "children", "className", "modalDangerButtonText", "modalDescription", "modalSecondaryButtonText", "modalTitle", "nextButtonText", "onClose", "onRequestSubmit", "submitButtonText"];
var blockClass = "".concat(pkg.prefix, "--create-full-page");
var componentName = 'CreateFullPage'; // This is a general context for the steps container
// containing information about the state of the container
// and providing some callback methods for steps to use

var StepsContext = /*#__PURE__*/createContext(null); // This is a context supplied separately to each step in the container
// to let it know what number it is in the sequence of steps

var StepNumberContext = /*#__PURE__*/createContext(-1);
var CreateFullPage = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var backButtonText = _ref.backButtonText,
      cancelButtonText = _ref.cancelButtonText,
      children = _ref.children,
      className = _ref.className,
      modalDangerButtonText = _ref.modalDangerButtonText,
      modalDescription = _ref.modalDescription,
      modalSecondaryButtonText = _ref.modalSecondaryButtonText,
      modalTitle = _ref.modalTitle,
      nextButtonText = _ref.nextButtonText,
      onClose = _ref.onClose,
      onRequestSubmit = _ref.onRequestSubmit,
      submitButtonText = _ref.submitButtonText,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      createFullPageActions = _useState2[0],
      setCreateFullPageActions = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      shouldViewAll = _useState4[0],
      setShouldViewAll = _useState4[1];

  var _useState5 = useState(1),
      _useState6 = _slicedToArray(_useState5, 2),
      currentStep = _useState6[0],
      setCurrentStep = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isSubmitting = _useState8[0],
      setIsSubmitting = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      modalIsOpen = _useState10[0],
      setModalIsOpen = _useState10[1];

  var previousState = usePreviousValue({
    currentStep: currentStep,
    open: open
  });

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isDisabled = _useState12[0],
      setIsDisabled = _useState12[1];

  var _useState13 = useState(),
      _useState14 = _slicedToArray(_useState13, 2),
      onNext = _useState14[0],
      _setOnNext = _useState14[1];

  var _useState15 = useState(),
      _useState16 = _slicedToArray(_useState15, 2),
      onMount = _useState16[0],
      _setOnMount = _useState16[1];

  var _useState17 = useState([]),
      _useState18 = _slicedToArray(_useState17, 2),
      stepData = _useState18[0],
      setStepData = _useState18[1];

  var _useState19 = useState(1),
      _useState20 = _slicedToArray(_useState19, 2),
      firstIncludedStep = _useState20[0],
      setFirstIncludedStep = _useState20[1];

  var _useState21 = useState(null),
      _useState22 = _slicedToArray(_useState21, 2),
      lastIncludedStep = _useState22[0],
      setLastIncludedStep = _useState22[1];

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
    setCreateComponentActions: setCreateFullPageActions,
    setModalIsOpen: setModalIsOpen
  }); // currently, we are not supporting the use of 'view all' toggle state

  /* istanbul ignore next */

  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    ref: ref,
    className: cx(blockClass, className)
  }, getDevtoolsProps(componentName)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__influencer")
  }, /*#__PURE__*/React.createElement(CreateInfluencer, {
    stepData: stepData,
    currentStep: currentStep
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__body")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__main")
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(blockClass, "__content")
  }, /*#__PURE__*/React.createElement(Form, {
    className: "".concat(blockClass, "__form")
  }, /*#__PURE__*/React.createElement(StepsContext.Provider, {
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
  })))), /*#__PURE__*/React.createElement(ActionSet, {
    className: "".concat(blockClass, "__buttons"),
    actions: createFullPageActions,
    size: "2xl"
  }))), /*#__PURE__*/React.createElement(ComposedModal, {
    className: "".concat(blockClass, "__modal"),
    size: "sm",
    open: modalIsOpen,
    "aria-label": modalTitle
  }, /*#__PURE__*/React.createElement(ModalHeader, {
    title: modalTitle
  }), /*#__PURE__*/React.createElement(ModalBody, null, /*#__PURE__*/React.createElement("p", null, modalDescription)), /*#__PURE__*/React.createElement(ModalFooter, null, /*#__PURE__*/React.createElement(Button, {
    type: "button",
    kind: "secondary",
    onClick: function onClick() {
      setModalIsOpen(!modalIsOpen);
    }
  }, modalSecondaryButtonText), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    kind: "danger",
    onClick: onClose
  }, modalDangerButtonText))));
}); // Return a placeholder if not released and not enabled by feature flag.

CreateFullPage = pkg.checkComponentEnabled(CreateFullPage, componentName); // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

CreateFullPage.displayName = componentName; // The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.

CreateFullPage.propTypes = {
  /**
   * The back button text
   */
  backButtonText: PropTypes.string.isRequired,

  /**
   * The cancel button text
   */
  cancelButtonText: PropTypes.string.isRequired,

  /**
   * The main content of the full page
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * The primary 'danger' button text in the modal
   */
  modalDangerButtonText: PropTypes.string.isRequired,

  /**
   * The description located below the title in the modal
   */
  modalDescription: PropTypes.string,

  /**
   * The secondary button text in the modal
   */
  modalSecondaryButtonText: PropTypes.string.isRequired,

  /**
   * The title located in the header of the modal
   */
  modalTitle: PropTypes.string.isRequired,

  /**
   * The next button text
   */
  nextButtonText: PropTypes.string.isRequired,

  /**
   * An optional handler that is called when the user closes the full page (by
   * clicking the secondary button, located in the modal, which triggers after
   * clicking the ghost button in the modal
   */
  onClose: PropTypes.func,

  /**
   * Specify a handler for submitting the multi step full page (final step).
   * This function can _optionally_ return a promise that is either
   * resolved or rejected and the CreateFullPage will handle the
   * submitting state of the create button.
   */
  onRequestSubmit: PropTypes.func.isRequired,

  /**
   * @ignore
   * The aria label to be used for the UI Shell SideNav Carbon component
   */
  sideNavAriaLabel: PropTypes.string,

  /**
   * The submit button text
   */
  submitButtonText: PropTypes.string.isRequired,

  /**
   * The main title of the full page, displayed in the header area.
   */
  title: PropTypes.node
};

export { CreateFullPage, StepNumberContext, StepsContext };
