// SelectMultiple.stories.js|jsx

import React, { useEffect, useState } from 'react';

import { SelectMultiple } from './SelectMultiple';
import {
  prepareStory,
} from '@/global/js/utils/story-helper'
const top100Films = [
  {
    id: 'downshift-1-item-0',
    text: 'Option 1',
  },
  {
    id: 'downshift-1-item-1',
    text: 'Option 2',
  },
  {
    id: 'downshift-1-item-2',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'downshift-1-item-3',
    text: 'Option 4',
  },
  {
    id: 'downshift-1-item-4',
    text: 'An example',
  },
  {
    id: 'downshift-1-item-5',
    text: 'Option 5',
  },
];
export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/SelectMultiple',
  component: SelectMultiple,
};
/**
 * TODO: Declare template(s) for one or more scenarios.
 */
 const Template = ({
  size, optionsProps: [], getOptionLabel, defaultValue, onChangeMul, onInputChange, label, placeholder, width, labelInValue, ...rest
}) => {
  const [propsOptionsMul, setPropsOptionsMul] = useState([]);

  useEffect(async () => {
    // 查询后端接口获取数据
    setPropsOptionsMul([...top100Films]);
  }, []);
    return (
      <>
        <SelectMultiple
          size={size}
          optionsProps={propsOptionsMul}
          placeholder={placeholder}
          // title根据后端的return可配置
          getOptionLabel={(option) => option.text}
          // 禁用
          // getOptionDisabled={(option) =>
          //   option === items[0] || option === items[2]
          // }
          labelInValue="text"
          onChangeMul={(event, newValue) => {
            console.log('mul', newValue);
          }}
          onInputChange={(event, newInputValue) => {
            console.log('onInputChange', newInputValue);
          }}
          // defaultValue
          width={300}
        />
      </>
    )
  }
export const selectMultiple = prepareStory(Template, {
  storyName: 'select multiple',
  args: {
    placeholder: '请选择',
    // limitTags: {},
    optionsProps: [],
    size: 'small',
    open: false,
    autoHighlight: false,
    disabled: false,
    sx: [
      {
        '&.MuiChip-root': {
          // background: '#161616',
          // color: '#fff',
          // height: '22px'
        },
      }
    ],
    value: '',
    readOnly: false,
    inputValue: '',
    includeInputInList: false
}
})