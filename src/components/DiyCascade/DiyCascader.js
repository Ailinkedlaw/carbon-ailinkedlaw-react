/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable prefer-destructuring */
/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React, { Component, useState, useEffect } from 'react';
import classNames from 'classnames';
import ClickListener from '@/global/js/utils/internal/ClickListener';
import FloatingMenu, {
  DIRECTION_TOP,
  DIRECTION_BOTTOM,
  DIRECTION_RIGHT,
} from '@/global/js/utils/internal/FloatingMenu';
import { OverflowMenuVertical } from '@carbon/icons-react';
import { keys, matches as keyCodeMatches } from '@/global/js/utils/internal/keyboard';
import mergeRefs from '@/global/js/utils/tools/mergeRefs';
import { PrefixContext } from '@/global/js/utils/internal/usePrefix';
import * as FeatureFlags from '@carbon/feature-flags';
//
import {Checkbox, Tag } from '@carbon/react';
import { CaretRight, Search, Close } from '@carbon/icons-react';
import _, { forEach } from 'lodash';
import './_DiyCascader.scss';

const on = (element, ...args) => {
  element.addEventListener(...args);
  return {
    release() {
      element.removeEventListener(...args);
      return null;
    },
  };
};

/**
 * The CSS property names of the arrow keyed by the floating menu direction.
 * 以浮动菜单方向为键的箭头的 CSS 属性名称
 * @type {object<string, string>}
 */
const triggerButtonPositionProps = {
  [DIRECTION_TOP]: 'bottom',
  [DIRECTION_BOTTOM]: 'top',
  [DIRECTION_RIGHT]: 'right',
};

/**
 * Determines how the position of arrow should affect the floating menu position.
 * 确定箭头的位置应如何影响浮动菜单位置。
 * @type {object<string, number>}
 */
const triggerButtonPositionFactors = {
  [DIRECTION_TOP]: -2,
  [DIRECTION_BOTTOM]: -1,
  [DIRECTION_RIGHT]: -1,
};

/**
 * @param {Element} menuBody The menu body with the menu arrow. 带有菜单箭头的菜单主体。
 * @param {string} direction The floating menu direction. 浮动菜单方向。
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 *                                浮动菜单位置的调整，根据菜单箭头的位置
 * @private
 */
export const getMenuOffset = (menuBody, direction, trigger, flip) => {
  const triggerButtonPositionProp = triggerButtonPositionProps[direction];
  const triggerButtonPositionFactor = triggerButtonPositionFactors[direction];

  const __DEV__ = true;

  if (__DEV__) {
    invariant(
      triggerButtonPositionProp && triggerButtonPositionFactor,
      '[OverflowMenu] wrong floating menu direction: `%s`',
      direction
    );
  }
  const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menuBody;

  switch (triggerButtonPositionProp) {
    case 'top':
    case 'bottom': {
      // TODO: Ensure `trigger` is there for `<OverflowMenu open>`
      const triggerWidth = !trigger ? 0 : trigger.offsetWidth;
      return {
        left: (!flip ? 1 : -1) * (menuWidth / 2 - triggerWidth / 2),
        top: 0,
      };
    }
    case 'left':
    case 'right': {
      // TODO: Ensure `trigger` is there for `<OverflowMenu open>`
      const triggerHeight = !trigger ? 0 : trigger.offsetHeight;
      return {
        left: 0,
        top: (!flip ? 1 : -1) * (menuHeight / 2 - triggerHeight / 2),
      };
    }

    default:
      break;
  }
};

class DiyCascader extends Component {
  // eslint-disable-next-line react/sort-comp
  state = {
    optionList: [],
    bindKeys: [],
    inputText: '',
    isNull: false,
    showCheckedItem: [],
  };

