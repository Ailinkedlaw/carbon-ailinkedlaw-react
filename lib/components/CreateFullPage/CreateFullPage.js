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
var devtools = require('../../global/js/utils/devtools.js');
var settings = require('../../settings.js');
var react = require('@carbon/react');
var lastIndexInArray = require('../../global/js/utils/lastIndexInArray.js');
var usePreviousValue = require('../../global/js/hooks/usePreviousValue.js');
var useCreateComponentFocus = require('../../global/js/hooks/useCreateComponentFocus.js');
var useValidCreateStepCount = require('../../global/js/hooks/useValidCreateStepCount.js');
var useCreateComponentStepChange = require('../../global/js/hooks/useCreateComponentStepChange.js');
var CreateInfluencer = require('../CreateInfluencer/CreateInfluencer.js');
var ActionSet = require('../ActionSet/ActionSet.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["backButtonText", "cancelButtonText", "children", "className", "modalDangerButtonText", "modalDescription", "modalSecondaryButtonText", "modalTitle", "nextButtonText", "onClose", "onRequestSubmit", "submitButtonText"];
var blockClass = "".concat(settings.pkg.prefix, "--create-full-page");
var componentName = 'CreateFullPage'; // This is a general context for the steps container
// containing information about the state of the container
// and providing some callback methods for steps to use

var StepsContext = /*#__PURE__*/React.createContext(null); // This is a context supplied separately to each step in the container
// to let it know what number it is in the sequence of steps

var StepNumberContext = /*#__PURE__*/React.createContext(-1);
exports.CreateFullPage = /*#__PURE__*/React__default["default"].forwardRef(function (_ref, ref) {
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
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var _useState = React.useState([]),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      createFullPageActions = _useState2[0],
      setCreateFullPageActions = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _rollupPluginBabelHelpers.slicedToArray(_useState3, 2),
      shouldViewAll = _useState4[0],
      setShouldViewAll = _useState4[1];

  var _useState5 = React.useState(1),
      _useState6 = _rollupPluginBabelHelpers.slicedToArray(_useState5, 2),
      currentStep = _useState6[0],
      setCurrentStep = _useState6[1];

  var _useState7 = React.useState(false),
      _useState8 = _rollupPluginBabelHelpers.slicedToArray(_useState7, 2),
      isSubmitting = _useState8[0],
      setIsSubmitting = _useState8[1];

  var _useState9 = React.useState(false),
      _useState10 = _rollupPluginBabelHelpers.slicedToArray(_useState9, 2),
      modalIsOpen = _useState10[0],
      setModalIsOpen = _useState10[1];

  var previousState = usePreviousValue.usePreviousValue({
    currentStep: currentStep,
    open: open
  });

  var _useState11 = React.useState(false),
      _useState12 = _rollupPluginBabelHelpers.slicedToArray(_useState11, 2),
      isDisabled = _useState12[0],
      setIsDisabled = _useState12[1];

  var _useState13 = React.useState(),
      _useState14 = _rollupPluginBabelHelpers.slicedToArray(_useState13, 2),
      onNext = _useState14[0],
      _setOnNext = _useState14[1];

  var _useState15 = React.useState(),
      _useState16 = _rollupPluginBabelHelpers.slicedToArray(_useState15, 2),
      onMount = _useState16[0],
      _setOnMount = _useState16[1];

  var _useState17 = React.useState([]),
      _useState18 = _rollupPluginBabelHelpers.slicedToArray(_useState17, 2),
      stepData = _useState18[0],
      setStepData = _useState18[1];

  var _useState19 = React.useState(1),
      _useState20 = _rollupPluginBabelHelpers.slicedToArray(_useState19, 2),
      firstIncludedStep = _useState20[0],
      setFirstIncludedStep = _useState20[1];

  var _useState21 = React.useState(null),
      _useState22 = _rollupPluginBabelHelpers.slicedToArray(_useState21, 2),
      lastIncludedStep = _useState22[0],
      setLastIncludedStep = _useState22[1];

  React.useEffect(function () {
    var firstItem = stepData.findIndex(function (item) {
      return item === null || item === void 0 ? void 0 : item.shouldIncludeStep;
    }) + 1;
    var lastItem = lastIndexInArray.lastIndexInArray(stepData, 'shouldIncludeStep', true);

    if (firstItem !== firstIncludedStep) {
      setFirstIncludedStep(firstItem);
    }

    if (lastItem !== lastIncludedStep) {
      setLastIncludedStep(lastItem);
    }
  }, [stepData, firstIncludedStep, lastIncludedStep]);
  useCreateComponentFocus.useCreateComponentFocus({
    previousState: previousState,
    currentStep: currentStep,
    blockClass: blockClass,
    onMount: onMount
  });
  useValidCreateStepCount.useValidCreateStepCount(stepData.length, componentName);
  useCreateComponentStepChange.useCreateComponentStepChange({
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

  return /*#__PURE__*/React__default["default"].createElement("div", _rollupPluginBabelHelpers["extends"]({}, rest, {
    ref: ref,
    className: cx__default["default"](blockClass, className)
  }, devtools.getDevtoolsProps(componentName)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__influencer")
  }, /*#__PURE__*/React__default["default"].createElement(CreateInfluencer.CreateInfluencer, {
    stepData: stepData,
    currentStep: currentStep
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__body")
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__main")
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__content")
  }, /*#__PURE__*/React__default["default"].createElement(react.Form, {
    className: "".concat(blockClass, "__form")
  }, /*#__PURE__*/React__default["default"].createElement(StepsContext.Provider, {
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
  }, React__default["default"].Children.map(children, function (child, index) {
    return /*#__PURE__*/React__default["default"].createElement(StepNumberContext.Provider, {
      value: index + 1
    }, child);
  })))), /*#__PURE__*/React__default["default"].createElement(ActionSet.ActionSet, {
    className: "".concat(blockClass, "__buttons"),
    actions: createFullPageActions,
    size: "2xl"
  }))), /*#__PURE__*/React__default["default"].createElement(react.ComposedModal, {
    className: "".concat(blockClass, "__modal"),
    size: "sm",
    open: modalIsOpen,
    "aria-label": modalTitle
  }, /*#__PURE__*/React__default["default"].createElement(react.ModalHeader, {
    title: modalTitle
  }), /*#__PURE__*/React__default["default"].createElement(react.ModalBody, null, /*#__PURE__*/React__default["default"].createElement("p", null, modalDescription)), /*#__PURE__*/React__default["default"].createElement(react.ModalFooter, null, /*#__PURE__*/React__default["default"].createElement(react.Button, {
    type: "button",
    kind: "secondary",
    onClick: function onClick() {
      setModalIsOpen(!modalIsOpen);
    }
  }, modalSecondaryButtonText), /*#__PURE__*/React__default["default"].createElement(react.Button, {
    type: "button",
    kind: "danger",
    onClick: onClose
  }, modalDangerButtonText))));
}); // Return a placeholder if not released and not enabled by feature flag.

exports.CreateFullPage = settings.pkg.checkComponentEnabled(exports.CreateFullPage, componentName); // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

exports.CreateFullPage.displayName = componentName; // The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.

exports.CreateFullPage.propTypes = {
  /**
   * The back button text
   */
  backButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * The cancel button text
   */
  cancelButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * The main content of the full page
   */
  children: PropTypes__default["default"].node,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes__default["default"].string,

  /**
   * The primary 'danger' button text in the modal
   */
  modalDangerButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * The description located below the title in the modal
   */
  modalDescription: PropTypes__default["default"].string,

  /**
   * The secondary button text in the modal
   */
  modalSecondaryButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * The title located in the header of the modal
   */
  modalTitle: PropTypes__default["default"].string.isRequired,

  /**
   * The next button text
   */
  nextButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * An optional handler that is called when the user closes the full page (by
   * clicking the secondary button, located in the modal, which triggers after
   * clicking the ghost button in the modal
   */
  onClose: PropTypes__default["default"].func,

  /**
   * Specify a handler for submitting the multi step full page (final step).
   * This function can _optionally_ return a promise that is either
   * resolved or rejected and the CreateFullPage will handle the
   * submitting state of the create button.
   */
  onRequestSubmit: PropTypes__default["default"].func.isRequired,

  /**
   * @ignore
   * The aria label to be used for the UI Shell SideNav Carbon component
   */
  sideNavAriaLabel: PropTypes__default["default"].string,

  /**
   * The submit button text
   */
  submitButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * The main title of the full page, displayed in the header area.
   */
  title: PropTypes__default["default"].node
};

exports.StepNumberContext = StepNumberContext;
exports.StepsContext = StepsContext;
