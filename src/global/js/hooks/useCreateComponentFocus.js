/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from 'react'
import { getFocusableElements } from '../utils/getFocusableElements'

// Focus the first focusable element and call the onMount prop for the current step if one is provided
export const useCreateComponentFocus = ({
  previousState,
  currentStep,
  blockClass,
  onMount
}) => {
  useEffect(() => {
    if (typeof onMount === 'function') {
      onMount()
    }
  }, [onMount])
  useEffect(() => {
    if (previousState?.currentStep !== currentStep && currentStep > 0) {
      const visibleStepInnerContent = document.querySelector(
        `.${blockClass}__step.${blockClass}__step__step--visible-step`
      )
      const focusableStepElements = visibleStepInnerContent
        ? getFocusableElements(visibleStepInnerContent)
        : []
      if (focusableStepElements && focusableStepElements.length) {
        focusableStepElements[0].focus()
      } else {
        const nextButton = document.querySelector(
          `.${blockClass}__create-button`
        )
        nextButton?.focus()
      }
    }
  }, [currentStep, previousState, blockClass, onMount])
}
