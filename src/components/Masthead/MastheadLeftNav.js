/* eslint-disable react/jsx-no-duplicate-props */
/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import {
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SideNavMenuItem,
  // SideNavMenu
} from '@carbon/react'

import {
  SideNavMenu,
  SideNavMenuSection
} from '../carbon-components-react/UIShell'

// import {} from '../carbon-components-react/UIShell'

import PropTypes from 'prop-types';
import root from 'window-or-global';

// 内部组件
// import SideNavMenuSection from '../SideNavMenuSection'

const stablePrefix = 'dds'
const prefix = 'cds'

/**
 * 标头广告左侧导航组件.
 */
const MastheadLeftNav = ({
  backButtonText,
  navigation,
  isSideNavExpanded,
  platform,
  ...rest
}) => {
  /**
   * 检查菜单项的子 url 是否与当前 url 路径匹配，如果匹配则返回菜单项及其子项将为整个菜单项层次结构设置选定状态
   * @returns {object} selectedItems
   */
  // eslint-disable-next-line class-methods-use-this
  const _selectedLeftNavItems = () => {
    let matchFound = false;
    const selectedItems = { level0: '', level1: '', level2: '' };

    return ({
      menu = [
        { url: '', megapanelContent: { quickLinks: { links: [{ url: '' }] } } },
      ],
      key = '',
      parentItemUrl = '',
    }) => {
      const currentUrlPath = root.location?.href;
      if (!matchFound) {
        if (parentItemUrl === currentUrlPath) {
          selectedItems.level0 = `${key}`;
          matchFound = true;
        }
        // check if child url matches current url path
        else {
          for (let i = 0; i < menu?.length; i++) {
            if (menu[i]?.url === currentUrlPath) {
              selectedItems.level0 = `${key}`;
              selectedItems.level1 = `${key}-${i}`;
              matchFound = true;
              break;
            } else {
              const links = menu[i]?.megapanelContent?.quickLinks?.links;
              for (let k = 0; k < links?.length; k++) {
                if (links[k]?.url === currentUrlPath) {
                  selectedItems.level0 = `${key}`;
                  selectedItems.level1 = `${key}-${i}`;
                  selectedItems.level2 = `${key}-${i}-${k}`;
                  matchFound = true;
                  break;
                }
              }
            }
          }
        }
        return selectedItems;
      }
      return selectedItems;
    }
  }

  const selectedUrlCheck = _selectedLeftNavItems();

  /**
   * 跟踪哪个菜单部分可见/展开，并将当前可见面板与其父菜单面板联系起来
   *
   * Example interaction and menuState change:
   * 1. When left nav is first opened - default state --> {level0: -1, level1: -1}
   * 2. User then clicks on first menu item (item index is 0) --> {level0: 0, level1: -1}
   * 3. User then clicks on second menu item (item index is 1) of current visible panel --> {level0: 0, level1: 1}
   * 4. User then clicks back button --> {level0: 0, level1: -1}
   * 5. User then clicks back button again, going back to first panel --> {level0: -1, level1: -1}
   */
  const [menuState, setMenuState] = useState({ level0: -1, level1: -1 });

  // reset the left nav to default menu section when closed
  useEffect(() => {
    if (!isSideNavExpanded) {
      setMenuState({ level0: -1, level1: -1 });
    }
  }, [isSideNavExpanded]);

  const sideNavRef = useRef();

  const level0Items = [];
  const level1Items = [];

  const sideNav = () => {
    let selectedItems;
    navigation.map((link, i) => {
      const dataTitle = link.titleEnglish
        ? link.titleEnglish
          .replace(/[^-a-zA-Z0-9_ ]/g, '')
          .replace(/ +/g, '-')
          .toLowerCase()
        : null;

      const autoid = `${stablePrefix}--masthead-${rest.navType}-sidenav__${rest.hasL1Data ? 'l1' : 'l0'}-nav${i}`;

      const menuItems = link.menuSections?.[0]?.menuItems;
      // const menuItems = link.children || [];
      selectedItems = selectedUrlCheck({ menu: menuItems, key: i, parentItemUrl: link.url });


      if (link.children) {

        level1Items.push({
          title: link.title,
          autoid,
          parentKey: i,
          sections: link.children ? link.children : []// link.menuSections,
        });

        level0Items.push(
          <SideNavMenu
            autoid={autoid}
            dataTitle={dataTitle}
            key={link.title}
            title={link.title}
            selected={!rest.selectedMenuItem ? selectedItems?.level0 === `${i}` : rest.selectedMenuItem === link.titleEnglish}
            onToggle={() => setMenuState({ ...menuState, level0: i })}
            isSideNavExpanded={i === menuState.level0 && menuState.level1 == -1}
          />
        );
      } else {
        level0Items.push(
          <SideNavMenuItem
            href={link.url}
            className={
              ((!rest.selectedMenuItem
                ? selectedItems?.level0 === `${i}`
                : rest.selectedMenuItem === link.titleEnglish) &&
                `${prefix}--masthead__side-nav--submemu--selected`) ||
              null
            }
            data-autoid={autoid}
            key={link.title}
            role="menuitem">
            {link.title}
          </SideNavMenuItem>
        );
      }
    });

    const level1 = _renderLevel1Submenus(
      level1Items,
      backButtonText,
      setMenuState,
      menuState,
      rest.navType,
      rest.selectedMenuItem,
      selectedItems
    );

    const level2Submenus = _renderLevel2Submenus(
      level1.submenus,
      backButtonText,
      setMenuState,
      menuState,
      rest.navType,
      rest.selectedMenuItem,
      selectedItems
    );

    return (
      <div>
        <SideNavMenuSection
          id={'panel__(-1,-1)'}
          focusNode={sideNavRef.current?.parentNode.querySelector(`.${prefix}--header__menu-toggle`)}
          show={menuState.level0 === -1}>
          {level0Items}
        </SideNavMenuSection>
        {level1.menuSections}
        {level2Submenus}
      </div>
    )
  }


  return (
    <SideNav
      aria-label="Side navigation"
      expanded={isSideNavExpanded}
      isPersistent={false}
      ref={sideNavRef}
      onOverlayClick={rest.onOverlayClick}>
      <nav
        data-autoid={`${stablePrefix}--masthead-${rest.navType}-sidenav__l0`}>
        {platform && (
          <a
            data-autoid={`${stablePrefix}--masthead-${rest.navType}-sidenav__l0-productname`}
            href={platform.url}
            aria-haspopup="true"
            className={cx(
              `${prefix}--side-nav__submenu`,
              `${prefix}--side-nav__submenu-platform`
            )}>
            {platform.name}
          </a>
        )}
        <SideNavItems>
          <HeaderSideNavItems>{sideNav()}</HeaderSideNavItems>
        </SideNavItems>
      </nav>
    </SideNav>
  )
}

