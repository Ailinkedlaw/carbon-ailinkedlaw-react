/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
// TODO: import action to handle events if required.
// import { action } from '@storybook/addon-actions';
import { useColumnOrder } from 'react-table';
import { range, makeData, newPersonWithTwoLines } from './utils/makeData';

import { getStoryTitle } from '@/global/js/utils/story-helper';

import { Activity, Restart, Download, Filter } from '@carbon/icons-react';
import { DataTable, Button, Pagination } from '@carbon/react';
import {
  Datagrid,
  useDatagrid,
  useInfiniteScroll,
  useNestedRows,
  useExpandedRow,
  useRowIsMouseOver,
  useSelectRows,
  useOnRowClick,
  useSortableColumns,
  useColumnRightAlign,
  useDisableSelectRows,
  useCustomizeColumns,
  useSelectAllWithToggle,
  useColumnCenterAlign,
  useStickyColumn,
  useActionsColumn,
} from '.';

import {
  CustomizeColumnStory,
  RowSizeDropdownStory,
  // SelectAllWithToggle,
  LeftPanelStory,
} from './Datagrid.stories-helpers';
import mdx from './Datagrid.mdx';

import styles from './_storybook-styles.scss';

export default {
  title: 'Components/Datagrid',
  component: Datagrid,
  // TODO: Define argTypes for props not represented by standard JS types.
  // argTypes: {
  //   egProp: { control: 'color' },
  // },
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

const emptyStateTitle = 'Empty state title';
const emptyStateDescription =
  'Description text explaining why this card is empty.';
const emptyStateSize = 'lg';

const Wrapper = ({ children }) => (
  <div
    style={{
      height: '100vh',
      width: '100%',
      padding: '1rem',
      margin: '0',
      zIndex: '0',
    }}
  >
    {children}
  </div>
);

const defaultHeader = [
  {
    Header: 'Row Index',
    accessor: (row, i) => i,
    // sticky: 'right',
    id: 'rowIndex', // id is required when accessor is a function.
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
    // sticky: 'left',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Age',
    accessor: 'age',
    width: 50,
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    width: 60,
  },
  {
    Header: 'Someone 1',
    accessor: 'someone1',
  },
  {
    Header: 'Someone 2',
    accessor: 'someone2',
  },
  {
    Header: 'Someone 3',
    accessor: 'someone3',
  },
  {
    Header: 'Someone 4',
    accessor: 'someone4',
  },
  {
    Header: 'Someone 5',
    accessor: 'someone5',
  },
  {
    Header: 'Someone 6',
    accessor: 'someone6',
  },
  {
    Header: 'Someone 7',
    accessor: 'someone7',
  },
  {
    Header: 'Someone 8',
    accessor: 'someone8',
  },
  {
    Header: 'Someone 9',
    accessor: 'someone9',
  },
  {
    Header: 'Someone 10',
    accessor: 'someone10',
  },
];

const { TableBatchAction, TableBatchActions } = DataTable;

export const BasicUsage = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid({
    columns,
    data,
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const EmptyState = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(0));
  const illustrationTheme = 'light';

  const datagridState = useDatagrid({
    columns,
    data,
    emptyStateTitle,
    emptyStateDescription,
    emptyStateSize,
    illustrationTheme,
    DatagridActions,
    DatagridBatchActions,
    DatagridPagination,
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const InitialLoad = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data, setData] = useState(makeData(0));

  const [isFetching, setIsFetching] = useState(false);
  const fetchData = () =>
    new Promise((resolve) => {
      setIsFetching(true);
      setTimeout(() => {
        setData(data.concat(makeData(30, 5, 2)));
        resolve();
      }, 1000);
    }).then(() => setIsFetching(false));

  useEffect(() => {
    fetchData();
  }, []);

  const datagridState = useDatagrid({
    columns,
    data,
    isFetching,
    emptyStateTitle,
    emptyStateDescription,
    emptyStateSize,
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const InfiniteScroll = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data, setData] = useState(makeData(0));

  const [isFetching, setIsFetching] = useState(false);
  const fetchData = () =>
    new Promise((resolve) => {
      setIsFetching(true);
      setTimeout(() => {
        setData(data.concat(makeData(30, 5, 2)));
        setIsFetching(false);
        resolve();
      }, 1000);
    });
  useEffect(() => {
    fetchData();
  }, []);

  const datagridState = useDatagrid(
    {
      columns,
      data,
      isFetching,
      fetchMoreData: fetchData,
      emptyStateTitle,
      emptyStateDescription,
      emptyStateSize,
    },
    useInfiniteScroll
  );

  return (
    <Wrapper>
      <Datagrid datagridState={{ ...datagridState }} />
    </Wrapper>
  );
};

export const TenThousandEntries = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10000));
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useInfiniteScroll
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

const DatagridPagination = ({ state, setPageSize, gotoPage, rows }) => {
  const updatePagination = ({ page, pageSize }) => {
    console.log(state);
    setPageSize(pageSize);
    gotoPage(page - 1); // Carbon is non-zero-based
  };

  return (
    <Pagination
      page={state.pageIndex + 1} // react-table is zero-based
      pageSize={state.pageSize}
      pageSizes={state.pageSizes || [10, 20, 30, 40, 50]}
      totalItems={rows.length}
      onChange={updatePagination}
    />
  );
};

export const WithPagination = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(100));
  const datagridState = useDatagrid({
    columns,
    data,
    initialState: {
      pageSize: 25,
      pageSizes: [5, 10, 25, 50],
    },
    DatagridPagination,
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};
export const NestedRows = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10, 5, 2, 2));
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useNestedRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};
export const ExpandedRow = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      expandedContentHeight: 95,
    },
    useExpandedRow
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const NestedTable = () => {
  const [data] = useState(makeData(20));
  const nestedColumns = React.useMemo(() => [...defaultHeader], []);
  nestedColumns[0] = {
    Header: 'Row #',
    accessor: (row, i) => i,
    sticky: 'left',
  };
  const nestedDatagridState = useDatagrid({
    columns: nestedColumns,
    data,
    initialState: { pageSize: 10 },
    DatagridPagination,
  });

  const expansionRenderer = () => (
    <div className="carbon-nested-table">
      <Datagrid datagridState={{ ...nestedDatagridState }} />
    </div>
  );

  const columns = React.useMemo(() => defaultHeader, []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      ExpandedRowContentComponent: expansionRenderer,
      expandedContentHeight: (nestedDatagridState.state.pageSize + 2) * 48 + 1, // +2 for header and pagination
    },
    useExpandedRow
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const ClickableRow = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      onRowClick: (row) => alert(`Clicked ${row.id}`),
    },
    useOnRowClick
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const IsHoverOnRow = () => {
  const Cell = ({ row }) => {
    if (row.isMouseOver) {
      return 'yes hovering!';
    }
    return '';
  };
  const columns = React.useMemo(
    () => [
      ...defaultHeader.slice(0, 3),
      {
        Header: 'Is hover on row?',
        id: 'isHoveringColumn',
        disableSortBy: true,
        Cell,
      },
    ],
    []
  );
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useRowIsMouseOver
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const SelectableRow = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const RadioSelect = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      hideSelectAll: true,
      radio: true,
      onRadioSelect: (row) => console.log(row),
      initialState: {
        selectedRowIds: {
          3: true,
        },
      },
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const HideSelectAll = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      hideSelectAll: true,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const SortableColumns = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useSortableColumns
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const RightAlignedColumns = () => {
  const columns = React.useMemo(
    () => [
      ...defaultHeader.slice(0, 3),
      {
        Header: 'Age',
        accessor: 'age',
        rightAlignedColumn: true,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        rightAlignedColumn: true,
      },
    ],
    []
  );
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useColumnRightAlign
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const CenterAlignedColumns = () => {
  const columns = React.useMemo(
    () => [
      ...defaultHeader.slice(0, 3),
      {
        Header: 'Age',
        accessor: 'age',
        centerAlignedColumn: true,
      },

      {
        Header: 'Visit',
        accessor: 'visits',
        centerAlignedColumn: true,
      },
    ],
    []
  );

  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
    },
    useColumnCenterAlign
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

const DatagridActions = (datagridState) => {
  const {
    selectedFlatRows,
    setGlobalFilter,
    CustomizeColumnsButton,
    RowSizeDropdown,
    rowSizeDropdownProps,
  } = datagridState;
  const downloadCsv = () => {
    alert('Downloading...');
  };
  const { TableToolbarContent, TableToolbarSearch } = DataTable;

  const refreshColumns = () => {
    alert('refreshing...');
  };
  const leftPanelClick = () => {
    alert('open/close left panel...');
  };
  const searchForAColumn = 'Search';
  const isNothingSelected = selectedFlatRows.length === 0;
  const style = {
    'button:nth-child(1) > span:nth-child(1)': {
      bottom: '-37px',
    },
  };
  return (
    isNothingSelected && (
      <React.Fragment>
        <Button
          kind="ghost"
          hasIconOnly
          tooltipPosition="bottom"
          renderIcon={(props) => <Filter size={16} {...props} />}
          iconDescription={'Left panel'}
          onClick={leftPanelClick}
        />
        <TableToolbarContent>
          <TableToolbarSearch
            size="lg"
            id="columnSearch"
            persistent
            placeholder={searchForAColumn}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <RowSizeDropdown {...rowSizeDropdownProps} buttonLabel="设置" />
          <div style={style}>
            <Button
              kind="ghost"
              hasIconOnly
              tooltipPosition="bottom"
              renderIcon={(props) => <Restart size={16} {...props} />}
              iconDescription={'Refresh'}
              onClick={refreshColumns}
            />
          </div>
          <div style={style}>
            <Button
              kind="ghost"
              hasIconOnly
              tooltipPosition="bottom"
              renderIcon={(props) => <Download size={16} {...props} />}
              iconDescription={'Download CSV'}
              onClick={downloadCsv}
            />
          </div>
          {CustomizeColumnsButton && (
            <div style={style}>
              <CustomizeColumnsButton />
            </div>
          )}
        </TableToolbarContent>
      </React.Fragment>
    )
  );
};

export const DatagridActionsToolbar = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      DatagridBatchActions,
      emptyStateTitle: 'No items found',
      emptyStateDescription: 'Description text',
      emptyStateSize: 'lg',
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const SelectItemsInAllPages = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(100));
  const [areAllSelected, setAreAllSelected] = useState(false);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        pageSizes: [5, 10, 25, 50],
      },
      selectAllToggle: {
        labels: {
          allRows: 'Select all',
        },
        onSelectAllRows: setAreAllSelected,
      },
      DatagridPagination,
      DatagridActions,
      DatagridBatchActions,
      emptyStateTitle,
      emptyStateDescription,
      emptyStateSize,
    },
    useSelectRows,
    useSelectAllWithToggle
  );

  return (
    <>
      <Datagrid datagridState={{ ...datagridState }} />
      <h3>Doc in Notes...</h3>
      <p>{`Are all selected across all pages? - ${areAllSelected}`}</p>
    </>
  );
};
// SelectItemsInAllPages.story = SelectAllWithToggle;

