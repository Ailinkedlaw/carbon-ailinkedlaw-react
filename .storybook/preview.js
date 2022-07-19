import { withCarbonTheme } from '@carbon/storybook-addon-theme/react';
import { ArgsTable, Canvas, Story, Source } from '@storybook/addon-docs';
import LinkTo from '@storybook/addon-links/react';
import { themes } from '@storybook/theming';

import { Column, Row } from '@carbon/react';
import React, { useEffect } from 'react';

import { pkg } from '../src/settings';

import index from './index.scss';

pkg._silenceWarnings(true);
pkg.setAllComponents(true);

const Style = ({ children, styles }) => {
  // console.log("styles", styles)
  // const { unuse, use } = styles;
  //
  // useEffect(() => {
  //   use();
  //
  //   return () => unuse();
  // }, []);

  return children;
};

const decorators = [
  (storyFn, { parameters: { styles } }) => {
    const story = storyFn();
    
    return (
      <div className="preview-position-fix">
        <Style styles={index}>
          {styles ? <Style styles={styles}>{story}</Style> : story}
        </Style>
      </div>
    );
  },
  withCarbonTheme,
];

const makeViewport = (name, width, shadow) => ({
  name,
  styles: {
    border: '1px solid #1EA7FD',
    boxShadow: `0 0 50px 20px rgb(30 167 253 / ${shadow}%)`,
    width,
    // when width is fixed, leave room for a horizontal scroll bar
    height: width === '100%' ? '100%' : 'calc(100% - 12px)',
  },
});
const carbonViewports = {
  basic: makeViewport('Select a Carbon breakpoint', '100%', 0),
  smMin: makeViewport('sm (≥320px)', '320px', 25),
  smMid: makeViewport('sm — mid range', '496px', 25),
  smMax: makeViewport('sm — top of range', '671px', 25),
  mdMin: makeViewport('md (≥672px)', '672px', 20),
  mdMid: makeViewport('md — mid range', '864px', 20),
  mdMax: makeViewport('md — top of range', '1055px', 20),
  lgMin: makeViewport('lg (≥1056px)', '1056px', 15),
  lgMid: makeViewport('lg — mid range', '1184px', 15),
  lgMax: makeViewport('lg — top of range', '1311px', 15),
  xlgMin: makeViewport('xlg (≥1312px)', '1312px', 10),
  xlgMid: makeViewport('xlg — mid range', '1448px', 10),
  xlgMax: makeViewport('xlg — top of range', '1583px', 10),
  maxMin: makeViewport('max (≥1584px)', '1584px', 5),
  maxMid: makeViewport('max — mid range', '2000px', 5),
};


const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    components: {
      ArgsTable,
      Canvas,
      Column,
      LinkTo: (props) => (
        <LinkTo
          className="storybook__link-to"
          style={{ color: themes.normal.colorSecondary }}
          {...props}
        />
      ),
      Row,
      Source,
      Story,
    },
  },
  // Optional default Carbon theme.
  carbonTheme: {
    theme: 'g10',
  },
  
  // viewport sizes based on Carbon breakpoints
  viewport: {
    viewports: carbonViewports,
    defaultViewport: 'basic',
  },
}

export { decorators, parameters, Style };
