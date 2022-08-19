/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { boolean, text, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { spacing06 } from '@carbon/layout';
import styles from './_date-time-picker.scss'
// import { getCardMinSize } from '../../utils/componentUtilityFunctions';
// import {
//   INTERVAL_VALUES,
//   RELATIVE_VALUES,
//   PICKER_KINDS,
//   PRESET_VALUES,
// } from '../../constants/DateConstants';

import DateTimePicker, {
  INTERVAL_VALUES,
  RELATIVE_VALUES,
  PICKER_KINDS,
  PRESET_VALUES,
} from './DateTimePicker';

export const CARD_SIZES = {
  SMALL: 'SMALL',
  SMALLWIDE: 'SMALLWIDE',
  SMALLFULL: 'SMALLFULL',
  SMALLTHICK: 'SMALLTHICK',
  MEDIUMTHIN: 'MEDIUMTHIN',
  MEDIUM: 'MEDIUM',
  MEDIUMTHICK: 'MEDIUMTHICK',
  MEDIUMWIDE: 'MEDIUMWIDE',
  LARGETHIN: 'LARGETHIN',
  LARGE: 'LARGE',
  LARGETHICK: 'LARGETHICK',
  LARGEWIDE: 'LARGEWIDE',
};

const DASHBOARD_BREAKPOINTS = {
  max: 1584,
  xl: 1312,
  lg: 1056,
  md: 672,
  sm: 480,
  xs: 320,
};

const CARD_DIMENSIONS = {
  XSMALL: {
    // TODO: remove once we've removed these deprecated sizes
    max: { w: 2, h: 1 },
    xl: { w: 2, h: 1 },
    lg: { w: 4, h: 1 },
    md: { w: 4, h: 1 },
    sm: { w: 2, h: 1 },
    xs: { w: 4, h: 1 },
  },
  XSMALLWIDE: {
    // TODO: remove once we've removed these deprecated sizes
    max: { w: 4, h: 1 },
    xl: { w: 4, h: 1 },
    lg: { w: 4, h: 1 },
    md: { w: 4, h: 1 },
    sm: { w: 4, h: 2 },
    xs: { w: 4, h: 1 },
  },
  TALL: {
    // TODO: remove once we've removed these deprecated sizes
    max: { w: 4, h: 4 },
    xl: { w: 4, h: 4 },
    lg: { w: 4, h: 4 },
    md: { w: 4, h: 4 },
    sm: { w: 4, h: 4 },
    xs: { w: 4, h: 4 },
  },
  WIDE: {
    // TODO: remove once we've removed these deprecated sizes
    max: { w: 8, h: 2 },
    xl: { w: 8, h: 2 },
    lg: { w: 8, h: 2 },
    md: { w: 8, h: 2 },
    sm: { w: 4, h: 2 },
    xs: { w: 4, h: 2 },
  },
  XLARGE: {
    // TODO: remove once we've removed these deprecated sizes
    max: { w: 16, h: 4 },
    xl: { w: 16, h: 4 },
    lg: { w: 16, h: 4 },
    md: { w: 8, h: 4 },
    sm: { w: 4, h: 4 },
    xs: { w: 4, h: 4 },
  },
  SMALL: {
    max: { w: 4, h: 1 },
    xl: { w: 4, h: 1 },
    lg: { w: 4, h: 1 },
    md: { w: 2, h: 1 },
    sm: { w: 2, h: 1 },
    xs: { w: 4, h: 1 },
  },
  SMALLWIDE: {
    max: { w: 8, h: 1 },
    xl: { w: 8, h: 1 },
    lg: { w: 8, h: 1 },
    md: { w: 4, h: 1 },
    sm: { w: 4, h: 1 },
    xs: { w: 4, h: 1 },
  },
  SMALLFULL: {
    max: { w: 16, h: 1 },
    xl: { w: 16, h: 1 },
    lg: { w: 16, h: 1 },
    md: { w: 8, h: 1 },
    sm: { w: 8, h: 1 },
    xs: { w: 4, h: 1 },
  },
  MEDIUMTHIN: {
    max: { w: 4, h: 2 },
    xl: { w: 4, h: 2 },
    lg: { w: 4, h: 2 },
    md: { w: 4, h: 2 },
    sm: { w: 2, h: 2 },
    xs: { w: 4, h: 2 },
  },
  MEDIUM: {
    max: { w: 8, h: 2 },
    xl: { w: 8, h: 2 },
    lg: { w: 8, h: 2 },
    md: { w: 8, h: 2 },
    sm: { w: 4, h: 2 },
    xs: { w: 4, h: 2 },
  },
  MEDIUMWIDE: {
    max: { w: 16, h: 2 },
    xl: { w: 16, h: 2 },
    lg: { w: 16, h: 2 },
    md: { w: 8, h: 2 },
    sm: { w: 4, h: 2 },
    xs: { w: 4, h: 2 },
  },
  LARGETHIN: {
    max: { w: 4, h: 4 },
    xl: { w: 4, h: 4 },
    lg: { w: 4, h: 4 },
    md: { w: 4, h: 4 },
    sm: { w: 4, h: 4 },
    xs: { w: 4, h: 4 },
  },
  LARGE: {
    max: { w: 8, h: 4 },
    xl: { w: 8, h: 4 },
    lg: { w: 8, h: 4 },
    md: { w: 8, h: 4 },
    sm: { w: 4, h: 4 },
    xs: { w: 4, h: 4 },
  },
  LARGEWIDE: {
    max: { w: 16, h: 4 },
    xl: { w: 16, h: 4 },
    lg: { w: 16, h: 4 },
    md: { w: 8, h: 4 },
    sm: { w: 4, h: 4 },
    xs: { w: 4, h: 4 },
  },
  SMALLTHICK: {
    max: { w: 12, h: 1 },
    xl: { w: 12, h: 1 },
    lg: { w: 12, h: 1 },
    md: { w: 8, h: 1 },
    sm: { w: 8, h: 1 },
    xs: { w: 4, h: 1 },
  },
  MEDIUMTHICK: {
    max: { w: 12, h: 2 },
    xl: { w: 12, h: 2 },
    lg: { w: 12, h: 2 },
    md: { w: 8, h: 2 },
    sm: { w: 8, h: 2 },
    xs: { w: 4, h: 2 },
  },
  LARGETHICK: {
    max: { w: 12, h: 4 },
    xl: { w: 12, h: 4 },
    lg: { w: 12, h: 4 },
    md: { w: 8, h: 4 },
    sm: { w: 8, h: 4 },
    xs: { w: 4, h: 4 },
  },
};

const ROW_HEIGHT = {
  max: 144,
  xl: 144,
  lg: 144,
  md: 144,
  sm: 144,
  xs: 144,
};

const DASHBOARD_COLUMNS = {
  max: 16,
  xl: 16,
  lg: 16,
  md: 8,
  sm: 8,
  xs: 4,
};

const GUTTER = 16;
/**
 * Returns { x: width in pixels, y: height in pixels }
 * This is used to set min-width and min-height of the card based on the current breakpoint
 */
const getCardMinSize = (
  breakpoint,
  size,
  dashboardBreakpoints = DASHBOARD_BREAKPOINTS,
  cardDimensions = CARD_DIMENSIONS,
  rowHeight = ROW_HEIGHT,
  dashboardColumns = DASHBOARD_COLUMNS
) => {
  const totalCol = dashboardColumns[breakpoint];
  const columnWidth = (dashboardBreakpoints[breakpoint] - (totalCol - 1) * GUTTER) / totalCol;
  const cardColumns = cardDimensions[size][breakpoint].w;
  const cardRows = cardDimensions[size][breakpoint].h;
  
  const cardSize = {
    x: cardColumns * columnWidth + (cardColumns - 1) * GUTTER,
    y: cardRows * rowHeight[breakpoint] + (cardRows - 1) * GUTTER,
  };
  return cardSize;
};

export const defaultRelativeValue = {
  timeRangeKind: PICKER_KINDS.RELATIVE,
  timeRangeValue: {
    lastNumber: 20,
    lastInterval: INTERVAL_VALUES.MINUTES,
    relativeToWhen: RELATIVE_VALUES.TODAY,
    relativeToTime: '13:30',
  },
};

export const defaultAbsoluteValue = {
  timeRangeKind: PICKER_KINDS.ABSOLUTE,
  timeRangeValue: {
    startDate: '2020-04-01',
    startTime: '12:34',
    endDate: '2020-04-06',
    endTime: '10:49',
  },
};

export default {
  title: 'Components/DateTime Picker',
  component: DateTimePicker,
  parameters: {
    styles,
    docs: {
      inlineStories: false,
    },
  },
};

export const Default = () => {
  const size = select('size', Object.keys(CARD_SIZES), CARD_SIZES.MEDIUMWIDE);
  return (
    <div
      style={{
        width: `${getCardMinSize('lg', size).x}px`,
        margin: spacing06,
      }}
    >
      <DateTimePicker
        id="datetimepicker"
        dateTimeMask={text('dateTimeMask', 'YYYY-MM-DD HH:mm')}
        relatives={[
          {
            label: 'Yesterday',
            value: RELATIVE_VALUES.YESTERDAY,
          },
        ]}
        hasTimeInput={boolean('hasTimeInput', true)}
        style={{ zIndex: number('zIndex', 100) }}
      />
    </div>
  );
};

export const SelectedPreset = () => {
  const size = select('size', Object.keys(CARD_SIZES), CARD_SIZES.MEDIUMWIDE);
  return (
    <div
      style={{
        width: `${getCardMinSize('lg', size).x}px`,
        margin: spacing06,
      }}
    >
      <DateTimePicker
        id="datetimepicker"
        defaultValue={{
          timeRangeKind: PICKER_KINDS.PRESET,
          timeRangeValue: PRESET_VALUES[3],
        }}
        hasTimeInput={boolean('hasTimeInput', true)}
        onApply={action('onApply')}
        onCancel={action('onCancel')}
      />
    </div>
  );
};

SelectedPreset.storyName = 'Selected preset';

export const SelectedRelative = () => {
  const size = select('size', Object.keys(CARD_SIZES), CARD_SIZES.MEDIUMWIDE);
  return (
    <div
      style={{
        width: `${getCardMinSize('lg', size).x}px`,
        margin: spacing06,
      }}
    >
      <DateTimePicker
        id="datetimepicker"
        defaultValue={defaultRelativeValue}
        hasTimeInput={boolean('hasTimeInput', true)}
        onApply={action('onApply')}
        onCancel={action('onCancel')}
      />
    </div>
  );
};

SelectedRelative.storyName = 'Selected relative';

export const SelectedAbsolute = () => {
  const size = select('size', Object.keys(CARD_SIZES), CARD_SIZES.MEDIUMWIDE);
  return (
    <div
      style={{
        width: `${getCardMinSize('lg', size).x}px`,
        margin: spacing06,
      }}
    >
      <DateTimePicker
        id="datetimepicker"
        defaultValue={defaultAbsoluteValue}
        hasTimeInput={boolean('hasTimeInput', true)}
        onApply={action('onApply')}
        onCancel={action('onCancel')}
      />
    </div>
  );
};

SelectedAbsolute.storyName = 'Selected absolute';

export const WithoutARelativeOption = () => {
  const size = select('size', Object.keys(CARD_SIZES), CARD_SIZES.MEDIUMWIDE);
  return (
    <div
      style={{
        width: `${getCardMinSize('lg', size).x}px`,
        margin: spacing06,
      }}
    >
      <DateTimePicker
        id="datetimepicker"
        defaultValue={{
          timeRangeKind: PICKER_KINDS.PRESET,
          timeRangeValue: PRESET_VALUES[3],
        }}
        hasTimeInput={boolean('hasTimeInput', true)}
        showRelativeOption={false}
        onApply={action('onApply')}
        onCancel={action('onCancel')}
      />
    </div>
  );
};

WithoutARelativeOption.storyName = 'Without a relative option';

export const WithoutACustomRangeLink = () => {
  const size = select('size', Object.keys(CARD_SIZES), CARD_SIZES.MEDIUMWIDE);
  return (
    <div
      style={{
        width: `${getCardMinSize('lg', size).x}px`,
        margin: spacing06,
      }}
    >
      <DateTimePicker
        id="datetimepicker"
        defaultValue={{
          timeRangeKind: PICKER_KINDS.PRESET,
          timeRangeValue: PRESET_VALUES[3],
        }}
        hasTimeInput={boolean('hasTimeInput', true)}
        showCustomRangeLink={false}
        onApply={action('onApply')}
        onCancel={action('onCancel')}
      />
    </div>
  );
};

WithoutACustomRangeLink.storyName = 'Without a custom range link';

export const LightVersion = () => {
  const size = select('size', Object.keys(CARD_SIZES), CARD_SIZES.MEDIUMWIDE);
  return (
    <div
      style={{
        width: `${getCardMinSize('lg', size).x}px`,
        margin: spacing06,
      }}
    >
      <DateTimePicker
        id="datetimepicker"
        dateTimeMask={text('dateTimeMask', 'YYYY-MM-DD HH:mm')}
        relatives={[
          {
            label: 'Yesterday',
            value: RELATIVE_VALUES.YESTERDAY,
          },
        ]}
        light
        hasTimeInput={boolean('hasTimeInput', true)}
      />
    </div>
  );
};

LightVersion.storyName = 'Light version';

export const Locale = () => {
  const size = select('size', Object.keys(CARD_SIZES), CARD_SIZES.MEDIUMWIDE);
  return (
    <div
      style={{
        width: `${getCardMinSize('lg', size).x}px`,
        margin: spacing06,
      }}
    >
      <DateTimePicker
        id="datetimepicker25"
        dateTimeMask={text('dateTimeMask', 'L HH:mm')}
        locale={select('locale', ['en', 'fr', 'ja'], 'fr')}
        defaultValue={defaultAbsoluteValue}
        hasTimeInput={boolean('hasTimeInput', true)}
      />
    </div>
  );
};