  // #region 参数
  static propTypes = {
    /**
     * 模式
     */
    mode: PropTypes.oneOf(['single','multiple']),
    /**
     * values
     */
    values: PropTypes.array,
    /**
     * 数据源
     */
    options: PropTypes.array.isRequired,
    /**
     * hover：移入展开  click：点击展开
     */
    expandTrigger: PropTypes.string,
    
    /**
     * The ARIA label.
     */
    ariaLabel: FeatureFlags.enabled('enable-v11-release')
      ? PropTypes.string
      : PropTypes.string,

    /**
     * The element ID.
     */
    id: PropTypes.string,

    
  };
  // #endregion

  // eslint-disable-next-line react/sort-comp
  static contextType = PrefixContext;

  // #region 参数默认值
  static defaultProps = {
    ariaLabel: FeatureFlags.enabled('enable-v11-release')
      ? null
      : 'open and close list of options',
    iconDescription: 'open and close list of options',
    open: false,
    direction: DIRECTION_BOTTOM,
    flipped: false,
    focusTrap: true,
    renderIcon: OverflowMenuVertical,
    onClick: () => {},
    onKeyDown: () => {},
    onClose: () => {},
    onOpen: () => {},
    menuOffset: getMenuOffset,
    menuOffsetFlip: getMenuOffset,
    selectorPrimaryFocus: '[data-overflow-menu-primary-focus]',
    // diy
    mode: 'single',
    expandTrigger: 'click', //  
  };
  // #endregion

  //
  flatArray = [];
  // 勾选项
  checkedItems = [];

  // #region 默认的

  /**
   * The handle of `onfocusin` or `focus` event handler.
   * @private
   */
  _hFocusIn = null;

  /**
   * The timeout handle for handling `blur` event.
   * @private
   */
  _hBlurTimeout;

  /**
   * The element ref of the tooltip's trigger button.
   * @type {React.RefObject<Element>}
   * @private
   */
  _triggerRef = React.createRef();

  componentDidUpdate(_, prevState) {
    const { onClose } = this.props;
    if (!this.state.open && prevState.open) {
      onClose();
    }
  }

  static getDerivedStateFromProps({ open }, state) {
    const { prevOpen } = state;
    return prevOpen === open
      ? null
      : {
          open,
          prevOpen: open,
        };
  }

  componentWillUnmount() {
    if (typeof this._hBlurTimeout === 'number') {
      clearTimeout(this._hBlurTimeout);
      this._hBlurTimeout = undefined;
    }
  }

  componentDidMount() {
    const { values, mode } = this.props;
    this.flatArray = this.flatten(this.props.options);
    //
    if (mode === 'single' && values && values.length > 0) {
      let binds = [
        {
          level: 1,
          selected: values?.length > 0 ? values[0] : '',
          childer: [],
        },
      ];
      binds[0].childer = this.props.options.map((item) => {
        return item;
      });
      const { inputText, uls } = this.getOptionLabelByKeys(values);
      binds = [...binds, ...uls];

      this.setState({ bindKeys: values, inputText, optionList: binds });
    }
    // 多选处理
    if (mode === 'multiple' && values && values.length > 0) {
      this.checkedItems = values.map((m) => {
        return { key: m, checkedState: 'checked' };
      });
      const list = this.flatArray.filter((f) => values.includes(f.value));
      let showList = [];
      list.map((cur) => {
        // 子集选项处理
        const allChilds = this.flatten(cur?.childer || []);
        showList.concat(allChilds);
        if (cur?.childer) {
          this.checkedItems.concat(
            allChilds.map((m) => {
              return this.renewCheckedItems(m.value, 'checked');
            })
          );
        }
        // 父集选项处理
        if (cur.parent) {
          const parts = this.findFathers(cur.parent).map((m) => {
            return { key: m, checkedState: 'part' };
          });
          this.checkedItems = [...this.checkedItems, ...parts];
        }
      });

      this.setState({ showCheckedItem: [...showList, ...list] });
    }
  }

  handleClick = (evt) => {
    evt.stopPropagation();
    if (!this._menuBody || !this._menuBody.contains(evt.target)) {
      const open = !this.state.open;
      this.setState({ open });
      this.props.onClick(evt);
      //
      if (open) {
        this.init();
      }
    }
  };

