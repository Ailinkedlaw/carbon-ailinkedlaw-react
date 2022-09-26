// AutoCompleteMui.stories.js|jsx

import React, { useState } from 'react'

import { AutoCompleteMui } from './AutoCompleteMui';
import {
  prepareStory,
} from '@/global/js/utils/story-helper'

/**
 * 随机生成字符串
 * @param len 指定生成字符串长度
 */
 function getRandomString (len) {
  let _charStr =
      'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
    min = 0,
    max = _charStr.length - 1,
    // 定义随机字符串 变量
    _str = '';
  // 判断是否指定长度，否则默认长度为15
  len = len || 15;
  // 循环生成字符串
  // eslint-disable-next-line no-var
  for (var i = 0, index; i < len; i++) {
    index = (function (randomIndexFunc, i) {
      return randomIndexFunc(min, max, i, randomIndexFunc);
    })(function (min, max, i, _self) {
      let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
        numStart = _charStr.length - 10;
      if (i === 0 && indexTemp >= numStart) {
        indexTemp = _self(min, max, i, _self);
      }
      return indexTemp;
    }, i);
    _str += _charStr[index];
  }
  return _str;
}
export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/AutoCompleteMui',
  component: AutoCompleteMui,
};
/**
 * TODO: Declare template(s) for one or more scenarios.
 */
 const Template = ({
  label,
  placeholder,
  onChange,
  onInputChangeProps,
  propsOptions,
  getOptionLabel,
  isOptionEqualToValue,
  ...rest
}) => {
    const [options, setOptions] = useState([])
    const onInputChange = async (event, newInputValue) => {
      if (newInputValue && newInputValue !== '') {
        const data = [
          { name: `${getRandomString(10)}`, year: 1995 },
          { name: `${getRandomString(10)}`, year: 1991 },
          { name: `${getRandomString(10)}`, year: 1946 },
          { name: `${getRandomString(10)}`, year: 1997 }
        ]
        // 调用后端接口
        setOptions([...data])
      } else {
      }
    };
    return (
      <>
        <AutoCompleteMui
          placeholderProps
          propsOptions={options} // 关键字获取的列表
          // name根据后端的return可配置
          getOptionLabel={(option) => option.name} // name 为可配置的值
          isOptionEqualToValue={(option, value) => option.name === value.name} // name 为可配置的值
          onChange={(event, newValue) => {
            // 拿到选中的值
          }}
          onInputChangeProps={(event, newInputValue) => {
            onInputChange(event, newInputValue);
          }}
          {...rest}
        />
      </>
    )
  }
export const autoComplete = prepareStory(Template, {
  storyName: 'auto complete',
  args: {
    placeholderProps: '请输入关键词',
    size: 'small',
    // options: [],
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
    // value: '',
    readOnly: false,
    // inputValue: '',
    // includeInputInList: false
}
})