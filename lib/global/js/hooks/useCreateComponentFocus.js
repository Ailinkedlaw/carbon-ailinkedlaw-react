/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var getFocusableElements = require('../utils/getFocusableElements.js');

var useCreateComponentFocus = function useCreateComponentFocus(_ref) {
  var previousState = _ref.previousState,
      currentStep = _ref.currentStep,
      blockClass = _ref.blockClass,
      onMount = _ref.onMount;
  React.useEffect(function () {
    if (typeof onMount === 'function') {
      onMount();
    }
  }, [onMount]);
  React.useEffect(function () {
    if ((previousState === null || previousState === void 0 ? void 0 : previousState.currentStep) !== currentStep && currentStep > 0) {
      var visibleStepInnerContent = document.querySelector(".".concat(blockClass, "__step.").concat(blockClass, "__step__step--visible-step"));
      var focusableStepElements = visibleStepInnerContent ? getFocusableElements.getFocusableElements(visibleStepInnerContent) : [];

      if (focusableStepElements && focusableStepElements.length) {
        focusableStepElements[0].focus();
      } else {
        var nextButton = document.querySelector(".".concat(blockClass, "__create-button"));
        nextButton === null || nextButton === void 0 ? void 0 : nextButton.focus();
      }
    }
  }, [currentStep, previousState, blockClass, onMount]);
};

exports.useCreateComponentFocus = useCreateComponentFocus;
