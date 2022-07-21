/* eslint-disable react/default-props-match-prop-types */
/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2021
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

import React, { useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup, RadioButton } from '@carbon/react';
import isArray from 'lodash/isArray';
import { pkg } from '@/settings';

const blockClass = `${pkg.prefix}--datagrid`;

// eslint-disable-next-line react/display-name
const RowSizeRadioGroup = forwardRef(
  (
    {
      rowSizes,
      selectedOption,
      datagridName,
      onChange,
      hideRadioGroup,
      legendText = 'Row height',
      rowSizeLabels = {
        xl: 'Extra large',
        lg: 'Large (default)',
        md: 'Medium',
        sm: 'Small',
        xs: 'Extra small',
      },
    },
    ref
  ) => {
    const getDropdownPosition = (buttonEle) => {
      if (buttonEle instanceof HTMLElement) {
        const top = buttonEle.offsetTop + buttonEle.offsetHeight;
        const right = buttonEle.offsetLeft + buttonEle.offsetWidth;
        return {
          top,
          right,
        };
      }
      return { top: 0, right: 0 };
    };

    const { top, right } = getDropdownPosition(ref.current);

    useEffect(() => {
      window.addEventListener('click', hideRadioGroup);
      return () => {
        window.removeEventListener('click', hideRadioGroup);
      };
    }, [hideRadioGroup]);

    return (
      <div
        className={`${blockClass}__row-size-dropdown`}
        style={{
          top,
          right,
        }}
        role="presentation"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <RadioButtonGroup
          legendText={legendText}
          name="row-height-group"
          orientation="vertical"
          defaultSelected={getBackwardCompatibleRowSize(selectedOption)}
          onChange={onChange}
        >
          {rowSizes &&
            isArray(rowSizes) &&
            rowSizes.map((option) => {
              let labelText;
              try {
                labelText = option.labelText || rowSizeLabels[option.value];
              } catch (e) {
                labelText = option.value;
              }
              return (
                <RadioButton
                  key={option.value}
                  labelText={labelText}
                  value={option.value}
                  id={`${datagridName || 'datagrid'}--row-density--${
                    option.value
                  }`}
                />
              );
            })}
        </RadioButtonGroup>
      </div>
    );
  }
);
const getBackwardCompatibleRowSize = (rowSize) => {
  // TODO: deprecate this function in next major release (v8) on carbon-components-react
  const rowSizeMap = {
    tall: 'xl',
    normal: 'lg',
    short: 'sm',
    compact: 'xs',
    // md is a new value
  };
  return rowSizeMap[rowSize] || rowSize;
};

RowSizeRadioGroup.defaultProps = {
  rowSizes: [
    {
      value: 'xl', // 64
    },
    {
      value: 'lg', // 48
    },
    {
      value: 'md', // 40
    },
    {
      value: 'sm', // 32
    },
    {
      value: 'xs', // 24
    },
  ],
  selectedOption: 'lg',
};

RowSizeRadioGroup.propTypes = {
  datagridName: PropTypes.string,
  hideRadioGroup: PropTypes.func.isRequired,
  legendText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rowSizeLabels: PropTypes.object,
  rowSizes: PropTypes.array.isRequired,
  selectedOption: PropTypes.string.isRequired,
};

export default RowSizeRadioGroup;
