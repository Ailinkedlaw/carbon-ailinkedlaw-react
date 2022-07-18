import React from 'react'
import { action } from '@storybook/addon-actions'

import { ActionSet } from './ActionSet'
import { actionsLabels, actionsMapping, actionsOptions } from './actions'

import styles from './_action-set.scss'

export default {
  title: 'Components/ActionSet',
  component: ActionSet,
  parameters: {
    styles
  },
  argTypes: {
    actions: {
      control: {
        type: 'select',
        labels: actionsLabels
      },
      options: actionsOptions,
      mapping: actionsMapping({}, action)
    }
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line react/prop-types
const Template = ({ actions, size = 'md', ...args }) => {
  return (
    <ActionSet {...{ actions, size, ...args }} />
  )
}

export const actionSet = Template.bind({})
actionSet.args = {
  actions: 10
}