  handleKeyDown = (evt) => {
    if (keyCodeMatches(evt, [keys.ArrowDown])) {
      this.setState({ open: !this.state.open });
      this.props.onClick(evt);
    }
  };

  handleKeyPress = (evt) => {
    if (
      this.state.open &&
      keyCodeMatches(evt, [
        keys.ArrowUp,
        keys.ArrowRight,
        keys.ArrowDown,
        keys.ArrowLeft,
      ])
    ) {
      evt.preventDefault();
    }

    // Close the overflow menu on escape
    if (keyCodeMatches(evt, [keys.Escape])) {
      let wasOpen = this.state.open;
      this.closeMenu(() => {
        if (wasOpen) {
          this.focusMenuEl();
        }
      });

      // Stop the esc keypress from bubbling out and closing something it shouldn't
      evt.stopPropagation();
    }
  };

  handleClickOutside = (evt) => {
    if (
      this.state.open &&
      (!this._menuBody || !this._menuBody.contains(evt.target))
    ) {
      this.closeMenu();
    }
  };

  closeMenu = (onCloseMenu) => {
    this.setState({ open: false }, () => {
      // Optional callback to be executed after the state as been set to close
      if (onCloseMenu) {
        onCloseMenu();
      }
      this.props.onClose();
    });
  };

  focusMenuEl = () => {
    const { current: triggerEl } = this._triggerRef;
    if (triggerEl) {
      triggerEl.focus();
    }
  };

  /**
   * Handles the floating menu being unmounted or non-floating menu being
   * mounted or unmounted.
   * @param {Element} menuBody The DOM element of the menu body.
   * @private
   */
  _bindMenuBody = (menuBody) => {
    if (!menuBody) {
      this._menuBody = menuBody;
    }
    if (!menuBody && this._hFocusIn) {
      this._hFocusIn = this._hFocusIn.release();
    }
  };

  /**
   * Handles the floating menu being placed.
   * @param {Element} menuBody The DOM element of the menu body.
   * @private
   */
  _handlePlace = (menuBody) => {
    if (menuBody) {
      this._menuBody = menuBody;
      const hasFocusin = 'onfocusin' in window;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      this._hFocusIn = on(
        menuBody.ownerDocument,
        focusinEventName,
        (event) => {
          const target = ClickListener.getEventTarget(event);
          const { current: triggerEl } = this._triggerRef;
          if (typeof target.matches === 'function') {
            if (
              !menuBody.contains(target) &&
              triggerEl &&
              !target.matches(
                `.${this.context}--overflow-menu,.${this.context}--overflow-menu-options`
              )
            ) {
              // this.closeMenu();
            }
          }
        },
        !hasFocusin
      );
      this.props.onOpen();
    }
  };

  /**
   * @returns {Element} The DOM element where the floating menu is placed in.
   */
  _getTarget = () => {
    const { current: triggerEl } = this._triggerRef;
    return (
      (triggerEl && triggerEl.closest('[data-floating-menu-container]')) ||
      document.body
    );
  };

  // #endregion

  getValue = () => {
    let ret = [];
    if (this.props.mode === 'multiple') {
      ret = this.checkedItems
        .filter((f) => f.checkedState === 'checked')
        .map((m) => {
          return m.key;
        });
    }else{
      ret = this.state.bindKeys
    }
    return ret;
  };

  /**
   * diy
   */
  init = () => {
    const { bindKeys } = this.state;
    let binds = [
      {
        level: 1,
        selected: bindKeys?.length > 0 ? bindKeys[0] : '',
        childer: [],
      },
    ];
    binds[0].childer = this.props.options.map((item) => {
      return item;
    });

    if (bindKeys && bindKeys.length > 0) {
      const { inputText, uls } = this.getOptionLabelByKeys(bindKeys);
      binds = [...binds, ...uls];
      this.setState({ inputText });
    }

    this.setState({ optionList: binds });
  };

