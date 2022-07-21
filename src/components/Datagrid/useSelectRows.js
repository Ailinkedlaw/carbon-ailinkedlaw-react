/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import React from 'react';
import cx from 'classnames';
import { DataTable } from '@carbon/react';
import { SelectAll } from './Datagrid/DatagridSelectAll';
import { selectionColumnId } from './common-column-ids';
import { pkg } from '@/settings';

const { TableSelectRow } = DataTable;

const blockClass = `${pkg.prefix}--datagrid`;

const useSelectRows = (hooks) => {
  useHighlightSelection(hooks);
  const useInstance = (instance) => {
    const { rows } = instance;
    const rowsWithSelect = rows.map((row) => ({ ...row, isSelectable: true }));
    Object.assign(instance, { rows: rowsWithSelect });
  };
  hooks.useInstance.push(useInstance);
  hooks.visibleColumns.push((columns) => [
    {
      id: selectionColumnId,
      Header: (gridState) => <SelectAll {...gridState} />,
      Cell: (gridState) => <SelectRow {...gridState} />,
    },
    ...columns,
  ]);
};

const useHighlightSelection = (hooks) => {
  const getRowProps = (props, { row }) => [
    props,
    {
      className: cx(
        `${blockClass}__carbon-row`,
        row.getToggleRowSelectedProps().checked
          ? 'bx--data-table--selected'
          : ''
      ),
    },
  ];
  hooks.getRowProps.push(getRowProps);
};

const SelectRow = (datagridState) => {
  const {
    isFetching = false,
    tableId,
    row,
    cell,
    radio,
    toggleAllRowsSelected,
    onRadioSelect,
  } = datagridState;
  const selectDisabled = isFetching || row.getRowProps().selectDisabled;
  const { onChange, ...selectProps } = row.getToggleRowSelectedProps();
  const cellProps = cell.getCellProps();
  return (
    <TableSelectRow
      {...cellProps}
      {...selectProps}
      radio={radio}
      onSelect={(e) => {
        e.stopPropagation(); // avoid triggering onRowClick
        if (radio) {
          toggleAllRowsSelected(false);
          if (onRadioSelect) {
            onRadioSelect(row);
          }
        }
        onChange(e);
      }}
      id={`${tableId}-${row.index}`}
      name={`${tableId}-${row.index}-name`}
      className={cx(`${blockClass}__checkbox-cell`, cellProps.className)}
      ariaLabel={`${tableId}-row-${row.index}`} // TODO: aria label should be i18n'ed
      disabled={selectDisabled}
    />
  );
};

export default useSelectRows;
