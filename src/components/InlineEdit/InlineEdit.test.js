/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import userEvent from '@testing-library/user-event';

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

import { InlineEdit } from '.';

const blockClass = `${pkg.prefix}--inline-edit`;
const componentName = InlineEdit.displayName;

// values to use
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const editDescription = 'Edit';
const id = dataTestId;
const labelText = 'Inline edit';
const cancelDescription = 'Revert';
const saveDescription = 'Save';
const value = 'hello; world';
const requiredProps = { editDescription, cancelDescription, saveDescription };

describe(componentName, () => {
  it('renders a component InlineEdit', () => {
    const { container } = render(<InlineEdit {...requiredProps} />);
    expect(container.firstChild).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <InlineEdit
        {...{
          editDescription,
          id,
          labelText,
          cancelDescription,
          saveDescription,
          value,
        }}
      />
    );
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', () => {
    const { container } = render(
      <InlineEdit className={className} {...requiredProps} />
    );
    expect(container.firstChild).toHaveClass(className);
  });

  it('adds additional props to the containing node', () => {
    render(<InlineEdit data-testid={dataTestId} {...requiredProps} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    render(<InlineEdit ref={ref} {...requiredProps} />);
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', () => {
    render(<InlineEdit data-testid={dataTestId} {...requiredProps} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('can start and stop edit with focus', () => {
    const startingValue = value;
    const { container } = render(
      <InlineEdit {...requiredProps} value={startingValue} />
    );

    // do after render
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    const input = screen.getByRole('textbox');
    // clicks in
    userEvent.click(input);
    const component = container.querySelector(`.${blockClass}`);
    expect(component).toHaveClass(`${blockClass}--editing`);

    expect(setTimeout).not.toHaveBeenCalled();

    // tabs out
    userEvent.tab({ shift: true });
    expect(component).not.toHaveClass(`${blockClass}--editing`);

    // tabs in
    userEvent.tab();
    expect(component).toHaveClass(`${blockClass}--editing`);

    // types some text
    userEvent.keyboard('123');
    expect(input).toHaveTextContent(`${startingValue}123`);

    // testing {ctrl}z does not seem to work
    // userEvent.type(input, '{ctrl}z');
    // expect(input).toHaveTextContent(startingValue);
    jest.spyOn(global, 'setTimeout').mockRestore();
  });

  it('can start and stop edit with enter', () => {
    const startingValue = value;
    const { container } = render(
      <InlineEdit {...requiredProps} value={startingValue} />
    );

    const input = screen.getByRole('textbox');
    // clicks in
    userEvent.click(input);
    const component = container.querySelector(`.${blockClass}`);
    expect(component).toHaveClass(`${blockClass}--editing`);

    // tabs in
    userEvent.type(input, 'ABC');
    expect(input).toHaveTextContent(`${startingValue}ABC`);

    userEvent.type(input, '{enter}');

    expect(component).not.toHaveClass(`${blockClass}--editing`);
  });

  it('can start and cancel an edit using buttons', () => {
    const startingValue = value;
    const { container } = render(
      <InlineEdit {...requiredProps} value={startingValue} />
    );
    const component = container.querySelector(`.${blockClass}`);

    // do after render
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    const input = screen.getByRole('textbox');

    // starts edit
    const edit = container.querySelector(`.${blockClass}__edit`);
    userEvent.click(edit);
    expect(component).toHaveClass(`${blockClass}--editing`);

    expect(setTimeout).toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(input.scrollLeft).toEqual(9999); // scroll moved to end

    // has edit buttons
    const controls = screen.getAllByRole('button');
    expect(controls).toHaveLength(2); // cancel and save

    // click cancel check result reverts
    userEvent.click(controls[0]);
    expect(input).toHaveTextContent(startingValue);
    expect(component).not.toHaveClass(`${blockClass}--editing`);
    expect(input.scrollLeft).toEqual(0); // scroll moved to start

    jest.spyOn(global, 'setTimeout').mockRestore();
  });

  it('can start edit clicking left on the component (left of input)', () => {
    const startingValue = value;
    const { container } = render(
      <InlineEdit {...requiredProps} value={startingValue} />
    );
    const input = screen.getByRole('textbox');
    const component = container.querySelector(`.${blockClass}`);

    // do after render
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    // starts edit
    userEvent.click(component);
    expect(component).toHaveClass(`${blockClass}--editing`);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(input.scrollLeft).toEqual(0); // scroll moved to end

    jest.spyOn(global, 'setTimeout').mockRestore();
  });

  it('can start and save edit with buttons', () => {
    const startingValue = value;
    const { fn } = jest;
    const handleChange = fn();
    const handleSave = fn();
    const handleCancel = fn();

    const { container } = render(
      <InlineEdit
        {...requiredProps}
        value={startingValue}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
    const component = container.querySelector(`.${blockClass}`);

    const input = screen.getByRole('textbox');

    // starts edit
    const edit = container.querySelector(`.${blockClass}__edit`);
    userEvent.click(edit);
    expect(component).toHaveClass(`${blockClass}--editing`);

    // types some text
    userEvent.type(input, 'ABC');
    expect(input).toHaveTextContent(`${startingValue}ABC`);

    // has edit buttons
    const controls = screen.getAllByRole('button');
    expect(controls).toHaveLength(2); // cancel and save

    userEvent.click(controls[1]);
    expect(component).not.toHaveClass(`${blockClass}--editing`);
    expect(input).toHaveTextContent(`${startingValue}ABC`);

    expect(handleChange).toBeCalledTimes(3); // 3 for ABC and once for cancel
    expect(handleSave).toBeCalledTimes(1);
  });

  it('can start and cancel edit with buttons', () => {
    const startingValue = value;
    const { fn } = jest;
    const handleChange = fn();
    const handleSave = fn();
    const handleCancel = fn();

    const { container } = render(
      <InlineEdit
        {...requiredProps}
        value={startingValue}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
    const component = container.querySelector(`.${blockClass}`);

    const input = screen.getByRole('textbox');

    // starts edit
    const edit = container.querySelector(`.${blockClass}__edit`);
    userEvent.click(edit);
    expect(component).toHaveClass(`${blockClass}--editing`);

    // types some text
    userEvent.type(input, 'ABC');
    expect(input).toHaveTextContent(`${startingValue}ABC`);

    // has edit buttons
    const controls = screen.getAllByRole('button');
    expect(controls).toHaveLength(2); // cancel and save

    // click save and check event

    // click cancel check result reverts
    userEvent.click(controls[0]);
    expect(component).not.toHaveClass(`${blockClass}--editing`);
    // JSDom does not implement innerText, so cannot check toHaveTextContent
    expect(input.innerText).toEqual(startingValue);

    expect(handleChange).toBeCalledTimes(4); // 3 for ABC and once for cancel
    expect(handleSave).not.toBeCalled();
    expect(handleCancel).toBeCalledTimes(1);
  });

  it('does not allow disabled edit', () => {
    const startingValue = value;

    const { container } = render(
      <InlineEdit {...requiredProps} value={startingValue} disabled={true} />
    );
    const component = container.querySelector(`.${blockClass}`);

    // starts edit
    const edit = container.querySelector(`.${blockClass}__edit`);
    userEvent.click(edit);
    expect(component).not.toHaveClass(`${blockClass}--editing`);
  });

  it('Clicking control but not on edit or input starts edit', () => {
    const startingValue = value;

    const { container } = render(
      <InlineEdit {...requiredProps} value={startingValue} />
    );
    const component = container.querySelector(`.${blockClass}`);

    // starts edit clicking on background (left of input) as if clicking left edge of input
    userEvent.click(component);
    expect(component).toHaveClass(`${blockClass}--editing`);

    // tab out cancelling edit

    userEvent.click(screen.getAllByRole('button')[0]);
    expect(component).not.toHaveClass(`${blockClass}--editing`);

    // starts edit clicking in toolbar area but not on edit as if clicking right edge of input
    const afterInput = container.querySelector(
      `.${blockClass}__after-input-elements`
    );
    userEvent.click(afterInput);
    expect(component).toHaveClass(`${blockClass}--editing`);
  });

  it.skip('Handles clipboard data', () => {
    const startingValue = value;
    const clipboardString = 'AString';

    render(<InlineEdit {...requiredProps} value={startingValue} />);

    const input = screen.getByRole('textbox');
    userEvent.click(input);
    userEvent.paste(input, clipboardString);

    // paste event not supported with div as yet
    // https://github.com/testing-library/user-event/pull/785
    expect(input).toHaveTextContent(startingValue + clipboardString + 'b');
  });

  it('Can show invalid state', () => {
    const invalidText = 'That is not valid';

    const { container } = render(
      <InlineEdit {...requiredProps} invalid={true} invalidText={invalidText} />
    );
    const component = container.querySelector(`.${blockClass}`);

    screen.getByText(invalidText);
    const svg = component.querySelector(`.${blockClass}__validation-icon svg`);
    expect(svg).not.toBeNull();
  });

  it('can start and stop edit with escape', () => {
    const startingValue = value;
    const { container } = render(
      <InlineEdit {...requiredProps} value={startingValue} />
    );

    const input = screen.getByRole('textbox');
    // clicks in
    userEvent.click(input);
    const component = container.querySelector(`.${blockClass}`);
    expect(component).toHaveClass(`${blockClass}--editing`);

    // Escape cancels edit
    userEvent.keyboard('{Escape}');
    expect(component).not.toHaveClass(`${blockClass}--editing`);
  });
});