  /**
   * diy 获取选中项
   * @returns label
   */
  getOptionLabelByKeys = (keys) => {
    let ret = { inputText: '', uls: [] };
    const flatList = this.flatArray; // this.flatten(options)

    keys.forEach((item, i) => {
      const cur = flatList.filter((f) => f.value === item);
      ret.inputText += `${cur[0].label}/`;
      if (i > 0) {
        const list = flatList.filter((f) => f.parent === keys[i - 1]);
        let add = { level: i + 1, selected: item, childer: list };
        ret.uls.push(add);
      }
    });
    ret.inputText = ret.inputText.substring(0, ret.inputText.lastIndexOf('/'));
    return ret;
  };
  /**
   * diy 生成面板
   * @returns 面板
   */
  renewPanel = (cur) => {
    const { options } = this.props;
    let newList = this.state.optionList;
    let level = this.recursiveFun(options, cur, 1);
    // console.log(level);
    if (newList.length > level) {
      newList = newList.slice(0, level);
    }
    if (cur?.childer) {
      newList.push({ level: level + 1, selected: '', childer: cur.childer });
    }
    newList[level - 1].selected = cur.value;
    this.setState({ optionList: newList });
  };

  /**
   * diy 递归
   * @param {*} list
   * @param {*} cur
   * @param {*} level
   * @returns
   */
  recursiveFun = (list, cur, level) => {
    const index = _.findIndex(list, cur);
    if (index >= 0) {
      return level;
    } else {
      level += 1;
      for (let item of list) {
        if (item.childer) {
          const math = this.recursiveFun(item.childer, cur, level);
          if (math > -1) {
            return math;
          }
        }
      }
    }
  };

  /**
   * diy 移入事件
   * @param {*} item
   */
  handleOverflowMenuItemMouseEnter = (item) => {
    this.renewPanel(item);
  };

  /**
   * diy 点击事件
   * @param {*} item
   */
  handleOverflowMenuItemClick = (item) => {
    if (!item?.childer) {
      if (this.props.mode === 'multiple') {
        // 多选
        this.renewPanel(item);
        return;
      }
      let bindKeys = Array.isArray(item.value)
        ? item.value
        : this.getSelectKeys(item.value).reverse();
      const { inputText } = this.getOptionLabelByKeys(bindKeys);
      this.setState({ inputText, bindKeys });
      this.closeMenu();
    } else {
      this.renewPanel(item);
    }
  };

  /**
   * diy 获取选中keys
   */
  getSelectKeys = (key) => {
    let ret = [];
    const list = this.flatArray.filter((f) => f.value === key);
    ret.push(list[0].value);
    if (list[0]?.parent) {
      ret = [...ret, ...this.getSelectKeys(list[0]?.parent)];
    }
    return ret;
  };

  /**
   * diy 搜索事件
   * @param {*} filter
   */
  handleSearch = (filter) => {
    const { options } = this.props;
    let reg = RegExp(eval(`/${filter}/`));
    const flatLsit = this.flatArray; // this.flatten(options)
    const filters = flatLsit.filter((f) => reg.test(f.label));
    // console.log(filters);
    if (filters.length > 0) {
      let nexts = [];
      for (let item of filters) {
        let rows =
          item.childer?.length > 1 ? this.flatten(item.childer) : [item];
        nexts = [...nexts, ...rows];
      }
      nexts = [...new Set(nexts)].filter((f) => !(f?.childer?.length > 0));
      // console.log(nexts);
      const builds = nexts.map((m) => {
        return this.buildSearchData(flatLsit, m);
      });
      // console.log(builds);
      const bindList = builds.map((b) => {
        return this.getItem(b);
      });
      const binds = [{ id: 1, selected: '', childer: bindList }];
      this.setState({ optionList: binds, isNull: false });
    } else {
      // 无数据
      console.log('无数据');
      this.setState({ isNull: true });
    }
  };
  getItem = (array) => {
    let ret = { label: '', value: [] };
    for (const item of array.reverse()) {
      ret.label += `${item.label} / `;
      ret.value.push(item.value);
    }
    // ret.label = ret.label.slice(0,ret.label.length - 1)
    ret.label = ret.label.substring(0, ret.label.lastIndexOf('/'));
    return ret;
  };

