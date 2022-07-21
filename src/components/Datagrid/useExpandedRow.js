/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import React, { useState } from 'react';
import DatagridExpandedRow from './Datagrid/DatagridExpandedRow';
import useRowExpander from './useRowExpander';
import { pkg } from '@/settings';

const blockClass = `${pkg.prefix}--datagrid`;

const expansionRenderer = ({ row }) => (
  <div className={`${blockClass}__expanded-row-content`}>
    Content for {row.id}
  </div>
);

const useExpandedRow = (hooks) => {
  useRowExpander(hooks);
  const useInstance = (instance) => {
    const { rows, expandedContentHeight } = instance;
    const [expandedRowsHeight, setExpandedRowsHeight] = useState({});
    const setExpandedRowHeight = (rowIndex, height) =>
      setExpandedRowsHeight({ ...expandedRowsHeight, [rowIndex]: height });
    const rowsWithExpand = rows.map((row) => ({
      ...row,
      canExpand: row.original && !row.original.notExpandable,
      expandedContentHeight:
        expandedRowsHeight[row.index] || expandedContentHeight,
      RowRenderer: DatagridExpandedRow(row.RowRenderer, expansionRenderer),
    }));
    Object.assign(instance, { rows: rowsWithExpand, setExpandedRowHeight });
  };
  hooks.useInstance.push(useInstance);
};

export default useExpandedRow;
