const s = [
  {
    n: 'Overview',
    s: [
      {
        n: 'Getting started',
        s: []
      },
      {
        n: 'Usage examples',
        s: []
      },
      'o/Examples'
    ]
  },
  {
    n: 'IBM Products',
    s: [
      {
        n: 'Components',
        s: [
          { n: 'Tag set', s: ['c/TagSet'] },
          { n: 'Cards', s: ['c/ExpressiveCard', 'c/ProductiveCard'] },
          { n: 'Modified tabs', s: ['c/ModifiedTabs'] },
          { n: 'Options tile', s: ['c/OptionsTile'] },
          { n: 'Page header', s: ['c/PageHeader'] },
          { n: 'Side panel', s: ['c/SidePanel'] },
          { n: 'Tearsheet', s: ['c/Tearsheet', 'c/TearsheetNarrow'] },
          { n: 'DataSpreadsheet', s: ['c/DataSpreadsheet'] },
          { n: 'Datagrid', s: ['c/Datagrid'] }
        ]
      },
      {
        n: 'Patterns',
        s: [
          { n: 'Add Select', s: ['c/SingleAddSelect', 'c/MultiAddSelect'] },
          { n: 'About modal', s: ['c/AboutModal'] },
          {
            n: 'Create flows',
            s: [
              'c/CreateFullPage',
              'c/CreateModal',
              'c/CreateTearsheet',
              'c/CreateTearsheetNarrow',
              'c/CreateSidePanel'
            ]
          },
          {
            n: 'Edit and update',
            s: ['c/InlineEdit', 'c/EditSidePanel']
          },
          {
            n: 'Empty state',
            s: [
              'c/EmptyState',
              'c/ErrorEmptyState',
              'c/NoDataEmptyState',
              'c/NoTagsEmptyState',
              'c/NotFoundEmptyState',
              'c/NotificationsEmptyState',
              'c/UnauthorizedEmptyState'
            ]
          },
          { n: 'Export', s: ['c/ExportModal'] },
          { n: 'Generating an API key', s: ['c/APIKeyModal'] },
          {
            n: 'HTTP errors',
            s: ['c/HTTPError403', 'c/HTTPError404', 'c/HTTPErrorOther']
          },
          { n: 'Import and upload', s: ['c/ImportModal'] },
          { n: 'Notifications', s: ['c/NotificationsPanel'] },
          { n: 'Remove', s: ['c/RemoveModal'] },
          { n: 'Saving', s: ['c/Saving'] },
          { n: 'Status icons', s: ['c/StatusIcon'] },
          { n: 'Toolbars', s: ['c/Toolbar'] },
          { n: 'User profile images', s: ['c/UserProfileImage'] },
          { n: 'Web terminal', s: ['c/WebTerminal'] },
          { n: 'Cascade', s: ['c/Cascade'] }
        ]
      },
      {
        n: 'Internal',
        s: [
          'c/ActionBar',
          'c/ActionSet',
          'c/BreadcrumbWithOverflow',
          'c/ButtonMenu',
          'c/ButtonSetWithOverflow',
          'c/CancelableTextEdit',
          'c/ComboButton',
          'c/ExampleComponent',
          'c/TearsheetShell'
        ]
      }
    ]
  },
  {
    n: 'Carbon',
    s: []
  }
  // {
  //   n: 'Security',
  //   s: [
  //     {
  //       n: 'Layout modules',
  //       s: ['a/Library'],
  //     },
  //     { n: 'Layouts', s: [] },
  //     {
  //       n: 'Patterns',
  //       s: [],
  //     },
  //   ],
  // },
  // {
  //   n: 'CD&AI legacy',
  //   s: [
  //     {
  //       n: 'Components',
  //       s: [
  //         'a/ContextHeader:ContextHeader#legacy',
  //         'a/IdeAPIKeyGeneration:IdeAPIKeyGeneration#legacy',
  //         'a/IdeButton:IdeButton#legacy',
  //         'a/IdeCard:IdeCard#legacy',
  //         'a/IdeCreate:IdeCreate#legacy',
  //         'a/IdeDataTable:IdeDataTable#legacy',
  //         'a/IdeEmptyState:IdeEmptyState#legacy',
  //         'a/IdeFilter:IdeFilter#legacy',
  //         'a/IdeHome:IdeHome#legacy',
  //         'a/IdeHTTPErrors:IdeHTTPErrors#legacy',
  //         'a/IdeImporting:IdeImporting#legacy',
  //         'a/IdeNavigation:IdeNavigation#legacy',
  //         'a/IdeRemove:IdeRemove#legacy',
  //         'a/IdeSaving:IdeSaving#legacy',
  //         'a/IdeSideNavMenu:IdeSideNavMenu#legacy',
  //         'a/IdeSlideOverPanel:IdeSlideOverPanel#legacy',
  //         'a/IdeTableToolbarSearch:IdeTableToolbarSearch#legacy',
  //       ],
  //     },
  //   ],
  // },
]

const getEntryDisplayName = (name) => {
  const match = name.match(/.*?\/(?:(.*):(.*)|(.*))/)
  return match[2] ?? match[3]
}

const getEntryPrefixAndComponentName = (name) => {
  const match = name.match(/(?:(.*):(.*)|(.*?\/.*))/)
  return match[1] ?? match[3]
}

const prepend = (elt, arr) => arr && [elt].concat(arr)

// This function takes an s array and component name and returns the
// materialized path of the component name as an array of the nested section
// names, or null if the component name is not found
const getPath = (s, componentAndPrefix, componentName) =>
  s.reduce(
    (found, next) =>
      // if a previous entry has already matched, pass it forward
      found ||
      (typeof next === 'string'
        ? // if this entry is a string, and it matches the component name
      // we're looking for, return it as an array, else return null
        getEntryPrefixAndComponentName(next) === componentAndPrefix
          ? [getEntryDisplayName(next)]
          : null
        : // if this entry is another structure, find the materialized path
      // into it and prepend its name if found and return null otherwise
        prepend(next.n, getPath(next.s, componentAndPrefix, componentName))),
    null
  )

/**
 * Return the storybook path for a component, given the prefix and name of the
 * component. The prefix enables different components with the same name to be
 * included in the storybook structure.
 * @param {string} prefix The prefix for the component.
 * @param {string} componentName The name of the component.
 * @returns The path for the component storybook entry, or null if the
 * component is not listed in the storybook structure.
 */
export const getPathForComponent = (prefix, componentName) =>
  getPath(s, `${prefix}/${componentName}`, componentName)?.join('/')
