/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2021
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button, Checkbox } from '@carbon/react'
import update from 'immutability-helper';
import { pkg } from '@/settings';
import DraggableElement from '../../DraggableElement';
import { isColumnVisible } from './common';
import { ArrowLeft, ArrowRight, SubtractAlt } from '@carbon/icons-react'

const blockClass = `${pkg.prefix}--datagrid`;

const getNextIndex = (array, currentIndex, key) => {
  let newIndex = -1;
  if (key === 'ArrowUp') {
    newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : array.length - 1;
  }
  if (key === 'ArrowDown') {
    newIndex = currentIndex + 1 < array.length ? currentIndex + 1 : 0;
  }
  return newIndex;
};

const Columns = ({
  onSticky,
  filterString,
  columns,
  setColumnsObject,
  onSelectColumn,
  instructionsLabel = 'Press space bar to toggle drag drop mode, use arrow keys to move selected elements.',
  disabledInstructionsLabel = 'Reordering columns are disabled because they are filtered currently.',
}) => {
  const [ariaRegionText, setAriaRegionText] = React.useState('');
  const [focusIndex, setFocusIndex] = React.useState(-1);
  const moveElement = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = columns[dragIndex];
      setColumnsObject(
        update(columns, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [columns, setColumnsObject]
  );
  return (
    <>
      <div className={`${blockClass}__customize-columns-column-list`}>
        <DndProvider backend={HTML5Backend}>
          <ol
            className={`${blockClass}__customize-columns-column-list--focus`}
            role="listbox"
            aria-describedby={`${blockClass}__customize-columns--instructions`}
            onKeyDown={(e) => {
              const nextIndex = getNextIndex(columns, focusIndex, e.key);
              if (nextIndex >= 0) {
                setFocusIndex(nextIndex);
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            tabIndex={0}
            onFocus={(e) => {
              if (e.target === e.currentTarget) {
                setFocusIndex(0);
              }
            }}
          >
            <span
              aria-live="assertive"
              className={`${blockClass}__shared-ui--assistive-text`}
            >
              {ariaRegionText}
            </span>
            <span
              id={`${blockClass}__customize-columns--instructions`}
              className={`${blockClass}__shared-ui--assistive-text`}
            >
              {filterString.length === 0 ? instructionsLabel : disabledInstructionsLabel}
            </span>
        
            {columns
              .filter((colDef) =>
                filterString.length === 0 || colDef.Header.props.title.toLowerCase().includes(filterString)
              )
              .map((colDef, i) => (
                <DraggableElement
                  key={colDef.id}
                  index={i}
                  listData={columns}
                  setListData={setColumnsObject}
                  id={`dnd-datagrid-columns-${colDef.id}`}
                  type="column-customization"
                  disabled={filterString.length > 0}
                  ariaLabel={colDef.Header.props.title}
                  onGrab={setAriaRegionText}
                  isFocused={focusIndex === i}
                  moveElement={moveElement}
                  onArrowKeyDown={(e, isGrabbed, currentIndex) => {
                    if (isGrabbed) {
                      const nextIndex = getNextIndex(
                        columns,
                        currentIndex,
                        e.key
                      );
                      e.preventDefault();
                      e.stopPropagation();
                      if (nextIndex >= 0) {
                        setFocusIndex(nextIndex);
                        moveElement(currentIndex, nextIndex);
                        e.target.scrollIntoView({
                          block: 'center',
                        });
                      }
                    }
                  }}
                >
                  <Checkbox
                    wrapperClassName={`${blockClass}__customize-columns-checkbox`}
                    checked={isColumnVisible(colDef)}
                    // onChange={onSelectColumn.bind(null, colDef)}
                    onChange={(event, { checked }) => onSelectColumn(colDef, checked)}
                    id={`${blockClass}__customization-column-${colDef.id}`}
                    labelText={colDef.Header.props.title}
                    title={colDef.Header.props.title}
                  />
                  <div className={`${blockClass}__column-sticky-action`}>
                    {
                      colDef?.sticky !== 'left' ? <Button
                        kind="ghost"
                        renderIcon={ArrowLeft}
                        iconDescription="固定在列首"
                        hasIconOnly
                        size="sm"
                        onClick={() => onSticky(colDef, 'left')}
                      /> : <span>固定在左侧</span>
                    }
                    {
                      colDef?.sticky && <Button
                        kind="ghost"
                        renderIcon={SubtractAlt}
                        iconDescription="不固定"
                        hasIconOnly
                        size="sm"
                        onClick={() => onSticky(colDef, null)}
                      />
                    }
                    {
                      (colDef?.sticky !== 'right') ? <Button
                        kind="ghost"
                        renderIcon={ArrowRight}
                        iconDescription="固定在列尾"
                        hasIconOnly
                        size="sm"
                        onClick={() => onSticky(colDef, 'right')}
                      /> : <span>固定在右侧</span>
                    }
                  </div>
                </DraggableElement>
              ))}
          </ol>
        </DndProvider>
      </div>
    </>
  );
};

Columns.propTypes = {
  columns: PropTypes.array.isRequired,
  disabledInstructionsLabel: PropTypes.string,
  filterString: PropTypes.string.isRequired,
  instructionsLabel: PropTypes.string,
  onSelectColumn: PropTypes.func.isRequired,
  setColumnsObject: PropTypes.func.isRequired,
  onSticky: PropTypes.func.isRequired
};

export default Columns;
