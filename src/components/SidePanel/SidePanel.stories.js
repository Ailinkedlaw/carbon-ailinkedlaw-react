/* eslint-disable camelcase */
/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './_storybook-styles.scss';
import React, { useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';
import {
  Button,
  Grid,
  Column,
  TextArea,
  TextInput,
  DataTable,
  Table,
  TableHeader,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Header,
  HeaderContainer,
  HeaderName, ButtonSet
} from '@carbon/react'
import { Copy, TrashCan, Settings, Save } from '@carbon/icons-react'
import {
  getStoryTitle,
  prepareStory,
} from '@/global/js/utils/story-helper';
import { SidePanel } from './SidePanel';
import mdx from './SidePanel.mdx';

export default {
  title: 'Components/SidePanel',
  component: SidePanel,
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    actions: {
      control: {
        type: 'select',
        labels: {
          0: 'One button',
          1: 'One button (ghost)',
          2: 'One button (danger)',
          3: 'Two buttons',
          4: 'Two buttons with ghost',
          5: 'Two buttons with danger',
          6: 'Three buttons with ghost',
          7: 'Three buttons with danger',
          8: 'Three buttons',
          9: 'None',
        },
        default: 0,
      },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    slideIn: {
      table: {
        disable: true,
      },
    },
  },
};

const prefix = 'side-panel-stories__';

const defaultStoryProps = {
  title:
    'Incident management for your application, testing a very long title to see how this behaves with a longer title',
  subtitle: (
    <>
      This is some text that would talk about how you could{' '}
      <strong>investigate</strong> incident management within this side panel.
    </>
  ),
};

const headerData = [
  { id: 1, header: 'Column header', key: 'value' },
  { id: 2, header: 'Column header', key: 'value' },
];

const rowData = [
  {
    id: 'a',
    value: 'Cell text',
  },
  {
    id: 'b',
    value: 'Cell text',
  },
  {
    id: 'c',
    value: 'Cell text',
  },
  {
    id: 'd',
    value: 'Cell text',
  },
  {
    id: 'e',
    value: 'Cell text',
  },
  {
    id: 'f',
    value: 'Cell text',
  },
  {
    id: 'g',
    value: 'Cell text',
  },
  {
    id: 'h',
    value: 'Cell text',
  },
];

const actions_1 = [
  {
    label: 'Primary button',
    onClick: action('Clicked action button'),
    kind: 'primary',
  },
];

const actions_2 = [
  {
    label: 'Ghost button',
    onClick: action('Clicked action button'),
    kind: 'ghost',
  },
];

const actions_3 = [
  {
    label: 'Danger button',
    onClick: action('Clicked action button'),
    kind: 'danger',
  },
];

const actions_4 = [
  {
    label: 'Primary button',
    onClick: action('Clicked action button'),
    kind: 'primary',
  },
  {
    label: 'Secondary button',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
];

const actions_5 = [
  {
    label: 'Ghost button',
    onClick: action('Clicked action button'),
    kind: 'ghost',
  },
  {
    label: 'Primary button',
    onClick: action('Clicked action button'),
    kind: 'primary',
  },
];

const actions_6 = [
  {
    label: 'Ghost button',
    onClick: action('Clicked action button'),
    kind: 'ghost',
  },
  {
    label: 'Danger button',
    onClick: action('Clicked action button'),
    kind: 'danger',
  },
];

const actions_7 = [
  {
    label: 'Primary button',
    onClick: action('Clicked action button'),
    kind: 'primary',
  },
  {
    label: 'Secondary button',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
  {
    label: 'Ghost button',
    onClick: action('Clicked action button'),
    kind: 'ghost',
  },
];

const actions_8 = [
  {
    label: 'Secondary button',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
  {
    label: 'Secondary button',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
  {
    label: 'Danger button',
    onClick: action('Clicked action button'),
    kind: 'danger',
  },
];

const actions_9 = [
  {
    label: 'Primary button',
    onClick: action('Clicked action button'),
    kind: 'primary',
  },
  {
    label: 'Secondary button',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
  {
    label: 'Secondary button',
    onClick: action('Clicked action button'),
    kind: 'secondary',
  },
];

const actionSets = [
  actions_1,
  actions_2,
  actions_3,
  actions_4,
  actions_5,
  actions_6,
  actions_7,
  actions_8,
  actions_9,
  [],
];

// eslint-disable-next-line react/prop-types
const ChildrenContent = () => {
  const [notesValue, setNotesValue] = useState('');
  return (
    <div className={`${prefix}body-content`}>
      <h5>Section</h5>
      <div className={`${prefix}text-inputs`}>
        <TextInput
          labelText="Input A"
          id="side-panel-story-text-input-a"
          className={`${prefix}text-input`}
        />
        <TextInput
          labelText="Input B"
          id="side-panel-story-text-input-b"
          className={`${prefix}text-input`}
        />
      </div>
      <div className={`${prefix}text-inputs`}>
        <TextInput
          labelText="Input C"
          id="side-panel-story-text-input-c"
          className={`${prefix}text-input`}
        />
        <TextInput
          labelText="Input D"
          id="side-panel-story-text-input-d"
          className={`${prefix}text-input`}
        />
      </div>
      <div className={`${prefix}text-area-container`}>
        <span
          className={[
            `${prefix}allowed-characters`,
            `${
              notesValue.length > 100
                ? `${prefix}allowed-characters-invalid`
                : null
            }`,
          ].join(' ')}
        >
          {notesValue.length}/100
        </span>
        <TextArea
          className={`${prefix}text-area`}
          labelText="Notes"
          value={notesValue}
          onChange={(event) => setNotesValue(event.target.value)}
        />
      </div>
      <h5 className={`${prefix}content-subtitle`}>Section</h5>
      {renderDataTable()}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ChildrenContentWithSteps = ({ currentStep, setCurrentStep }) => {
  return (
    <>
      {currentStep === 0 && (
        <div className={`${prefix}body-content`}>
          <h5 className={`${prefix}content-subtitle`}>Main view</h5>
          {renderDataTable()}
          <Button
            kind="tertiary"
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            View all
          </Button>
        </div>
      )}
      {currentStep === 1 && (
        <div className={`${prefix}body-content`}>
          <h5 className={`${prefix}content-subtitle`}>Detail view</h5>
          {renderDataTable()}
        </div>
      )}
    </>
  );
};

const renderDataTable = () => {
  return (
    <DataTable
      rows={rowData}
      headers={headerData}
      render={({ rows, headers }) => (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={header.id}>{header.header}</TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
};

const renderUIShellHeader = () => (
  <>
    <HeaderContainer
      render={() => (
        <Header aria-label="IBM Cloud Pak">
          <HeaderName href="/" prefix="IBM">
            Cloud Pak
          </HeaderName>
        </Header>
      )}
    />
    <div style={{ height: '48px' }}></div>
  </>
);

// eslint-disable-next-line react/prop-types
const SlideOverTemplate = ({ minimalContent, actions, ...args }) => {
  const [open, setOpen] = useState(false);
  const testRef = useRef();
  return (
    <>
      {renderUIShellHeader()}
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close side panel' : 'Open side panel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        actions={actionSets[actions]}
        ref={testRef}
      >
        {!minimalContent && <ChildrenContent />}
      </SidePanel>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const StepTemplate = ({ actions, ...args }) => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <>
      {renderUIShellHeader()}
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close side panel' : 'Open side panel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        currentStep={currentStep}
        onNavigationBack={() => setCurrentStep((prev) => prev - 1)}
        actions={actionSets[actions]}
      >
        <ChildrenContentWithSteps
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </SidePanel>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const SlideInTemplate = ({ actions, ...args }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {renderUIShellHeader()}
      <Grid id="ibm-products-page-content">
        <Column lg={16} md={8} sm={4}>
          <Button onClick={() => setOpen(!open)}>
            {open ? 'Close side panel' : 'Open side panel'}
          </Button>
        </Column>
      </Grid>
      <SidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        actions={actionSets[actions]}
      >
        <ChildrenContent />
      </SidePanel>
    </>
  );
};

export const SlideOver = prepareStory(SlideOverTemplate, {
  args: {
    includeOverlay: true,
    actions: 0,
    renderBottomAction: <>
      <ButtonSet style={{ justifyContent: 'flex-end' }}>
        <Button size="md" kind="secondary">取消</Button>
        <Button size="md" kind="primary" renderIcon={Save}>保存</Button>
      </ButtonSet>
    </>,
    ...defaultStoryProps,
  },
});

export const SlideIn = prepareStory(SlideInTemplate, {
  args: {
    placement: 'right',
    slideIn: true,
    selectorPageContent: '#ibm-products-page-content',
    actions: 0,
    ...defaultStoryProps,
    labelText: 'Incident management',
  },
});

export const WithActionToolbar = prepareStory(SlideOverTemplate, {
  args: {
    actionToolbarButtons: [
      {
        leading: true,
        label: 'Copy',
        icon: (props) => <Copy size={16} {...props} />,
        onClick: action('Toolbar button clicked: Copy'),
        kind: 'primary',
      },
      {
        label: 'Settings',
        icon: (props) => <Settings size={16} {...props} />,
        onClick: action('Toolbar button clicked: Settings'),
      },
      {
        label: 'Delete',
        icon: (props) => <TrashCan size={16} {...props} />,
        onClick: action('Toolbar button clicked: Delete'),
      },
    ],
    ...defaultStoryProps,
  },
});

export const PanelWithSecondStep = prepareStory(StepTemplate, {
  args: {
    actions: 0,
    includeOverlay: true,
    currentStep: 1,
    ...defaultStoryProps,
  },
});

export const SpecifyElementToHaveInitialFocus = prepareStory(
  SlideOverTemplate,
  {
    args: {
      actions: 0,
      selectorPrimaryFocus: '#side-panel-story-text-input-a',
      ...defaultStoryProps,
    },
  }
);

export const WithStaticTitle = prepareStory(SlideOverTemplate, {
  args: {
    ...defaultStoryProps,
    actions: 0,
    animateTitle: false,
    includeOverlay: true,
  },
});

export const WithStaticTitleAndActionToolbar = prepareStory(SlideOverTemplate, {
  args: {
    ...defaultStoryProps,
    actions: 0,
    animateTitle: false,
    includeOverlay: true,
    actionToolbarButtons: [
      {
        label: 'Copy',
        icon: (props) => <Copy size={16} {...props} />,
        onClick: action('Action toolbar button clicked: Copy'),
      },
      {
        label: 'Settings',
        icon: (props) => <Settings size={16} {...props} />,
        onClick: action('Action toolbar button clicked: Settings'),
      },
      {
        label: 'Delete',
        icon: (props) => <TrashCan size={16} {...props} />,
        onClick: action('Action toolbar button clicked: Delete'),
      },
    ],
  },
});

export const WithoutTitle = prepareStory(SlideOverTemplate, {
  args: {
    ...defaultStoryProps,
    actions: 0,
    title: null,
    includeOverlay: true,
  },
});
