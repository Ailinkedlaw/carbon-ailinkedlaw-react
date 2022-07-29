/*
 * Licensed Materials - Property of IBM
 * 5724-Q36
 * (c) Copyright IBM Corp. 2021
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

import { useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import cx from 'classnames';
import { pkg } from '@/settings';
import _ ,{ findIndex, slice } from 'lodash'

const blockClass = `${pkg.prefix}--datagrid`;

const styleClassPrefix = `${blockClass}__right-sticky-column`;
const OFFSET_SCROLL_CLASS = `${styleClassPrefix}-offset-scroll`;

const useStickyColumn = (hooks) => {
  const tableBodyRef = useRef();
  const stickyHeaderCellRef = useRef();

  hooks.getCellProps.push(changeProps.bind(null, 'cell', null));
  hooks.getHeaderProps.push(
    changeProps.bind(null, 'header', stickyHeaderCellRef)
  );
  hooks.getTableBodyProps.push(addTableBodyProps.bind(null, tableBodyRef));
  hooks.getHeaderGroupProps.push((props) => [
    props,
    {
      style: {
        ...props.style,
        minWidth: 'unset', // unset the min-width calculated by sum of all column min-width
      },
    },
  ]);
  const useEventListener = (instance) => {
    useEffect(() => {
      const tableBodyElement = tableBodyRef.current;
      const headerCellElement = stickyHeaderCellRef.current;
      if (hasVertScroll(tableBodyElement) && headerCellElement) {
        headerCellElement.classList.add(OFFSET_SCROLL_CLASS);
      }
      const boundListener = debounce(
        onBodyResize.bind(null, tableBodyElement, headerCellElement),
        250
      );
      window.addEventListener('resize', boundListener);
      return () => {
        window.removeEventListener('resize', boundListener);
      };
    }, [instance.rows, instance.isFetching]);
    useEffect(() => {
      const tableBodyElement = tableBodyRef.current;
      const headerCellElement = stickyHeaderCellRef.current;
      const listener = (evt) => {
        toggleStickyShadow(evt.target, headerCellElement);
      };
      toggleStickyShadow(tableBodyElement, headerCellElement);
      if (tableBodyElement) {
        tableBodyElement.addEventListener('scroll', listener);
      }
      return () => {
        if (tableBodyElement) {
          tableBodyElement.removeEventListener('scroll', listener);
        }
      };
    }, [instance.rows, instance.isFetching]);
  };
  const useCheckScroll = (instance) => {
    const tableBodyElement = tableBodyRef.current;
    const headerCellElement = stickyHeaderCellRef.current;
    useEffect(() => {
      onBodyResize(tableBodyElement, headerCellElement);
    }, [instance.rows, headerCellElement, tableBodyElement]);
  };
  hooks.useInstance.push(useEventListener);
  hooks.useInstance.push(useCheckScroll);
  hooks.useInstance.push((instance) => {
    Object.assign(instance, {
      withStickyColumn: true,
    });
  });
  
  // TODO
  const changePropsText = (props, data) => {
    
    const { visibleColumns } = data.instance
    let { column } = data;
    if (!column && data.cell) {
      // eslint-disable-next-line prefer-destructuring
      column = data.cell.column;
    }
    if (column.sticky === 'right') {
      const allLength = visibleColumns.length
      const index = findIndex(visibleColumns, ['id', column.id]) + 1
      // const startRightIndex = findIndex(visibleColumns, ['sticky', 'right']);
      const startRight = visibleColumns.find(i => i.sticky === 'right')
      if (allLength === index) {
        return [props, {
          style: { flex: '1 1 0' },
          className: cx({
            [`${styleClassPrefix}__shadow`]: startRight.id === column.id
          })
        }];
      }
      const arr = _.takeRight(visibleColumns, allLength - index)
      
      let rightNum = 0
      arr.map(i => { rightNum += i.width })
      return [
        props,
        {
          style: { right: `${rightNum}px` },
          className: cx({
            [`${styleClassPrefix}__shadow`]: startRight.id === column.id
          })
        }
      ]
    }
    
    // left
    if (column.sticky === 'left') {
      // const allLength = visibleColumns.length
      const index = findIndex(visibleColumns, ['id', column.id]) + 1
      const startRightIndex = _.findLastIndex(visibleColumns, {sticky: 'left'})
      const startRight = visibleColumns[startRightIndex]
      if (index === 1) {
        return [props, {
          style: { flex: '1 1 0', left: '0' },
          className: cx({
            [`${blockClass}__left-sticky-column__shadow`]: true
          })
        }];
      }
      
      const arr = _.take(visibleColumns, index - 1)
      let leftNum = 0
      arr.map(i => { leftNum += i.width })
      return [props, {
        style: { left: `${leftNum}px` },
        className: cx({
          [`${blockClass}__left-sticky-column__shadow`]: startRight.id === column.id
        })
      }]
    }
    return [props]
  };
  hooks.getHeaderProps.push((props, data) => changePropsText(props, data));
  hooks.getCellProps.push((props, data) => changePropsText(props, data));
  
  hooks.useInstance.push((instance) => {
    // debugger
    // sticky column is defined by consumer
    // it will always comes after the spacer which is defined by useFlexResize
    // swap them here to use the spacer to push
    // sticky column to the right when there are few
    // columns defined
    // const newColumns = instance.visibleColumns;
    // let spacerIdx = newColumns.findIndex((col) => col.id === 'spacer');
    // let stickyIdx = newColumns.findIndex((col) => col.sticky === 'right');
    // if (spacerIdx >= 0 && stickyIdx >= 0 && stickyIdx < spacerIdx) {
    //   const temp = newColumns[spacerIdx]; // spacer
    //   newColumns[spacerIdx] = newColumns[stickyIdx];
    //   // spacer
    //   newColumns[stickyIdx] = temp;
    // }
    // const newHeaders = instance.headers;
    // spacerIdx = newHeaders.findIndex((col) => col.id === 'spacer');
    // stickyIdx = newHeaders.findIndex((col) => col.sticky === 'right');
    // if (spacerIdx >= 0 && stickyIdx >= 0 && stickyIdx < spacerIdx) {
    //   const temp = newHeaders[spacerIdx];
    //   newHeaders[spacerIdx] = newHeaders[stickyIdx];
    //   newHeaders[stickyIdx] = temp;
    // }
  });
};

const addTableBodyProps = (tableBodyRef, props) => [
  props,
  {
    ref: tableBodyRef,
  },
];

const changeProps = (elementName, headerCellRef, props, data) => {
  const column = data.column || data.cell.column;
  if (column.sticky === 'right') {
    return [
      props,
      {
        className: cx({
          [`${blockClass}__cell`]: true,
          [`${styleClassPrefix}-${elementName}`]: true, // apply sticky styles
          [`${blockClass}__resizableColumn`]: false,
          [`${blockClass}__sortableColumn`]: false,
        }),
        ...(headerCellRef && {
          ref: headerCellRef,
        }),
      },
    ];
  }
  if (column.sticky === 'left') {
    return [
      props,
      {
        className: cx({
          [`${blockClass}__cell`]: true,
          [`${styleClassPrefix}-${elementName}`]: true, // apply sticky styles
          [`${blockClass}__resizableColumn`]: false,
          [`${blockClass}__sortableColumn`]: false,
        }),
        ...(headerCellRef && {
          ref: headerCellRef,
        }),
      },
    ];
  }
  return [props];
};

const onBodyResize = (tableBodyEle, headerCellEle) => {
  if (headerCellEle) {
    if (hasVertScroll(tableBodyEle)) {
      headerCellEle.classList.add(OFFSET_SCROLL_CLASS);
    } else {
      headerCellEle.classList.remove(OFFSET_SCROLL_CLASS);
    }
    toggleStickyShadow(tableBodyEle, headerCellEle);
  }
};

const toggleStickyShadow = (tableBodyEle, headerCellEle) => {
  if (tableBodyEle && headerCellEle) {
    const isScrolledToRight =
      tableBodyEle.scrollLeft + tableBodyEle.clientWidth === tableBodyEle.scrollWidth;
    if (isScrolledToRight) {
      // headerCellEle.classList.add(`${blockClass}__sticky-noShadow`);
      // tableBodyEle.classList.add(`${blockClass}__sticky-column-noShadow`);
    } else {
      // headerCellEle.classList.remove(`${blockClass}__sticky-noShadow`);
      // tableBodyEle.classList.remove(`${blockClass}__sticky-column-noShadow`);
    }
  }
};
const hasVertScroll = (element) => {
  if (!element) {
    return false;
  }
  const { scrollHeight, clientHeight } = element;
  return scrollHeight > clientHeight;
};

export default useStickyColumn;