export const CustomizingColumns = () => {
  // const columns = React.useMemo(() => defaultHeader, []);
  const [hiddenColumns, setHiddenColumns] = useState([])
  const [columns, setColumns] = useState(defaultHeader);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      initialState: {
        hiddenColumns,
        // columnOrder: [],
      },
      customizeColumnsProps: {
        onSaveColumnPrefs: (newColDefs) => {
          const columnss = columns.map(v => {
            const itme = newColDefs.find(i => i.Header === v.Header)
            if (itme) {
              return { ...v, sticky: itme.sticky, isVisible: itme.isVisible }
            }
            return v
          })

          setColumns(columnss)
          setHiddenColumns(newColDefs.filter((colDef) => !colDef.isVisible)
            .map((colDef) => colDef.id))
          console.log(newColDefs);
        },
      },
      DatagridActions,
      DatagridBatchActions,
      emptyStateTitle,
      emptyStateDescription,
      emptyStateSize,
    },
    useStickyColumn, // 列固定
    useActionsColumn, // 操作
    useCustomizeColumns, // 自定义列
    useColumnOrder, // 使用顺序
  );

  return (
    <>
      <Datagrid datagridState={{ ...datagridState }} />
      <div> Hidden column ids:
        <pre>{JSON.stringify(datagridState.state.hiddenColumns, null, 2)}</pre>
      </div>
      <p>
        More details in the <strong>Notes</strong> section
      </p>
    </>
  );
};