  /**
   * diy 组装
   * @param {*} sources
   * @param {*} cur
   * @returns
   */
  buildSearchData = (sources, cur) => {
    let ret = [cur];
    let father = sources.filter((f) => cur.parent === f.value);
    if (father[0]?.parent) {
      ret = [...ret, ...this.buildSearchData(sources, father[0])];
    } else {
      ret.push(father[0]);
    }
    return ret;
  };

  /**
   * 树形子级递归，扁平化数组
   * @param {*} array
   * @returns
   */
  flatten = (array) => {
    let result = array.reduce((pre, current) => {
      if (Array.isArray(current.childer)) {
        return pre.concat(this.flatten(current.childer), current);
      } else {
        return pre.concat(current);
      }
    }, []);
    return result;
  };

  /**
   * 查找父级
   * @param {*} key
   * @returns
   */
  findFathers = (key) => {
    let ret = [];
    const item = _.find(this.flatArray, (o) => {
      return o.value === key;
    });
    ret.push(item.value);
    if (item.parent) {
      ret.concat(this.findFathers(item.parent));
    }

    return ret;
  };

  /**
   * 多选选中事件
   */
  handleChecked = (cur, value, tagClick = false) => {
    const newList = this.state.optionList;
    const allChilds = this.flatten(cur?.childer || []);
    if (value) {
      // 更新勾选项
      this.renewCheckedItems(cur.value, 'checked');
      // 子集选项处理
      if (cur?.childer) {
        this.checkedItems.concat(
          allChilds.map((m) => {
            return this.renewCheckedItems(m.value, 'checked');
          })
        );
      }
    } else {
      // 取消当前勾选+子集
      // console.log(allChilds);
      let cancelList = allChilds
        .map((m) => {
          return m.value;
        })
        .concat([cur.value]);
      this.cancelCheckedItems(cancelList);
    }

    // 父级选项处理
    if (cur.parent) {
      const { level, childer } = tagClick
        ? this.getTagLevelItem(cur)
        : newList.filter((f) => f.selected === cur.value)[0];
      // 更新勾选项
      this.renewCheckedItems(cur.parent, this.getCheckedState(childer));
      if (level > 2) {
        for (let index = level - 2; index > 0; index--) {
          const { selected, childer } = newList[index];
          const curItem = _.find(this.flatArray, (o) => {
            return o.value === selected;
          });
          this.renewCheckedItems(curItem.parent, this.getCheckedState(childer));
        }
      }
    }

    // 展示勾选项
    const allItems = this.checkedItems.filter(
      (f) => f.checkedState === 'checked'
    );
    let showItems = [];
    allItems.forEach((m) => {
      const item = _.find(this.flatArray, (o) => {
        return o.value === m.key;
      });
      if (item?.parent) {
        const index = _.findIndex(allItems, (p) => {
          return p.key === item.parent;
        });
        if (index < 0) {
          showItems.push(item);
        }
      } else {
        showItems.push(item);
      }
    });

    this.setState({
      showCheckedItem: showItems,
    });
  };

  /**
   * 清空输入框
   */
  handleClearInput = () => {
    this.checkedItems = [];
    this.setState({
      showCheckedItem: [],
    });
  };

  /**
   * 返回标签移除所在的面板层级object
   * @param {*} value
   */
  getTagLevelItem = (cur) => {
    const { options } = this.props;
    const level = this.recursiveFun(options, cur, 1);
    const childer = this.flatArray.filter((f) => f.parent === cur.parent);
    return { level, childer };
  };

