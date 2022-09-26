import React from 'react';
import { RangeDatePicker } from './RangeDatePicker';
import { spacing05 } from '@carbon/layout';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/DiyDatePicke',
  component: RangeDatePicker,
};

export const DiyDatePicke1 = () => {
  return (
    <div style={{ margin: spacing05 + 4 }}>
      <RangeDatePicker id="DiyDatePicke1" />
    </div>
  );
};

DiyDatePicke1.storyName = 'Default';
