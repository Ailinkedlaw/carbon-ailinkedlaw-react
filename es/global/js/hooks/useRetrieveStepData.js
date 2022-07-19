/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { toConsumableArray as _toConsumableArray } from '../../../_virtual/_rollupPluginBabelHelpers.js';
import { useEffect } from 'react';

/**
 * This useEffect makes sure that every CreateTearsheetStep/CreateFullPageStep reports back it's
 * title, secondaryLabel, introStep, and shouldIncludeStep data so that it can be sent to the CreateInfluencer.
 * @param {object} useResetCreateComponent
 * @param {object} useResetCreateComponent.stepsContext
 * @param {number} useResetCreateComponent.stepNumber
 * @param {boolean} useResetCreateComponent.introStep
 * @param {boolean} useResetCreateComponent.shouldIncludeStep
 * @param {string} useResetCreateComponent.secondaryLabel
 * @param {string} useResetCreateComponent.title
 */

var useRetrieveStepData = function useRetrieveStepData(_ref) {
  var stepsContext = _ref.stepsContext,
      stepNumber = _ref.stepNumber,
      introStep = _ref.introStep,
      shouldIncludeStep = _ref.shouldIncludeStep,
      secondaryLabel = _ref.secondaryLabel,
      title = _ref.title;
  useEffect(function () {
    if (stepsContext) {
      stepsContext.setStepData(function (prev) {
        var stepItem = {
          title: title,
          secondaryLabel: secondaryLabel,
          introStep: introStep,
          shouldIncludeStep: shouldIncludeStep
        };
        var previousItem = prev[stepNumber - 1];

        if ((previousItem === null || previousItem === void 0 ? void 0 : previousItem.title) !== stepItem.title || (previousItem === null || previousItem === void 0 ? void 0 : previousItem.secondaryLabel) !== stepItem.secondaryLabel || (previousItem === null || previousItem === void 0 ? void 0 : previousItem.introStep) !== stepItem.introStep || (previousItem === null || previousItem === void 0 ? void 0 : previousItem.shouldIncludeStep) !== stepItem.shouldIncludeStep) {
          var clone = _toConsumableArray(prev);

          clone[stepNumber - 1] = stepItem;
          return clone;
        }

        return prev;
      });
    }
  }, [shouldIncludeStep, title, secondaryLabel, introStep, stepsContext, stepNumber]);
};

export { useRetrieveStepData };