CustomizingColumns.story = CustomizeColumnStory;

export const RowSizeDropdown = () => {
  const columns = React.useMemo(
    () => [
      ...defaultHeader.slice(0, 3),
      {
        Header: 'Different cell content',
        id: 'rowSizeDemo-cell',
        disableSortBy: true,
        Cell: ({ rowSize }) => rowSize,
      },
    ],
    []
  );
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      rowSize: 'xs',
      rowSizes: [
        {
          value: 'xl',
          labelText: 'More than super',
        },
        {
          value: 'lg',
          labelText: 'Super tall row',
        },
        {
          value: 'md',
        },
        {
          value: 'xs',
          labelText: 'Teeny tiny row',
        },
      ],
      onRowSizeChange: (value) => {
        console.log('row size changed to: ', value);
      },
      DatagridActions,
      DatagridBatchActions,
      emptyStateTitle,
      emptyStateDescription,
      emptyStateSize,
    },
    useSelectRows
  );

  return (
    <Wrapper>
      <Datagrid datagridState={{ ...datagridState }} />
    </Wrapper>
  );
};
RowSizeDropdown.story = RowSizeDropdownStory;

import { pkg } from '@/settings';

const blockClass = `${pkg.prefix}--datagrid`;

export const LeftPanel = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid({
    leftPanel: {
      isOpen: true, // this toggling will happen from datagridActions.
      panelContent: (
        <div className={`${blockClass}__panel-content`}>
          Panel content will go here along with any button interactions
        </div>
      ),
    },
    columns,
    data,
    DatagridActions,
    DatagridBatchActions,
    emptyStateTitle,
    emptyStateDescription,
    emptyStateSize,
  });

  return (
    <Wrapper>
      <Datagrid datagridState={{ ...datagridState }} />
    </Wrapper>
  );
};
LeftPanel.story = LeftPanelStory;

