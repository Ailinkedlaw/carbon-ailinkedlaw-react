import React, { useEffect } from 'react';
import cx from 'classnames';
import {
  // HeaderMenu,
  HeaderMenuItem,
  HeaderNavigation
} from '@carbon/react'

import {
  HeaderMenu
} from '../carbon-components-react/UIShell'

import PropTypes from 'prop-types';
import root from 'window-or-global';

import { pkg } from '@/settings'


// 内部组件
import HeaderNavContainer from './HeaderNavContainer';
import MegaMenu from './MastheadMegaMenu/MegaMenu';

const stablePrefix = 'dds'
const prefix = 'cds'

/**
 * 标头 L1 组件.
 */
const MastheadL1 = ({ navigationL1, ...rest }) => {
  const className = cx({
    [`${prefix}--masthead__l1`]: true,
  });
  const childLinkChecker = rest.hasCurrentUrl();
  
  useEffect(() => {
    document
      .querySelector(`.${prefix}--header__menu-bar`)
      ?.setAttribute('role', 'menu');
    document.querySelectorAll(`.${prefix}--header__menu-bar li`).forEach(e => {
      e.setAttribute('role', 'menuitem');
      e.querySelector('a').removeAttribute('role');
    });
  }, []);
  
  const mastheadL1Links = navigationL1.map((link, index) => {
    const selectedUrlItem = childLinkChecker && childLinkChecker(link, root.location?.href);
    const autoid = `${stablePrefix}--masthead-${rest.navType}__l1-nav${index}`;
    const selected = rest.selectedMenuItem
      ? link.titleEnglish === rest.selectedMenuItem
      : selectedUrlItem;
    if (link.hasMenu || link.hasMegapanel) {
      return (
        <HeaderMenu
          aria-label={link.title}
          menuLinkName={link.title}
          className={cx({
            [`${prefix}--masthead__megamenu__l1-nav`]: link.hasMegapanel,
          })}
          selected={selected}
          autoId={autoid}
          key={index}>
          {renderNav(link, rest.navType, autoid)}
        </HeaderMenu>
      );
    }
    
    return (
      <HeaderMenuItem
        data-selected={`${!!selected}`}
        href={link.url}
        data-autoid={autoid}
        key={index}>
        {link.title}
      </HeaderMenuItem>
    );
  });
  
  try {
    console.log(rest.platform.url)
  } catch (e) {
    debugger
  }
  
  return (
    <>
      <div className={className}>
        <div className={`${prefix}--masthead__l1-inner-container`}>
          <div
            className={`${prefix}--masthead__l1-name`}
            data-selected={!rest.selectedMenuItem}>
            <span className={`${prefix}--masthead__l1-name-title`}>
              <a href={rest.platform.url}>{rest.platform.name}</a>
            </span>
          </div>
          <HeaderNavContainer>
            <HeaderNavigation
              className={`${prefix}--masthead__l1-nav`}
              aria-label="">
              {mastheadL1Links}
            </HeaderNavigation>
          </HeaderNavContainer>
        </div>
      </div>
    </>
  );
}

/**
 * 循环并呈现标头导航的链接列表
 *
 * @param {object} link 要呈现的链接列表
 * @param {string} navType autoids 的导航类型
 * @param {string} autoid megamenu items/menu items data-autoids的autoid前身
 * @returns {object} JSX object
 */
function renderNav (link, navType, autoid) {
  const navItems = [];
  if (link.hasMegapanel) {
    navItems.push(<MegaMenu key={link.title} data={link} autoid={autoid} />);
  } else {
    link.menuSections.forEach((section, i) => {
      section.menuItems.forEach((item, j) => {
        navItems.push(
          <HeaderMenuItem
            href={item.url}
            data-autoid={`${stablePrefix}--masthead-${navType}__l1-nav${i}-item${j}`}
            key={item.title}>
            {item.title}
          </HeaderMenuItem>
        );
      });
    });
  }
  return navItems;
}

MastheadL1.propTypes = {
  /**
   * 标题（实验性）。
   */
  title: PropTypes.string,
  
  /**
   * 可选标题链接（实验性）
   */
  titleLink: PropTypes.string,
  
  /**
   * 包含标头 l1 导航元素的对象。
   */
  navigationL1: PropTypes.arrayOf(
    PropTypes.shape({
      hasMenu: PropTypes.bool,
      title: PropTypes.string,
      url: PropTypes.string,
      menuSections: PropTypes.arrayOf(
        PropTypes.shape({
          menuItems: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string,
              url: PropTypes.string,
            })
          ),
        })
      ),
    })
  ),
};

MastheadL1.defaultProps = {
  navigationL1: [],
  titleLink: null,
};

export default MastheadL1
