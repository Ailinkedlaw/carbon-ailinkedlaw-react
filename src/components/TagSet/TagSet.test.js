//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pkg } from '../../settings';
import { TagSet } from '.';
import { TagSetModal } from './TagSetModal';

import { TYPES as tagTypes } from './constants';

import {
  expectMultipleError,
  mockHTMLElement,
  required,
} from '../../global/js/utils/test-helper';
import uuidv4 from '../../global/js/utils/uuidv4';

const { prefix } = pkg;

const carbonPrefix = 'cds';
const blockClass = `${pkg.prefix}--tag-set`;
const blockClassOverflow = `${prefix}--tag-set-overflow`;

const tagLabel = (index) => `Tag ${index + 1}`;
const tags = Array.from({ length: 20 }, (v, k) => ({
  type: tagTypes[k % tagTypes.length],
  ['data-search']: `${k === 11 ? 'dozen 1100' : Number(k + 1).toString(2)}`, // adds binary value for data-search test
  label: tagLabel(k),
  id: `id-${k}`,
}));
const tags10 = tags.slice(0, 10);
const tagWidth = 100;

const overflowAndModalStrings = {
  allTagsModalTitle: 'All tags',
  allTagsModalSearchLabel: 'Search all tags',
  allTagsModalSearchPlaceholderText: 'Search all tags',
  showAllTagsLabel: 'View all tags',
};