/**
 * 循环并呈现侧面导航的链接列表
 *
 * @param {Array} menuItems 菜单项
 * @param {string} backButtonText 后退按钮文字
 * @param {Function} setMenuState 设置状态函数
 * @param {object} menuState 当前可见的菜单
 * @param {string} navType 导航类型
 * @param {string} selectedMenuItem 输入选定的菜单项
 * @param {object} selectedItems 基于 url 选择的菜单项
 *
 * @returns {object} JSX object
 */
function _renderLevel1Submenus (
  menuItems,
  backButtonText,
  setMenuState,
  menuState,
  navType,
  selectedMenuItem,
  selectedItems
) {
  // gather submenu items for next level
  const submenus = [];

  const sideNavMenuSections = menuItems.map((menu, i) => {
    // get array of highlighted menu items to render first
    let highlightedItems = [];
    const items = [];


    menu.sections.forEach(item => {
      if (item.highlighted) {
        return highlightedItems.push(item);
      }
      return items.push(item);
    });

    const sortedMenu = highlightedItems.concat(items);
    const highlightedCount = highlightedItems.length;

    return (
      <SideNavMenuSection
        isSubmenu
        className={cx({
          [`${prefix}--side-nav__menu-section-submenu`]: true,
          [`${prefix}--side-nav__menu-section-submenu--expanded`]:
            menuState.level0 === menu.parentKey && menuState.level1 >= 0,
        })}
        id={`panel__(${menu.parentKey},-1)`}
        // heading={menu.sections?.[0]?.heading}
        key={menu.title}
        title={menu.title}
        navType={navType}
        backButtonText={backButtonText}
        onBackClick={() => setMenuState({ level0: -1, level1: -1 })}
        show={menuState.level0 === menu.parentKey && menuState.level1 === -1}>
        {sortedMenu.map((item, index) => {
          submenus.push({
            title: item.title,
            titleUrl: item.url,
            autoid: `${menu.autoid}-list${index}`,
            sections: item.children,   // item.megapanelContent?.quickLinks?.links,
            parentKey: menu.parentKey,
            index,
          });

          const highlightedClass =
            (highlightedCount !== 0 &&
              index + 1 === highlightedCount &&
              `${prefix}--masthead__side-nav__last-highlighted`) ||
            null;

          // console.log('_renderLevel1Submenus', item)
          // item.megapanelContent

          if (item.children) {
            return (
              <SideNavMenu
                autoid={`${menu.autoid}-list${index}`}
                title={item.title}
                key={item.title}
                selected={
                  !selectedMenuItem &&
                  selectedItems?.level1 === `${menu.parentKey}-${index}`
                }
                className={highlightedClass}
                onToggle={() => setMenuState({ ...menuState, level1: index })}
                isSideNavExpanded={i === menuState.level0 && menuState.level1 == index}
              />
            );
          }

          return (
            <SideNavMenuItem
              href={item.url}
              data-autoid={`${menu.autoid}-list${index}`}
              key={item.title}
              className={
                (!selectedMenuItem &&
                  selectedItems?.level1 === `${menu.parentKey}-${index}` &&
                  `${prefix}--masthead__side-nav--submemu--selected`) ||
                null
              }
              role="menuitem">
              {item.title}
            </SideNavMenuItem>
          );
        })}
      </SideNavMenuSection>
    );
  });

  return { menuSections: sideNavMenuSections, submenus };
}