  /**
   * 更新勾选项
   * @param {*} cur
   * @param {*} checkedState
   */
  renewCheckedItems = (value, checkedState) => {
    if (
      _.findIndex(this.checkedItems, (o) => {
        return o.key === value;
      }) > -1
    ) {
      this.checkedItems.map((m) => {
        if (m.key === value) {
          m.checkedState = checkedState;
        }
      });
    } else {
      this.checkedItems.push({ key: value, checkedState });
    }
  };
  /**
   * 取消勾选
   * @param {*} array
   */
  cancelCheckedItems = (cancelArray) => {
    _.remove(this.checkedItems, (r) => {
      return cancelArray.includes(r.key);
    });
  };
  /**
   * 判断子集勾选情况，返回当前项勾选状态
   * @param {*} childs
   * @returns
   */
  getCheckedState = (childs) => {
    let ret = 'none';
    const keys = childs.map((m) => {
      return m.value;
    });
    // 全勾选
    const aList = this.checkedItems.filter(
      (f) => keys.includes(f.key) && f.checkedState === 'checked'
    );
    if (aList.length === childs.length) {
      return 'checked';
    }
    // 部分勾选
    const bList = this.checkedItems.filter(
      (f) => keys.includes(f.key) && f.checkedState !== 'none'
    );
    if (bList.length > 0) {
      return 'part';
    }

    return ret;
  };

  /**
   * diy 生成选项
   * @param {*} row
   * @returns
   */
  renderOption = (row) => {
    const { expandTrigger, mode } = this.props;
    const hoverExpand = expandTrigger === 'hover';
    const newChilds = row.childer.map((cur) => {
      // console.log(cur.value + ':' + this.checkedItems.filter(f => f.key === cur.value)[0]?.checkedState || 'none');
      const checkedState =
        this.checkedItems.filter((f) => f.key === cur.value)[0]?.checkedState ||
        'none';
      return (
        <>
          {mode === 'multiple' ? (
            <MultipleItem
              {...cur}
              key={cur.value}
              checkedState={checkedState}
              onHandleMouseEnter={
                hoverExpand
                  ? () => this.handleOverflowMenuItemMouseEnter(cur)
                  : () => {}
              }
              onHandleClick={() => this.handleOverflowMenuItemClick(cur)}
              hasSelected={row.selected === cur.value}
              onHandleChecked={(evt) => this.handleChecked(cur, evt)}
            />
          ) : (
            <MenuItem
              key={cur.value}
              itemText={cur.label}
              hasArrow={cur.childer ? true : false}
              onHandleMouseEnter={
                hoverExpand
                  ? () => this.handleOverflowMenuItemMouseEnter(cur)
                  : () => {}
              }
              onHandleClick={() => this.handleOverflowMenuItemClick(cur)}
              hasSelected={row.selected === cur.value}
            />
          )}
        </>
      );
    });
    return newChilds;
  };

