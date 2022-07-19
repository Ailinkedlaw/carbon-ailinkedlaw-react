//
// Copyright IBM Corp. 2021, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import { Link, Tag, Popover, PopoverContent } from '@carbon/react'
import { useClickOutside } from '../../global/js/hooks'

import { pkg } from '../../settings'

const componentName = 'TagSetOverflow'
const blockClass = `${pkg.prefix}--tag-set-overflow`

// Default values for props
const defaults = {
  allTagsModalSearchThreshold: 10,
  overflowAlign: 'bottom',
}

export const TagSetOverflow = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      allTagsModalSearchThreshold = defaults.allTagsModalSearchThreshold,
      className,
      onShowAllClick,
      overflowAlign = defaults.overflowAlign,
      overflowTags,
      showAllTagsLabel,

      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const localRef = useRef()
    const overflowTagContent = useRef(null)

    useClickOutside(ref || localRef, () => {
      if (popoverOpen) {
        setPopoverOpen(false)
      }
    })

    const handleShowAllTagsClick = (ev) => {
      ev.stopPropagation()
      ev.preventDefault()
      setPopoverOpen(false)
      onShowAllClick()
    }

    const handleEscKeyPress = (event) => {
      const { key } = event
      if (key === 'Escape') {
        setPopoverOpen(false)
      }
    }

    return (
      <span
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        aria-hidden={overflowTags.length === 0}
        className={cx(`${blockClass}`, {
          [`${blockClass}--hidden`]: overflowTags.length === 0,
        })}
        ref={ref || localRef}
      >
        <Popover
          align={overflowAlign}
          className={cx(className, `${blockClass}__tagset-popover`)}
          dropShadow
          highContrast
          onKeyDown={handleEscKeyPress}
          open={popoverOpen}
        >
          <Tag
            onClick={() => setPopoverOpen(!popoverOpen)}
            className={cx(`${blockClass}__popover-trigger`)}
          >
            +{overflowTags.length}
          </Tag>
          <PopoverContent>
            <div ref={overflowTagContent} className={`${blockClass}__content`}>
              <ul className={`${blockClass}__tag-list`}>
                {overflowTags
                  .filter((_, index) =>
                    overflowTags.length > allTagsModalSearchThreshold
                      ? index < allTagsModalSearchThreshold
                      : index <= allTagsModalSearchThreshold
                  )
                  .map((tag, index) => (
                    <li className={`${blockClass}__tag-item`} key={index}>
                      {React.cloneElement(tag, { filter: false })}
                    </li>
                  ))}
              </ul>
              {overflowTags.length > allTagsModalSearchThreshold && (
                <Link
                  className={`${blockClass}__show-all-tags-link`}
                  href=""
                  onClick={handleShowAllTagsClick}
                  role="button"
                >
                  {showAllTagsLabel}
                </Link>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </span>
    )
  }
)

TagSetOverflow.displayName = componentName

TagSetOverflow.propTypes = {
  /**
   * count of overflowTags over which a modal is offered
   */
  allTagsModalSearchThreshold: PropTypes.number,
  /**
   * className
   */
  className: PropTypes.string,
  /**
   * function to execute on clicking show all
   */
  onShowAllClick: PropTypes.func.isRequired,
  /**
   * overflowAlign from the standard tooltip
   */
  overflowAlign: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'left-bottom',
    'left-top',
    'right',
    'right-bottom',
    'right-top',
  ]),
  /**
   * tags shown in overflow
   */
  overflowTags: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * label for the overflow show all tags link
   */
  showAllTagsLabel: PropTypes.string,
}
