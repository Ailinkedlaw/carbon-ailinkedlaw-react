/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { asyncToGenerator as _asyncToGenerator, regeneratorRuntime as _regeneratorRuntime } from '../../../_virtual/_rollupPluginBabelHelpers.js';
import { useCallback, useEffect } from 'react';

var useCreateComponentStepChange = function useCreateComponentStepChange(_ref) {
  var firstIncludedStep = _ref.firstIncludedStep,
      lastIncludedStep = _ref.lastIncludedStep,
      stepData = _ref.stepData,
      onNext = _ref.onNext,
      isSubmitDisabled = _ref.isSubmitDisabled,
      setCurrentStep = _ref.setCurrentStep,
      setIsSubmitting = _ref.setIsSubmitting,
      setShouldViewAll = _ref.setShouldViewAll,
      onClose = _ref.onClose,
      onRequestSubmit = _ref.onRequestSubmit,
      componentName = _ref.componentName,
      currentStep = _ref.currentStep,
      shouldViewAll = _ref.shouldViewAll,
      backButtonText = _ref.backButtonText,
      cancelButtonText = _ref.cancelButtonText,
      submitButtonText = _ref.submitButtonText,
      nextButtonText = _ref.nextButtonText,
      isSubmitting = _ref.isSubmitting,
      componentBlockClass = _ref.componentBlockClass,
      setCreateComponentActions = _ref.setCreateComponentActions,
      setModalIsOpen = _ref.setModalIsOpen;
  var continueToNextStep = useCallback(function () {
    setIsSubmitting(false);
    setCurrentStep(function (prev) {
      // Find next included step to render
      // There will always be a next step otherwise we will
      // have reach the onSubmit
      do {
        var _stepData;

        prev++;
      } while (!((_stepData = stepData[prev - 1]) !== null && _stepData !== void 0 && _stepData.shouldIncludeStep));

      return prev;
    });
  }, [setCurrentStep, setIsSubmitting, stepData]); // useEffect to handle multi step logic

  useEffect(function () {
    var onUnmount = function onUnmount() {
      if (componentName !== 'CreateFullPage') {
        setCurrentStep(0);
      }

      setIsSubmitting(false);
      setShouldViewAll(false);
      onClose();
    };

    var handleOnRequestSubmit = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return onRequestSubmit();

              case 3:
                onUnmount();
                _context.next = 10;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                setIsSubmitting(false);
                console.warn("".concat(componentName, " submit error: ").concat(_context.t0));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      return function handleOnRequestSubmit() {
        return _ref2.apply(this, arguments);
      };
    }();

    var handleNext = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                setIsSubmitting(true);

                if (!(typeof onNext === 'function')) {
                  _context2.next = 14;
                  break;
                }

                _context2.prev = 2;
                _context2.next = 5;
                return onNext();

              case 5:
                continueToNextStep();
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);
                setIsSubmitting(false);
                console.warn("".concat(componentName, " onNext error: ").concat(_context2.t0));

              case 12:
                _context2.next = 15;
                break;

              case 14:
                continueToNextStep();

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 8]]);
      }));

      return function handleNext() {
        return _ref3.apply(this, arguments);
      };
    }();

    var handleSubmit = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                setIsSubmitting(true); // last step should have onNext as well

                if (!(typeof onNext === 'function')) {
                  _context3.next = 15;
                  break;
                }

                _context3.prev = 2;
                _context3.next = 5;
                return onNext();

              case 5:
                _context3.next = 7;
                return handleOnRequestSubmit();

              case 7:
                _context3.next = 13;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);
                setIsSubmitting(false);
                console.warn("".concat(componentName, " onNext error: ").concat(_context3.t0));

              case 13:
                _context3.next = 17;
                break;

              case 15:
                _context3.next = 17;
                return handleOnRequestSubmit();

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 9]]);
      }));

      return function handleSubmit() {
        return _ref4.apply(this, arguments);
      };
    }();

    if ((stepData === null || stepData === void 0 ? void 0 : stepData.length) > 0) {
      var buttons = [];

      if ((stepData === null || stepData === void 0 ? void 0 : stepData.length) > 1 && !shouldViewAll) {
        buttons.push({
          key: 'create-action-button-back',
          label: backButtonText,
          onClick: function onClick() {
            return setCurrentStep(function (prev) {
              // Find previous included step to render
              // There will always be a previous step otherwise we will
              // have disabled the back button since we have reached the first visible step
              do {
                var _stepData2;

                prev--;
              } while (!((_stepData2 = stepData[prev - 1]) !== null && _stepData2 !== void 0 && _stepData2.shouldIncludeStep));

              return prev;
            });
          },
          kind: 'secondary',
          disabled: currentStep === firstIncludedStep
        });
      }

      buttons.push({
        key: 'create-action-button-cancel',
        label: cancelButtonText,
        onClick: componentName === 'CreateFullPage' ? function () {
          return setModalIsOpen(true);
        } : onUnmount,
        kind: 'ghost'
      });
      buttons.push({
        key: 'create-action-button-submit',
        label: shouldViewAll ? submitButtonText : currentStep < lastIncludedStep ? nextButtonText : submitButtonText,
        onClick: shouldViewAll ? handleSubmit : currentStep < lastIncludedStep ? handleNext : handleSubmit,
        disabled: isSubmitDisabled,
        kind: 'primary',
        loading: isSubmitting,
        className: "".concat(componentBlockClass, "__create-button")
      });
      setCreateComponentActions(buttons);
    }
  }, [firstIncludedStep, lastIncludedStep, stepData, onNext, isSubmitDisabled, backButtonText, cancelButtonText, currentStep, onClose, nextButtonText, submitButtonText, onRequestSubmit, isSubmitting, shouldViewAll, componentBlockClass, componentName, continueToNextStep, setCurrentStep, setCreateComponentActions, setIsSubmitting, setShouldViewAll, setModalIsOpen]);
};

export { useCreateComponentStepChange };