  render() {
    const {
      id,
      ariaLabel,
      iconDescription,
      direction,
      flipped,
      focusTrap,
      menuOffset,
      menuOffsetFlip,
      iconClass,
      onClick, // eslint-disable-line
      onOpen, // eslint-disable-line
      selectorPrimaryFocus = '[data-floating-menu-primary-focus]', // eslint-disable-line
      renderIcon: IconElement,
      // eslint-disable-next-line react/prop-types
      innerRef: ref,
      menuOptionsClass,
      light,
      size = 'md',
      options,
      expandTrigger,
      mode,
      ...other
    } = this.props;
    const { open, inputText, showCheckedItem } = this.state;
    const menuBody = (
      <div className="menu-div">
        {this.state.optionList.map((item, i) => (
          <ul key={i} className="menu-div-ul">
            {item.childer && this.renderOption(item)}
          </ul>
        ))}
      </div>
    );
    const wrappedMenuBody = (
      <FloatingMenu
        // focusTrap={focusTrap}
        triggerRef={this._triggerRef}
        menuDirection={direction}
        menuOffset={menuOffset}
        menuRef={this._bindMenuBody}
        flipped={false}
        target={this._getTarget}
        onPlace={this._handlePlace}
        selectorPrimaryFocus={this.props.selectorPrimaryFocus}
      >
        {React.cloneElement(menuBody, {
          'data-floating-menu-direction': direction,
        })}
      </FloatingMenu>
    );

    return (
      <>
        {mode === 'single' && (
          <InputMode
            {...this.props}
            handleKeyPress={this.handleKeyPress}
            handleClick={this.handleClick}
            _triggerRef={this._triggerRef}
            open={open}
            handleClickOutside={this.handleClickOutside}
            labelText={inputText}
          />
        )}
        {mode === 'search' && (
          <SearchMode
            {...this.props}
            handleKeyPress={this.handleKeyPress}
            handleClick={this.handleClick}
            _triggerRef={this._triggerRef}
            open={open}
            handleClickOutside={this.handleClickOutside}
            handleSearch={this.handleSearch}
            init={() => this.init}
          />
        )}
        {mode === 'multiple' && (
          <MultipleMode
            {...this.props}
            handleKeyPress={this.handleKeyPress}
            handleClick={this.handleClick}
            _triggerRef={this._triggerRef}
            open={open}
            handleClickOutside={this.handleClickOutside}
            values={showCheckedItem}
            handleTageClose={this.handleChecked}
            onHandleClearInput={this.handleClearInput}
          />
        )}
        {open && wrappedMenuBody}
      </>
    );
  }
}

// 普通-组件
const InputMode = (props) => {
  const {
    id,
    ariaLabel,
    iconDescription,
    direction,
    flipped,
    focusTrap,
    menuOffset,
    menuOffsetFlip,
    iconClass,
    onClick, // eslint-disable-line
    onOpen, // eslint-disable-line
    selectorPrimaryFocus = '[data-floating-menu-primary-focus]', // eslint-disable-line
    renderIcon: IconElement,
    // eslint-disable-next-line react/prop-types
    innerRef: ref,
    menuOptionsClass,
    light,
    size = 'md',
    options,
    expandTrigger,
    ...other
  } = props;
  return (
    <ClickListener onClickOutside={other.handleClickOutside}>
      <input
        type="text"
        aria-haspopup
        aria-expanded={open}
        className="cds--text-input some-class cds--text-input--md"
        onKeyDown={other.hahandleKeyPress}
        onClick={other.handleClick}
        aria-label={ariaLabel}
        id={id}
        ref={mergeRefs(other._triggerRef, ref)}
        value={other.labelText}
        onChange={() => {}}
      />
    </ClickListener>
  );
};
// 带搜索框-组件
const SearchMode = (props) => {
  const {
    id,
    ariaLabel,
    iconDescription,
    direction,
    flipped,
    focusTrap,
    menuOffset,
    menuOffsetFlip,
    iconClass,
    onClick, // eslint-disable-line
    onOpen, // eslint-disable-line
    selectorPrimaryFocus = '[data-floating-menu-primary-focus]', // eslint-disable-line
    renderIcon: IconElement,
    // eslint-disable-next-line react/prop-types
    innerRef: ref,
    menuOptionsClass,
    light,
    size = 'md',
    options,
    expandTrigger,
    ...other
  } = props;

  const [text, setText] = useState('');
  const [showClose, setShowClose] = useState(false);
  useEffect(() => {
    const flag = text.length > 0;
    setShowClose(flag);
    if (flag) {
      other.handleSearch(text);
    } else {
      other.init();
    }
  }, [text]);

  return (
    <ClickListener onClickOutside={other.handleClickOutside}>
      <div className="cds--search cds--search--lg">
        <div className="cds--search-magnifier">
          <Search className="cds--search-magnifier-icon" />
        </div>
        <label className="cds--label"></label>
        <input
          type="text"
          aria-haspopup
          aria-expanded={open}
          className="cds--search-input"
          onClick={other.handleClick}
          aria-label={ariaLabel}
          id={id}
          ref={mergeRefs(other._triggerRef, ref)}
          value={text}
          onChange={(evt) => {
            setText(evt.target.value);
          }}
        />
        {showClose && (
          <button
            type="button"
            className="cds--search-close"
            onClick={() => setText('')}
          >
            <Close />
          </button>
        )}
      </div>
    </ClickListener>
  );
};
// 多选框-组件
const MultipleMode = (props) => {
  const {
    id,
    ariaLabel,
    iconDescription,
    direction,
    flipped,
    focusTrap,
    menuOffset,
    menuOffsetFlip,
    iconClass,
    onClick, // eslint-disable-line
    onOpen, // eslint-disable-line
    selectorPrimaryFocus = '[data-floating-menu-primary-focus]', // eslint-disable-line
    renderIcon: IconElement,
    // eslint-disable-next-line react/prop-types
    innerRef: ref,
    menuOptionsClass,
    light,
    size = 'md',
    options,
    expandTrigger,
    values,
    handleTageClose,
    onHandleClearInput,
    ...other
  } = props;
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    setShowClose(values.length > 0 ? true : false);
  }, [values]);

  const onClear = (evt) => {
    evt.stopPropagation();
    onHandleClearInput();
  };

  const diyClassName = `multiple-input ${other.open ? 'input_active' : ''}`;

  return (
    <ClickListener onClickOutside={other.handleClickOutside}>
      <div className="cds--search cds--search--lg input-box ">
        <div
          aria-haspopup
          aria-expanded={open}
          className={diyClassName}
          onClick={other.handleClick}
          aria-label={ariaLabel}
          id={id}
          ref={mergeRefs(other._triggerRef, ref)}
        >
          {values &&
            values.map((m) => (
              <Tag
                key={m.value}
                type="cool-gray"
                filter={true}
                onClose={() => {
                  handleTageClose(m, false, true);
                }}
              >
                {m.label}
              </Tag>
            ))}
        </div>
        {showClose && (
          <button
            type="button"
            className="cds--search-close"
            onClick={(evt) => onClear(evt)}
          >
            <Close />
          </button>
        )}
      </div>
    </ClickListener>
  );
};