/**
 * 循环并呈现侧面导航的链接列表
 *
 * @param {Array} menuItems menu items
 * @param {string} backButtonText back button text
 * @param {Function} setMenuState setState func
 * @param {object} menuState currrent menu that is visible
 * @param {string} navType navigation type
 * @param {string} selectedMenuItem inputted selected menu item
 * @param {object} selectedItems selected menu items based on url
 *
 * @returns {object} JSX object
 */
function _renderLevel2Submenus (
  menuItems,
  backButtonText,
  setMenuState,
  menuState,
  navType,
  selectedMenuItem,
  selectedItems
) {


  const sideNavMenuSections = menuItems.map(menu => {
    return (
      <SideNavMenuSection
        isSubmenu
        className={`${prefix}--side-nav__menu-section-submenu`}
        id={`panel__(${menu.parentKey},${menu.index})`}
        key={menu.title}
        title={menu.title}
        titleUrl={menu.titleUrl}
        navType={navType}
        backButtonText={backButtonText}
        onBackClick={() => setMenuState({ ...menuState, level1: -1 })}
        show={
          menuState.level0 === menu.parentKey && menuState.level1 === menu.index
        }>
        {menu.sections && menu.sections.map((item, k) => {
          return (
            <SideNavMenuItem
              href={item.url}
              data-autoid={`${menu.autoid}-item${k}`}
              key={item.title}
              className={
                (!selectedMenuItem &&
                  selectedItems?.level2 ===
                  `${menu.parentKey}-${menu.index}-${k}` &&
                  `${prefix}--masthead__side-nav--submemu--selected`) ||
                null
              }
              role="menuitem">
              {item.title}
            </SideNavMenuItem>
          );
        })}
      </SideNavMenuSection>
    );
  });

  return sideNavMenuSections;
}

MastheadLeftNav.propTypes = {
  /**
   * Back button text
   */
  backButtonText: PropTypes.string,

  /**
   * Object containing left navigation elements.
   */
  navigation: PropTypes.arrayOf(
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
  /**
   * `true` to make the sidenav expanded.
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * Platform object with name and url
   */
  platform: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};

MastheadLeftNav.defaultProps = {
  backButtonText: 'Back',
};

export default MastheadLeftNav
