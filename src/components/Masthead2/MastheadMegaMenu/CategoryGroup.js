/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowRight } from '@carbon/icons-react';
import LinkWithIcon from '../../LinkWithIcon';

import PropTypes from 'prop-types';
import React from 'react';

const prefix = 'cds'

/**
 * Category Group of the MegaMenu
 * contains the category headline and sublinks
 */
const CategoryGroup = ({ href, title, children, ...rest }) => (
  <div className={`${prefix}--masthead__megamenu__category-group`}>
    <div className={`${prefix}--masthead__megamenu__category-group-shield`}>
      <div className={`${prefix}--masthead__megamenu__category-group-content`}>
        {href ? (
          // <a
          //   href={href}
          //   className={`${prefix}--masthead__megamenu__category-headline`}
          //   data-autoid={`${rest.autoid}-list${rest.index}`}>
          //   <span>{title}</span>
          //   <ArrowRight />
          // </a>
          <LinkWithIcon
            href={href}
            className={`${prefix}--masthead__megamenu__category-headline`}
            data-autoid={`${rest.autoid}-list${rest.index}`}>
            <span>{title}</span>
            <ArrowRight size={16} />
          </LinkWithIcon>
        ) : (
          <div
            className={`${prefix}--masthead__megamenu__category-headline`}
            data-autoid={`${rest.autoid}-list${rest.index}`}>
            <p>{title}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  </div>
);

CategoryGroup.propTypes = {
  /**
   * Category Groups sublinks
   */
  children: PropTypes.node,

  /**
   * url of the Category Group headline
   */
  href: PropTypes.string,

  /**
   * Category Group headline title
   */
  title: PropTypes.string.isRequired,
};

export default CategoryGroup;