const DatagridBatchActions = (datagridState) => {
  const { selectedFlatRows, toggleAllRowsSelected } = datagridState;
  const totalSelected = selectedFlatRows && selectedFlatRows.length;
  const onBatchAction = () => alert('Batch action');
  const actionName = 'Action';
  return (
    <TableBatchActions
      shouldShowBatchActions={totalSelected > 0}
      totalSelected={totalSelected}
      onCancel={() => toggleAllRowsSelected(false)}
    >
      <TableBatchAction
        renderIcon={(props) => <Activity size={16} {...props} />}
        onClick={onBatchAction}
      >
        {actionName}
      </TableBatchAction>
    </TableBatchActions>
  );
};

export const BatchActions = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      DatagridBatchActions,
      emptyStateTitle,
      emptyStateDescription,
      emptyStateSize,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const DisableSelectRow = () => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      DatagridBatchActions,
      endPlugins: [useDisableSelectRows],
      shouldDisableSelectRow: (row) => row.id % 2 === 0,
      disableSelectAll: true,
      emptyStateTitle,
      emptyStateDescription,
      emptyStateSize,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

// export { StickyActionsColumn };

NestedRows.story = {
  parameters: {
    notes: `## Sample usage
    Data should look like this:

    \`\`\`json
    [
      {
        "name": "test 0", "subRows": [
          {
            "name": "test 0.0", "subRows": [
              {
                "name": "test 0.0.0"
              }
            ]
          }
        ]
      },
      {
        "name": "test 1"
      }
    ]
    \`\`\`
    <br />

    \`\`\`js
    const datagridState = useDatagrid(
      {
        columns,
        data,
      },
      useRowExpander,
      useNestedRows,
    );
    \`\`\`
    <br />
    \`\`\`html
    <Datagrid {...datagridState} />
    \`\`\`
    `,
  },
};

const makeDataWithTwoLines = (length) =>
  range(length).map(() => newPersonWithTwoLines());

export const TopAlignment = () => {
  const columns = React.useMemo(() => defaultHeader.slice(0, 3), []);
  const [data] = useState(makeDataWithTwoLines(10));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      verticalAlign: 'top',
      variableRowHeight: true,
      rowSize: 'xs',
      rowSizes: [
        {
          value: 'xl',
        },
        {
          value: 'lg',
        },
        {
          value: 'md',
        },
        {
          value: 'xs',
        },
      ],
      DatagridActions,
      DatagridBatchActions,
      emptyStateTitle,
      emptyStateDescription,
      emptyStateSize,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const StickyActionsColumn = () => {
  const columns = React.useMemo(
    () => [
      ...defaultHeader,
      {
        Header: '',
        accessor: 'actions',
        sticky: 'right',
        width: 60,
        isAction: true,
      },
    ],
    []
  );
  const [data] = useState(makeData(10));
  const [msg, setMsg] = useState('click action menu');
  const onActionClick = (actionId, row) => {
    const { original } = row;
    setMsg(
      `Clicked [${actionId}] on row: <${original.firstName} ${original.lastName}>`
    );
  };

  const datagridState = useDatagrid(
    {
      columns,
      data,
      rowActions: [
        {
          id: 'edit',
          itemText: 'Edit',
          onClick: onActionClick,
        },
        {
          id: 'vote',
          itemText: 'Vote',
          onClick: onActionClick,
          shouldHideMenuItem: (row) => row.original.age <= 18,
        },
        {
          id: 'retire',
          itemText: 'Retire',
          onClick: onActionClick,
          disabled: false,
          shouldDisableMenuItem: (row) => row.original.age <= 60,
        },
        {
          id: 'delete',
          itemText: 'Delete',
          hasDivider: true,
          isDelete: true,
          onClick: onActionClick,
        },
      ],
    },
    useStickyColumn,
    useActionsColumn
  );
  return (
    <Wrapper>
      <h3>{msg}</h3>
      <Datagrid datagridState={{ ...datagridState }} />
      <p>More details documentation check the Notes section below</p>
    </Wrapper>
  );
};