// 多选选项-组件
const MultipleItem = (props) => {
  const {
    checkedState,
    onHandleMouseEnter,
    onHandleClick,
    hasSelected,
    onHandleChecked,
    ...other
  } = props;
  const hasArrow = other.childer ? true : false;
  const partChecked = checkedState === 'part' ? true : false;
  const checkedVlaue = checkedState === 'checked' ? true : false;
  const liItemClasses = classNames('li-item multiple_item', {
    ['li-item_active']: hasSelected,
  });

  return (
    <li
      className={liItemClasses}
      onMouseEnter={() => onHandleMouseEnter()}
      onClick={() => onHandleClick()}
    >
      <div>
        <Checkbox
          labelText={other.label}
          id={`checkbox-${other.value}`}
          indeterminate={partChecked}
          checked={checkedVlaue}
          onChange={(evt) => onHandleChecked(evt.target.checked)}
        />
      </div>
      {hasArrow && (
        <div className="icon-btn">
          <CaretRight />
        </div>
      )}
      {/* <div className="icon-btn" >{hasArrow && <CaretRight />}</div> */}
    </li>
  );
};

// 选项-组件
const MenuItem = (props) => {
  const { itemText, hasArrow, onHandleMouseEnter, onHandleClick, hasSelected } =
    props;
  const liItemClasses = classNames('li-item', {
    ['li-item_active']: hasSelected,
  });

  return (
    <li
      className={liItemClasses}
      onMouseEnter={() => onHandleMouseEnter()}
      onClick={() => onHandleClick()}
    >
      <div>{itemText}</div>
      <div>{hasArrow && <CaretRight />}</div>
    </li>
  );
};

export { DiyCascader };
export default (() => {
  const forwardRef = (props, ref) => (
    // <Cascader {...props} innerRef={ref} />
    <DiyCascader {...props} ref={ref} />
  );
  forwardRef.displayName = 'DiyCascader';
  return React.forwardRef(forwardRef);
})();
