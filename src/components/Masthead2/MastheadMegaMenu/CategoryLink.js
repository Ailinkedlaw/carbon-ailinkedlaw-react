/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ArrowRight } from '@carbon/icons-react';
import { Link } from '@carbon/react';
import PropTypes from 'prop-types';
import React from 'react';

const prefix = 'cds'

/**
 * Category sublink
 */
const CategoryLink = ({ href, title, highlighted, ...rest }) => {
  return (
    <>
      {highlighted ? (
        <Link
          className={`${prefix}--masthead__megamenu__category-sublink--highlighted`}
          href={href}
          renderIcon={ArrowRight}>
          <span>{title}</span>
        </Link>
      ) : (
        <a
          tabIndex={0}
          href={href}
          className={`${prefix}--masthead__megamenu__category-sublink`}
          data-autoid={`${rest.autoid}-item${rest.index}`}>
          {title}
        </a>
      )}
    </>
  );
};

CategoryLink.propTypes = {
  /**
   * Category sublink href
   */
  href: PropTypes.string.isRequired,

  /**
   * Category sublink text
   */
  title: PropTypes.string.isRequired,

  /**
   * Determines whether to render regular link style or link with icon
   */
  highlighted: PropTypes.bool,
};

export default CategoryLink;
