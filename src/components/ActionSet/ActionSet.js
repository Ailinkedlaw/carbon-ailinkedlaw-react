/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react'

// Other standard imports.
import PropTypes from 'prop-types'
import cx from 'classnames'
import { pkg } from '@/settings'
import { allPropTypes } from '@/global/js/utils/props-helper'

// Carbon and package components we use.
import { Button, ButtonSet, InlineLoading } from '@carbon/react'

const blockClass = `${pkg.prefix}--action-set`
const componentName = 'ActionSet'

// NOTE: the component SCSS is not imported here: it is rolled up separately.

const ActionSetButton = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).
      className,
      disabled,
      kind,
      label,
      loading,
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => (
    <Button
      {
        // Pass through any other property values as HTML attributes.
        ...rest
      }
      isExpressive
      className={cx(className, [
        `${blockClass}__action-button`,
        {
          [`${blockClass}__action-button--ghost`]:
          kind === 'ghost' || kind === 'danger--ghost'
        }
      ])}
      disabled={disabled || loading || false}
      {...{ kind, ref }}
    >
      {label}
      {loading && <InlineLoading />}
    </Button>
  )
)

ActionSetButton.displayName = 'ActionSetButton'

ActionSetButton.propTypes = {
  ...Button.propTypes,
  kind: PropTypes.oneOf([
    'ghost',
    'danger--ghost',
    'secondary',
    'danger',
    'primary'
  ]),
  label: PropTypes.string,
  loading: PropTypes.bool
}

const defaultKind = 'primary'

const willStack = (size, numberOfActions) =>
  size === 'sm' || (size === 'md' && numberOfActions > 2)

// Default values for props
const defaults = {
  size: 'md'
}

/**
 * ActionSet 呈现一组动作按钮，由一组 prop 值构成并应用一些布局规则。
 * 当大小为“sm”时，按钮是堆叠的，并且应该只包括主要和次要类型。
 * 当大小为“md”时，如果按钮有三个或更多，则堆叠。 当大小为 'md' 或 'lg' 时，两个按钮共享水平空间。
 * 当大小为“lg”时，三个或更多按钮使用可用水平空间的四分之一，
 * 如果大小为“xlg”或“max”，则按钮始终使用可用水平空间的四分之一。
 * 如果有幻影按钮，它会出现在左侧。 如果有一个主按钮，它会出现在右侧。
 *
 * ### 引用方法
 *
 *
 * ~~~js
 * import { ActionSet } from 'carbon-ailinkedlaw-react'
 * ~~~
 */
export const ActionSet = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).
      
      actions,
      buttonSize,
      className,
      size = defaults.size,
      
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const buttons = (actions && actions.slice?.(0)) || []
    
    // We stack the buttons in a sm set, or if there are three or more in a md set.
    const stacking = willStack(size, buttons.length)
    
    // Order of button kinds: ghost first, then danger--ghost, then most other types,
    // then danger, and finally primary
    const buttonOrder = (kind) =>
      ({
        ghost: 1,
        'danger--ghost': 2,
        danger: 4,
        primary: 5
      }[kind] ?? 3)
    
    // order the actions with ghost/ghost-danger buttons first and primary/danger buttons last
    // (or the opposite way if we're stacking)
    buttons.sort(
      (action1, action2) =>
        (buttonOrder(action1.kind || defaultKind) -
          buttonOrder(action2.kind || defaultKind)) *
        (stacking ? -1 : 1)
    )
    
    return (
      <ButtonSet
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass,
          className,
          {
            [`${blockClass}--row-single`]: !stacking && buttons.length === 1,
            [`${blockClass}--row-double`]: !stacking && buttons.length === 2,
            [`${blockClass}--row-triple`]: !stacking && buttons.length === 3,
            [`${blockClass}--row-quadruple`]: !stacking && buttons.length >= 4,
            [`${blockClass}--stacking`]: stacking
          },
          `${blockClass}--${size}`
        )}
        ref={ref}
        role="presentation"
        stacked={stacking}
      >
        {buttons.map((action, index) => (
          <ActionSetButton
            key={action.key || index}
            {...action}
            size={buttonSize}
          />
        ))}
      </ButtonSet>
    )
  }
)

