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
var wrapFocus = require('../../global/js/utils/wrapFocus.js');
var TearsheetShell = require('../Tearsheet/TearsheetShell.js');
var settings = require('../../settings.js');
var devtools = require('../../global/js/utils/devtools.js');
var lastIndexInArray = require('../../global/js/utils/lastIndexInArray.js');
var usePreviousValue = require('../../global/js/hooks/usePreviousValue.js');
var useCreateComponentFocus = require('../../global/js/hooks/useCreateComponentFocus.js');
var useValidCreateStepCount = require('../../global/js/hooks/useValidCreateStepCount.js');
var useResetCreateComponent = require('../../global/js/hooks/useResetCreateComponent.js');
var useCreateComponentStepChange = require('../../global/js/hooks/useCreateComponentStepChange.js');
var CreateInfluencer = require('../CreateInfluencer/CreateInfluencer.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var _excluded = ["backButtonText", "cancelButtonText", "children", "className", "description", "influencerWidth", "initialStep", "label", "nextButtonText", "onClose", "onRequestSubmit", "open", "submitButtonText", "title", "verticalPosition"];
var componentName = 'CreateTearsheet';
var blockClass = "".concat(settings.pkg.prefix, "--tearsheet-create"); // This is a general context for the steps container
// containing information about the state of the container
// and providing some callback methods for steps to use

var StepsContext = /*#__PURE__*/React.createContext(null); // This is a context supplied separately to each step in the container
// to let it know what number it is in the sequence of steps

var StepNumberContext = /*#__PURE__*/React.createContext(-1); // Default values for props

var defaults = {
  verticalPosition: 'normal',
  influencerWidth: 'narrow'
};
exports.CreateTearsheet = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
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
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);

  var _useState = React.useState([]),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      createTearsheetActions = _useState2[0],
      setCreateTearsheetActions = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _rollupPluginBabelHelpers.slicedToArray(_useState3, 2),
      shouldViewAll = _useState4[0],
      setShouldViewAll = _useState4[1];

  var _useState5 = React.useState(0),
      _useState6 = _rollupPluginBabelHelpers.slicedToArray(_useState5, 2),
      currentStep = _useState6[0],
      setCurrentStep = _useState6[1];

  var _useState7 = React.useState(false),
      _useState8 = _rollupPluginBabelHelpers.slicedToArray(_useState7, 2),
      isSubmitting = _useState8[0],
      setIsSubmitting = _useState8[1];

  var _useState9 = React.useState(false),
      _useState10 = _rollupPluginBabelHelpers.slicedToArray(_useState9, 2),
      isDisabled = _useState10[0],
      setIsDisabled = _useState10[1];

  var _useState11 = React.useState(),
      _useState12 = _rollupPluginBabelHelpers.slicedToArray(_useState11, 2),
      onNext = _useState12[0],
      _setOnNext = _useState12[1];

  var _useState13 = React.useState(),
      _useState14 = _rollupPluginBabelHelpers.slicedToArray(_useState13, 2),
      onMount = _useState14[0],
      _setOnMount = _useState14[1];

  var _useState15 = React.useState([]),
      _useState16 = _rollupPluginBabelHelpers.slicedToArray(_useState15, 2),
      stepData = _useState16[0],
      setStepData = _useState16[1];

  var _useState17 = React.useState(1),
      _useState18 = _rollupPluginBabelHelpers.slicedToArray(_useState17, 2),
      firstIncludedStep = _useState18[0],
      setFirstIncludedStep = _useState18[1];

  var _useState19 = React.useState(null),
      _useState20 = _rollupPluginBabelHelpers.slicedToArray(_useState19, 2),
      lastIncludedStep = _useState20[0],
      setLastIncludedStep = _useState20[1];

  var previousState = usePreviousValue.usePreviousValue({
    currentStep: currentStep,
    open: open
  });
  var contentRef = React.useRef();
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
  useResetCreateComponent.useResetCreateComponent({
    firstIncludedStep: firstIncludedStep,
    previousState: previousState,
    open: open,
    setCurrentStep: setCurrentStep,
    initialStep: initialStep,
    totalSteps: stepData === null || stepData === void 0 ? void 0 : stepData.length,
    componentName: componentName
  });
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
    setCreateComponentActions: setCreateTearsheetActions
  }); // adds focus trap functionality

  /* istanbul ignore next */

  var handleBlur = function handleBlur(_ref2) {
    var oldActiveNode = _ref2.target,
        currentActiveNode = _ref2.relatedTarget;
    var visibleStepInnerContent = document.querySelector(".".concat(settings.pkg.prefix, "--tearsheet__body"));

    if (open && visibleStepInnerContent) {
      wrapFocus["default"]({
        bodyNode: visibleStepInnerContent,
        currentActiveNode: currentActiveNode,
        oldActiveNode: oldActiveNode
      });
    }
  };

  return /*#__PURE__*/React__default["default"].createElement(TearsheetShell.TearsheetShell, _rollupPluginBabelHelpers["extends"]({}, rest, devtools.getDevtoolsProps(componentName), {
    actions: createTearsheetActions,
    className: cx__default["default"](blockClass, className),
    description: description,
    hasCloseIcon: false,
    influencer: /*#__PURE__*/React__default["default"].createElement(CreateInfluencer.CreateInfluencer, {
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
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(blockClass, "__content"),
    onBlur: handleBlur,
    ref: contentRef
  }, /*#__PURE__*/React__default["default"].createElement(react.Form, null, /*#__PURE__*/React__default["default"].createElement(StepsContext.Provider, {
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
  })))));
}); // Return a placeholder if not released and not enabled by feature flag

exports.CreateTearsheet = settings.pkg.checkComponentEnabled(exports.CreateTearsheet, componentName); // The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.

exports.CreateTearsheet.displayName = componentName; // Note that the descriptions here should be kept in sync with those for the
// corresponding props for TearsheetNarrow and TearsheetShell components.

exports.CreateTearsheet.propTypes = {
  /**
   * The back button text
   */
  backButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * The cancel button text
   */
  cancelButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * The main content of the tearsheet
   */
  children: PropTypes__default["default"].node,

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className: PropTypes__default["default"].string,

  /**
   * A description of the flow, displayed in the header area of the tearsheet.
   */
  description: PropTypes__default["default"].node,

  /**
   * Used to set the size of the influencer
   */
  influencerWidth: PropTypes__default["default"].oneOf(['narrow', 'wide']),

  /**
   * This can be used to open the component to a step other than the first step.
   * For example, a create flow was previously in progress, data was saved, and
   * is now being completed.
   */
  initialStep: PropTypes__default["default"].number,

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label: PropTypes__default["default"].node,

  /**
   * The next button text
   */
  nextButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onClose: PropTypes__default["default"].func,

  /**
   * Specify a handler for submitting the multi step tearsheet (final step).
   * This function can _optionally_ return a promise that is either resolved or
   * rejected and the CreateTearsheet will handle the submitting state of the create button.
   */
  onRequestSubmit: PropTypes__default["default"].func.isRequired,

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open: PropTypes__default["default"].bool,

  /**
   * The submit button text
   */
  submitButtonText: PropTypes__default["default"].string.isRequired,

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title: PropTypes__default["default"].node,

  /**
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position (the default) is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition: PropTypes__default["default"].oneOf(['normal', 'lower'])
};

exports.StepNumberContext = StepNumberContext;
exports.StepsContext = StepsContext;
