/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { ProgressIndicator, ProgressStep } from '@carbon/react'
import '../../global/js/utils/props-helper'

import { pkg } from '@/settings'

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--create-influencer`
const componentName = 'CreateInfluencer'

export let CreateInfluencer = ({ className, currentStep, stepData }) => {
  const getNumberOfDynamicStepsBeforeCurrentStep = (array, key) => {
    const dynamicSteps = []
    array.forEach((item, index) => {
      if (array[index]?.[key] === false && index <= currentStep - 1) {
        dynamicSteps.push(item)
      }
    })
    return dynamicSteps.length
  }

  // renders the step progression components in the left influencer area
  const renderProgressSteps = () => {
    const extractedSteps = stepData?.filter((item) => !item?.introStep)
    const progressSteps = extractedSteps?.filter(
      (item) => item?.shouldIncludeStep
    )

    // To get the ProgressIndicator's `currentIndex`, accounting for dynamic steps,
    // we need to subtract the number of !shouldIncludeStep/s before the current step
    // which we get from `getNumberOfDynamicStepsBeforeCurrentStep()`
    const totalDynamicSteps =
      getNumberOfDynamicStepsBeforeCurrentStep(stepData, 'shouldIncludeStep') ||
      0

    return (
      <div className={`${blockClass}__left-nav`}>
        {currentStep === 1 && stepData[0]?.introStep ? null : (
          <ProgressIndicator
            currentIndex={
              stepData[0]?.introStep
                ? currentStep - totalDynamicSteps - 2 // minus 2 because we need to a
                // ccount for the intro step in addition to `currentIndex` being 0 index based and our steps being 1 index based
                : currentStep - totalDynamicSteps - 1 // minus 1 because ProgressIndicator currentIndex
              // prop is 0 index based, but our steps are 1 index based
            }
            spaceEqually
            vertical
            className={cx(`${blockClass}__progress-indicator`)}
          >
            {progressSteps.map((step, stepIndex) => {
              return (
                <ProgressStep
                  label={step.title}
                  key={stepIndex}
                  secondaryLabel={step.secondaryLabel}
                />
              )
            })}
          </ProgressIndicator>
        )}
      </div>
    )
  }

  return (
    <div className={cx(blockClass, className)}>{renderProgressSteps()}</div>
  )
}

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CreateInfluencer.displayName = componentName

CreateInfluencer.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * Used to mark the current step on the ProgressIndicator component
   */
  currentStep: PropTypes.number.isRequired,

  /**
   * The step data that renders the progress items
   */
  stepData: PropTypes.arrayOf(
    PropTypes.shape({
      introStep: PropTypes.bool,
      secondaryLabel: PropTypes.string,
      shouldIncludeStep: PropTypes.bool,
      title: PropTypes.node,
    })
  ),
}