ActionSet.displayName = componentName

/**
 * A validator function to help validate the actions supplied for a particular
 * size of component. When the size is sm, or md with three actions, the
 * buttons will be stacked and a maximum of three buttons is applied with no
 * ghosts unless the ghost is the only button. Otherwise a maximum of four
 * buttons with a maximum of one ghost is applied. In either case, a maximum
 * of one primary button is allowed.
 * @param sizeFn An optional function which will be passed all the props and
 * returns the size that the component should be treated as being: if not
 * provided, a 'size' prop is used to determine the size of the component.
 * @returns null if the actions meet the requirements, or an Error object with
 * an explanatory message.
 */
ActionSet.validateActions =
  (sizeFn) => (props, propName, componentName, location, propFullName) => {
    const name = propFullName || propName
    const prop = props[name]
    const actions = prop && prop?.length
    const problems = []
    
    if (actions > 0) {
      // eslint-disable-next-line react/prop-types
      const size = sizeFn ? sizeFn(props) : props.size || defaults.size
      const stacking = willStack(size, actions)
      
      const countActions = (kind) => prop.filter((action) => (action.kind || defaultKind) === kind).length
      
      const primaryActions = countActions('primary')
      const secondaryActions = countActions('secondary')
      const dangerActions = countActions('danger')
      const ghostActions = countActions('ghost') + countActions('danger--ghost')
      
      stacking &&
      actions > 3 &&
      problems.push(
        `you cannot have more than three actions in this size of ${componentName}`
      )
      
      actions > 4 &&
      problems.push(
        `you cannot have more than four actions in a ${componentName}`
      )
      
      primaryActions > 1 &&
      problems.push(
        `you cannot have more than one 'primary' action in a ${componentName}`
      )
      
      ghostActions > 1 &&
      problems.push(
        `you cannot have more than one 'ghost' action in a ${componentName}`
      )
      
      stacking &&
      actions > 1 &&
      ghostActions > 0 &&
      problems.push(
        `you cannot have a 'ghost' button in conjunction with other action types in this size of ${componentName}`
      )
      
      actions >
      primaryActions + secondaryActions + dangerActions + ghostActions &&
      problems.push(
        `you can only have 'primary', 'danger', 'secondary', 'ghost' and 'danger--ghost' buttons in a ${componentName}`
      )
    }
    
    return problems.length > 0
      ? new Error(
        `Invalid ${location} \`${name}\` supplied to \`${componentName}\`: ${problems.join(
          ', and '
        )}.`
      )
      : null
  }

ActionSet.propTypes = {
  /**
   * 要显示的操作按钮。
   * 每个动作都被指定为一个对象，带有可选字段“label”提供按钮标签，
   * “kind”选择按钮类型（必须是“primary”、“secondary”或“ghost”），
   * “loading”显示加载 指示器和“onClick”以在单击按钮时接收通知。
   * 对象中的其他字段将传递给 Button 组件，这些字段可以包括 'disabled'、'ref'，
   * 对象将作为 HTML 属性传递给按钮元素。
   * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  actions: allPropTypes([
    ActionSet.validateActions(),
    PropTypes.arrayOf(
      PropTypes.shape({
        ...Button.propTypes,
        kind: PropTypes.oneOf([
          'ghost',
          'danger--ghost',
          'secondary',
          'danger',
          'primary'
        ]),
        label: PropTypes.string,
        loading: PropTypes.bool,
        // we duplicate this Button prop to improve the DocGen here
        onClick: Button.propTypes.onClick
      })
    )
  ]),
  
  /**
   * The size of buttons to use for the actions. The allowed values are
   * those for the size prop of carbon Button. If this prop is specified, all
   * the buttons will be set to this size, overriding any 'size' values (if any)
   * supplied in the actions array (if any).
   */
  buttonSize: Button.propTypes.size,
  
  /**
   * An optional class or classes to be added to the outermost element.
   */
  className: PropTypes.string,
  
  /**
   * The size of the action set. Different button arrangements are used at
   * different sizes, to make best use of the available space.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl'])
}
