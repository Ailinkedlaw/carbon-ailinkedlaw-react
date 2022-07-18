/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react'

// Carbon and package components we use.
import {
  ComposedModal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Form,
  Button
} from '@carbon/react'

import PropTypes from 'prop-types'
import cx from 'classnames'

import { getDevtoolsProps } from '@/global/js/utils/devtools'
import { pkg } from '@/settings'

const componentName = 'CreateModal'
const blockClass = `${pkg.prefix}--create-modal`

// Custom PropType validator which checks and ensures that the children property has no more than 4 nodes
const isValidChildren =
  () =>
    ({ children }) => {
      if (children && children.length > 4) {
        throw new Error(
          '\'\'CreateModal\' 组件不会将超过 4 个节点作为子节点。' +
          '这是为了确保模态不会溢出。 请删除 1 个或多个节点。'
        )
      }
      return
    }

export let CreateModal = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).
      
      className,
      children,
      onRequestClose,
      onRequestSubmit,
      open,
      title,
      subtitle,
      description,
      secondaryButtonText,
      primaryButtonText,
      disableSubmit,
      selectorPrimaryFocus,
      
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    return (
      <ComposedModal
        {...rest}
        selectorPrimaryFocus={selectorPrimaryFocus}
        className={cx(blockClass, className)}
        {...{ open, ref }}
        aria-label={title}
        size="sm"
        preventCloseOnClickOutside
        onClose={() => {
          onRequestClose?.()
          return false
        }}
        {...getDevtoolsProps(componentName)}
      >
        <ModalHeader title={title} titleClassName={`${blockClass}__title`}>
          {subtitle && <p className={`${blockClass}__subtitle`}>{subtitle}</p>}
        </ModalHeader>
        <ModalBody hasForm>
          {description && (
            <p className={`${blockClass}__description`}>{description}</p>
          )}
          <Form className={`${blockClass}__form`}>{children}</Form>
        </ModalBody>
        <ModalFooter>
          <Button type="button" kind="secondary" onClick={onRequestClose}>
            {secondaryButtonText}
          </Button>
          <Button
            type="submit"
            kind="primary"
            onClick={onRequestSubmit}
            disabled={disableSubmit}
          >
            {primaryButtonText}
          </Button>
        </ModalFooter>
      </ComposedModal>
    )
  }
)

// Return a placeholder if not released and not enabled by feature flag
CreateModal = pkg.checkComponentEnabled(CreateModal, componentName)

CreateModal.propTypes = {
  /**
   * 子项是指模态体内表单内的所有表单项。
   */
  children: isValidChildren(),
  /**
   * 指定要应用于模态根节点的可选类名
   */
  className: PropTypes.string,
  /**
   * CreateModal 的描述用于提供有关模式的更多信息。
   */
  description: PropTypes.node.isRequired,
  /**
   * 指定用于禁用或启用主按钮的布尔值。
   * 这对于表单验证很重要返回 `true` 可防止在完成必填字段之前单击主按钮。
   */
  disableSubmit: PropTypes.bool,
  /**
   * 指定在 CreateModal 关闭时调用的可选处理程序。
   */
  onRequestClose: PropTypes.func,
  /**
   * 指定按下 CreateModal 主按钮时调用的可选处理程序。
   */
  onRequestSubmit: PropTypes.func,
  /**
   * 指定 CreateModal 是否打开。
   */
  open: PropTypes.bool,
  /**
   * 指定模式中主按钮的文本。
   */
  primaryButtonText: PropTypes.string.isRequired,
  /**
   * 指定模式中辅助按钮的文本。
   */
  secondaryButtonText: PropTypes.string.isRequired,
  /**
   * 指定模式中辅助按钮的文本。
   */
  selectorPrimaryFocus: PropTypes.node.isRequired,
  /**
   * CreateModal 的副标题是可选的，用于提供有关模式的更多信息。
   */
  subtitle: PropTypes.node,
  /**
   * CreateModal 的标题通常是产品或服务名称。
   */
  title: PropTypes.node.isRequired
}

CreateModal.displayName = componentName