describe(TagSet.displayName, () => {
  const { ResizeObserver } = window;
  let mockElement;

  beforeEach(() => {
    mockElement = mockHTMLElement({
      offsetWidth: {
        get: function () {
          let width = 0;

          if (
            this.classList.contains(`${blockClass}__sizing-tag`) ||
            this.classList.contains(`${blockClassOverflow}`)
          ) {
            width = tagWidth; // all tags 100 in size
          } else {
            width = window.innerWidth;
          }

          return width;
        },
      },
    });
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    mockElement.mockRestore();
    jest.restoreAllMocks();
    window.ResizeObserver = ResizeObserver;
  });

  it('Has the same tag types as Carbon Tag', () => {
    // Same number of tags
    expect(TagSet.types.length).toEqual(tagTypes.length);

    // Same value for each tag
    for (let i = 0; i < tagTypes.length; i++) {
      expect(TagSet.types).toContain(tagTypes[i]);
    }
  });

  it('Renders all as visible tags when space available', () => {
    window.innerWidth = tagWidth * 10 + 1;

    render(<TagSet tags={tags10} />);

    // first and last should be visible
    screen.getByText(tagLabel(0), {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbonPrefix}--tag span`,
    });
    screen.getByText(tagLabel(tags10.length - 1), {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbonPrefix}--tag span`,
    });
  });

  it('Renders only the overflow when very little space', () => {
    window.innerWidth = tagWidth / 2;

    render(<TagSet tags={tags10} />);

    const visible = screen.queryAllByText(/Tag [0-9]+/, {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbonPrefix}--tag span`,
    });
    expect(visible.length).toEqual(0);

    const overflow = screen.getByText('+10');
    userEvent.click(overflow);

    const overflowVisible = screen.queryAllByText(/Tag [0-9]+/, {
      // selector need to ignore sizing items
      selector: `.${blockClassOverflow}__content *`,
    });
    expect(overflowVisible.length).toEqual(tags10.length);
  });

  it('Renders some as visible when space limited', () => {
    const visibleTags = 5;
    window.innerWidth = tagWidth * (visibleTags + 1) + 1; // + 1 for overflow

    render(<TagSet tags={tags10} />);

    // first and last should be visible
    screen.getByText(tagLabel(0), {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbonPrefix}--tag span`,
    });

    const visible = screen.queryAllByText(/Tag [0-9]+/, {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbonPrefix}--tag span`,
    });
    expect(visible.length).toEqual(visibleTags);

    const overflow = screen.getByText(`+${tags10.length - visibleTags}`);
    userEvent.click(overflow);

    const overflowVisible = screen.queryAllByText(/Tag [0-9]+/, {
      // selector need to ignore sizing items
      selector: `.${blockClassOverflow}__content *`,
    });
    expect(overflowVisible.length + visible.length).toEqual(tags10.length);
  });

  it('Clicking show more on the overflow displays TagSetModal', () => {
    const visibleTags = 5;
    window.innerWidth = tagWidth * (visibleTags + 1) + 1; // + 1 for overflow

    // const { container } =
    render(<TagSet {...overflowAndModalStrings} tags={tags} />);

    const overflow = screen.getByText(`+${tags.length - visibleTags}`);
    userEvent.click(overflow);

    const viewAll = screen.getByText('View all tags');
    userEvent.click(viewAll);

    const modal = screen.getByRole('presentation');
    expect(modal).toHaveClass('is-visible');
    const closeButton = screen.getByTitle('Close');
    userEvent.click(closeButton);
    expect(modal).not.toHaveClass('is-visible');
  });

  it('it requires strings for overflow and modal when more than ten tags supplied.', () =>
    expectMultipleError(
      [
        required('allTagsModalSearchLabel', 'TagSet'),
        required('allTagsModalSearchPlaceholderText', 'TagSet'),
        required('allTagsModalTitle', 'TagSet'),
        required('showAllTagsLabel', 'TagSet'),
      ],
      () => {
        const visibleTags = 5;
        window.innerWidth = tagWidth * (visibleTags + 1) + 1; // + 1 for overflow

        render(<TagSet tags={tags} />);
      }
    ));

  it('Obeys max visible', () => {
    window.innerWidth = tagWidth * 10 + 1;

    render(<TagSet maxVisible={5} tags={tags10} />);

    // first and last should be visible
    screen.getByText(tagLabel(0), {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbonPrefix}--tag span`,
    });
    screen.getByText(tagLabel(4), {
      // selector need to ignore sizing items
      selector: `.${blockClass}__displayed-tag .${carbonPrefix}--tag span`,
    });

    expect(
      screen.getAllByText(/Tag [0-9]+/, {
        // selector need to ignore sizing items
        selector: `.${blockClass}__displayed-tag .${carbonPrefix}--tag span`,
      }).length
    ).toEqual(5);
  });

  const dataTestId = uuidv4();

  it('adds additional properties to the containing node', () => {
    window.innerWidth = tagWidth * 10 + 1;

    render(<TagSet data-testid={dataTestId} tags={tags10} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    window.innerWidth = tagWidth * 10 + 1;

    render(<TagSet ref={ref} tags={tags10} />);

    expect(ref.current).not.toBeNull();
  });

  it('adds the Devtools attribute to the containing node', () => {
    render(<TagSet data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      TagSet.displayName
    );
  });

  it('copes with no tags', () => {
    window.innerWidth = tagWidth * 10 + 1;

    render(<TagSet data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('Does not duplicate tag ids', () => {
    const { container } = render(<TagSet tags={tags10} />);

    expect(container.querySelectorAll(`#${tags10[0].id}`)).toHaveLength(1);
  });

  describe(TagSetModal.displayName, () => {
    const args = {
      title: 'a-title',
      searchLabel: 'a search label',
      searchPlaceholder: 'a search placeholder',
    };

    it('Renders a modal with all tags and filters on search', () => {
      render(<TagSetModal allTags={tags} {...args} open />);

      const search = screen.getByRole('searchbox');
      const unfilteredTags = screen.getAllByText(/Tag [0-9]+/);

      // userEvent.type(search, '1'); // does not work
      fireEvent.change(search, { target: { value: '2' } });
      const filteredTags = screen.getAllByText(/Tag [0-9]+/);
      expect(filteredTags.length - unfilteredTags.length).toBeLessThan(0);

      fireEvent.change(search, { target: { value: '1zxy' } });
      const noTags = screen.queryAllByText(/Tag [0-9]+/);
      expect(noTags.length).toBe(0);

      fireEvent.change(search, { target: { value: 'dozen' } });
      screen.getAllByText(/Tag 12/);

      fireEvent.change(search, { target: { value: '10' } });
      expect(screen.getAllByText(/Tag [0-9]+/).length).toEqual(
        16 // tags with binary 10 in value 16 of 1 to 20
      );

      fireEvent.change(search, { target: { value: '' } });
      screen.getAllByText(/Tag [0-9]+/);
    });
  });
});
