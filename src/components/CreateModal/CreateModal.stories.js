/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  TextInput,
  NumberInput,
  TextArea,
  Dropdown,
  DatePicker,
  DatePickerInput,
  RadioButton,
  RadioButtonGroup,
  usePrefix
} from '@carbon/react'

import { pkg } from '@/settings'
import {
  getStoryTitle,
  prepareStory
} from '@/global/js/utils/story-helper'
import { CreateModal } from './index'
// import mdx from './CreateModal.mdx'

import styles from './_storybook-styles.scss'

export default {
  title: 'Components/CreateModal',
  component: CreateModal,
  parameters: {
    styles,
    // docs: { page: mdx },
    // controls: { sort: 'requiredFirst' }
  },
  argTypes: {
    open: {
      control: {
        disable: true
      }
    }
  }
}

const Template = ({ storyInitiallyOpen = true, story, children, ...args }) => {
  const carbonPrefix = usePrefix()
  const [open, setOpen] = useState(storyInitiallyOpen)
  const handleOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button onClick={handleOpen}>打开弹窗 {story?.storyName}</Button>
      
      <style>{`.${pkg.prefix}--create-modal { opacity: 0 }`};</style>
      <CreateModal
        open={open}
        onRequestClose={handleClose}
        {...args}
        selectorPrimaryFocus={`.${carbonPrefix}--text-input`}
      >
        {children}
      </CreateModal>
    </>
  )
}

const defaultProps = {
  title: '标题',
  subtitle: '您的字幕文本将出现在此处',
  description:
    '这是将出现在您的模式中的示例描述文本',
  primaryButtonText: '创建',
  secondaryButtonText: '取消'
}

Template.propTypes = {
  story: PropTypes.object,
  storyInitiallyOpen: PropTypes.bool,
  ...CreateModal.propTypes,
  children: PropTypes.node,
}

export const Default = prepareStory(Template, {
  storyName: 'Create Modal',
  args: {
    ...defaultProps,
    children: (
      <>
        <TextInput
          id="1"
          key="form-field-1"
          labelText="Text input label"
          helperText="Helper text goes here"
          placeholder="Placeholder"
        />
      </>
    )
  }
})

// export const Default = Template.bind({})
// Default.args = {
//   ...defaultProps,
//   children: (
//     <>
//       <TextInput
//         id="1"
//         key="form-field-1"
//         labelText="Text input label"
//         helperText="Helper text goes here"
//         placeholder="Placeholder"
//       />
//       <NumberInput
//         id="2"
//         className="create-modal--storybook-input"
//         label="Number input label"
//         helperText="Optional helper text goes here"
//         min={0}
//         max={50}
//         value={1}
//         iconDescription="Choose a number"
//       />
//       <RadioButtonGroup
//         legendText="Radio button legend text goes here"
//         name="radio-button-group"
//         defaultSelected="radio-1"
//       >
//         <RadioButton labelText="Radio-1" value="radio-1" id="radio-1" />
//         <RadioButton labelText="Radio-2" value="radio-2" id="radio-2" />
//         <RadioButton labelText="Radio-3" value="radio-3" id="radio-3" />
//       </RadioButtonGroup>
//       <DatePicker datePickerType="single">
//         <DatePickerInput
//           placeholder="yyyy/dd/mm"
//           labelText="Date picker input label"
//           id="date-picker-single"
//         />
//       </DatePicker>
//     </>
//   )
// }
