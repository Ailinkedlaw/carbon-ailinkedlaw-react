//
// Copyright IBM Corp. 2021, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react'
import PropTypes from 'prop-types'
import pkg from '../package-settings'


const getPath = (s, componentAndPrefix, componentName) =>
  s.reduce(
    (found, next) =>
      // if a previous entry has already matched, pass it forward
      found ||
      (typeof next === 'string'
        ? // if this entry is a string, and it matches the component name
      // we're looking for, return it as an array, else return null
        getEntryPrefixAndComponentName(next) === componentAndPrefix
          ? [getEntryDisplayName(next)]
          : null
        : // if this entry is another structure, find the materialized path
      // into it and prepend its name if found and return null otherwise
        prepend(next.n, getPath(next.s, componentAndPrefix, componentName))),
    null
  )

/**
 * Return the storybook path for a component, given the prefix and name of the
 * component. The prefix enables different components with the same name to be
 * included in the storybook structure.
 * @param {string} prefix The prefix for the component.
 * @param {string} componentName The name of the component.
 * @returns The path for the component storybook entry, or null if the
 * component is not listed in the storybook structure.
 */
export const getPathForComponent = (prefix, componentName) =>
  getPath(s, `${prefix}/${componentName}`, componentName)?.join('/')


/**
 * A helper function to return the structured story title for a component.
 * @param {string} componentName The name of the component.
 * @returns The structured story title.
 */
export const getStoryTitle = (componentName) => {
  const title =
    // if the component isn't in the master structure, put it in a lost+found section
    getPathForComponent('c', componentName) ||
    `Carbon for IBM Products/Lost + found/${componentName}`

  // add a canary tag if the component is public but not normally enabled
  return !pkg.isComponentEnabled(componentName, true) &&
    pkg.isComponentPublic(componentName, true)
    ? `${title}#canary`
    : title
}


/**
 * A helper function to prepare storybook stories for export. This function
 * binds the template, adds the supplied fields, and also inserts a sequence
 * number so that stories can then be sorted into declared order reliably.
 * @param template the story template render function
 * @param options an object containing fields to be added to the bound
 * template, such as `args`, `storyName`, etc.
 * @returns A bound template with the option fields applied.
 */
let sequence = 0
const bindTarget = {}
export const prepareStory = (template, options) => {
  const result = Object.assign(template.bind(bindTarget), options)
  result.parameters ??= {}
  result.parameters.ccsSettings ??= {}
  result.parameters.ccsSettings.sequence = sequence ++
  return result
}

/**
 * A helper component that returns a codesandbox link to an example codesandbox for the component.
 * The link URL is based on the example directory name and the standard codesandbox URL for package examples.
 */
export const CodesandboxLink = ({ exampleDirectory }) => (
  <a
    href={`https://codesandbox.io/s/github/carbon-design-system/ibm-cloud-cognitive/tree/main/examples/carbon-for-ibm-products/${exampleDirectory}`}
  >
    <img
      alt="Edit on CodeSandbox"
      src="https://codesandbox.io/static/img/play-codesandbox.svg"
    />
  </a>
)
CodesandboxLink.propTypes = {
  /**
   * directory withing examples codesandbox will be found
   */
  exampleDirectory: PropTypes.string
}
