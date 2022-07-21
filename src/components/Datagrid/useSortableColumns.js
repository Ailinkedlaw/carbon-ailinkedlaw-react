/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import React from 'react';
import { Button } from '@carbon/react';
import { ArrowUp, ArrowDown, ArrowsVertical } from '@carbon/icons-react';

const ordering = {
  ASC: 'ASC',
  DESC: 'DESC',
  NONE: 'NONE',
};
const useSortableColumns = (hooks) => {
  const sortableVisibleColumns = (visibleColumns, { instance }) => {
    const { onSort } = instance;
    const onSortClick = (column) => {
      const key = column.id;
      const sortDesc = column.isSortedDesc;
      const { newSortDesc, newOrder } = getNewSortOrder(sortDesc);
      if (onSort) {
        onSort(key, newOrder);
      }
      instance.toggleSortBy(key, newSortDesc, false);
    };
    const sortableColumns = visibleColumns.map((column) => {
      const icon = (col, props) => {
        if (col.isSorted) {
          switch (col.isSortedDesc) {
          case false:
            return <ArrowUp size={16} {...props} />;
          case true:
            return <ArrowDown size={16} {...props} />;
          default:
            return <ArrowsVertical size={16} {...props} />;
          }
        }
        return <ArrowsVertical size={16} {...props} />;
      };
      const Header = (headerProp) =>
        column.disableSortBy === true ? (
          column.Header
        ) : (
          <Button
            onClick={() => onSortClick(headerProp.column)}
            kind="ghost"
            renderIcon={(props) => icon(headerProp.column, props)}
          >
            {column.Header}
          </Button>
        );
      return { ...column, Header };
    });
    return [...sortableColumns];
  };

  const sortInstanceProps = (instance) => {
    const { onSort } = instance;
    Object.assign(instance, { manualSortBy: !!onSort, isTableSortable: true });
  };

  const getNewSortOrder = (sortOrder) => {
    const order = {
      newSortDesc: undefined,
      newOrder: ordering.NONE,
    };
    if (sortOrder === false) {
      order.newOrder = ordering.DESC;
      order.newSortDesc = true;
    }
    if (sortOrder === undefined) {
      order.newOrder = ordering.ASC;
      order.newSortDesc = false;
    }
    return order;
  };
  hooks.visibleColumns.push(sortableVisibleColumns);
  hooks.useInstance.push(sortInstanceProps);
};

export default useSortableColumns;
