//
// Copyright IBM Corp. 2021, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react'

import { StatusIcon } from '.'
import mdx from './StatusIcon.mdx'
import styles from './_storybook-styles.scss'
import { prepareStory } from '@/global/js/utils/story-helper'

export default {
  title: 'Components/StatusIcon',
  component: StatusIcon,
  argTypes: {
    kind: {
      control: {
        type: 'select',
        labels: [
          'fatal',
          'critical',
          'major-warning',
          'minor-warning',
          'undefined',
          'unknown',
          'normal',
          'info',
          'in-progress',
          'running',
          'pending',
        ],
      },
    },
    size: {
      control: {
        type: 'select',
      },
      labels: ['sm', 'md', 'lg', 'xl'],
    },
    theme: {
      control: {
        type: 'radio',
      },
      labels: ['light', 'dark'],
    },
  },
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
}

const defaultProps = {
  kind: 'fatal',
  size: 'sm',
  theme: 'light',
  iconDescription: 'Fatal',
}

const Template = (args) => {
  return <StatusIcon {...args} />
}

export const Default = prepareStory(Template, {
  args: {
    ...defaultProps,
  },
})
