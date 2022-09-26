import React from 'react';
import { DiyCascader } from './DiyCascader';
import { spacing05 } from '@carbon/layout';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/DiyCascader',
  component: DiyCascader,
};

const dataList = [
  {
    value: 'zhinan',
    label: '指南',
    childer: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        parent: 'zhinan',
        childer: [
          { value: 'yizhi', label: '一致', parent: 'shejiyuanze' },
          {
            value: 'xiaolv',
            label: '效率',
            parent: 'shejiyuanze',
            childer: [{ value: 'xxx', label: 'xxx', parent: 'xiaolv' }],
          },
          { value: 'kekong', label: '可控', parent: 'shejiyuanze' },
        ],
      },
      {
        value: 'daohang',
        label: '导航',
        parent: 'zhinan',
        childer: [
          { value: 'cedaohang', label: '侧导航', parent: 'daohang' },
          { value: 'dingbudaohang', label: '顶部导航', parent: 'daohang' },
        ],
      },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    childer: [
      {
        value: 'Basic',
        label: 'Basic',
        parent: 'zujian',
        childer: [
          { value: 'buju', label: '布局', parent: 'Basic' },
          { value: 'secai', label: '色彩', parent: 'Basic' },
          { value: 'ziti', label: '字体', parent: 'Basic' },
          { value: 'tubiao', label: '图标', parent: 'Basic' },
          { value: 'anniu', label: '按钮', parent: 'Basic' },
        ],
      },
      {
        value: 'Form',
        label: 'Form',
        parent: 'zujian',
        childer: [
          { value: 'shurukuang', label: '输入框', parent: 'Form' },
          { value: 'xuanzeqi', label: '选择器', parent: 'Form' },
          { value: 'duoxuan', label: '单选框', parent: 'Form' },
          { value: 'danxuan', label: '多选框', parent: 'Form' },
        ],
      },
    ],
  },
  {
    value: 'ziyuan',
    label: '资源',
    childer: [
      {
        value: 'wendang',
        label: '文档',
        parent: 'ziyuan',
      },
      {
        value: 'sheji',
        label: '设计',
        parent: 'ziyuan',
      },
    ],
  },
];

export const DiyCascader1 = () => {
  const list = [
    {
      value: 'zhinan',
      label: '指南',
      childer: [
        {
          value: 'shejiyuanze',
          label: '设计原则',
          parent: 'zhinan',
          childer: [
            { value: 'yizhi', label: '一致', parent: 'shejiyuanze' },
            {
              value: 'xiaolv',
              label: '效率',
              parent: 'shejiyuanze',
              childer: [{ value: 'xxx', label: 'xxx', parent: 'xiaolv' }],
            },
            { value: 'kekong', label: '可控', parent: 'shejiyuanze' },
          ],
        },
        {
          value: 'daohang',
          label: '导航',
          parent: 'zhinan',
          childer: [
            { value: 'cedaohang', label: '侧导航', parent: 'daohang' },
            { value: 'dingbudaohang', label: '顶部导航', parent: 'daohang' },
          ],
        },
      ],
    },
    {
      value: 'zujian',
      label: '组件',
      childer: [
        {
          value: 'Basic',
          label: 'Basic',
          parent: 'zujian',
          childer: [
            { value: 'buju', label: '布局', parent: 'Basic' },
            { value: 'secai', label: '色彩', parent: 'Basic' },
            { value: 'ziti', label: '字体', parent: 'Basic' },
            { value: 'tubiao', label: '图标', parent: 'Basic' },
            { value: 'anniu', label: '按钮', parent: 'Basic' },
          ],
        },
        {
          value: 'Form',
          label: 'Form',
          parent: 'zujian',
          childer: [
            { value: 'shurukuang', label: '输入框', parent: 'Form' },
            { value: 'xuanzeqi', label: '选择器', parent: 'Form' },
            { value: 'duoxuan', label: '单选框', parent: 'Form' },
            { value: 'danxuan', label: '多选框', parent: 'Form' },
          ],
        },
      ],
    },
    {
      value: 'ziyuan',
      label: '资源',
      childer: [
        {
          value: 'wendang',
          label: '文档',
          parent: 'ziyuan',
        },
        {
          value: 'sheji',
          label: '设计',
          parent: 'ziyuan',
        },
      ],
    },
  ];

  return (
    <div style={{ margin: spacing05 + 4 }}>
      <DiyCascader
        id="DiyCascader1"
        mode="single"
        expandTrigger="click"
        options={list}
      />
    </div>
  );
};

DiyCascader1.storyName = 'Default';

export const DiyCascader2 = () => {
  return (
    <div style={{ margin: spacing05 + 4 }}>
      <DiyCascader
        id="DiyCascader1"
        mode="multiple"
        expandTrigger="click"
        options={dataList}
      />
    </div>
  );
};

DiyCascader2.storyName = 'multiple';
