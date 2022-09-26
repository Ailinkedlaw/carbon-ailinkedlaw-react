/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */

import invariant from 'invariant';
import PropTypes from 'prop-types';
import React, { Component, useState, useEffect } from 'react';
import ClickListener from '@/global/js/utils/internal/ClickListener';
import FloatingMenu, {
  DIRECTION_TOP,
  DIRECTION_BOTTOM,
  DIRECTION_RIGHT,
} from '@/global/js/utils/internal/FloatingMenu';
import { Calendar, OverflowMenuVertical } from '@carbon/icons-react';
import {
  keys,
  matches as keyCodeMatches,
} from '@/global/js/utils/internal/keyboard';
import mergeRefs from '@/global/js/utils/tools/mergeRefs';
import { PrefixContext, usePrefix } from '@/global/js/utils/internal/usePrefix';
import * as FeatureFlags from '@carbon/feature-flags';
//
import './_RangeDatePicker.scss';
import PickerDemo from './FlatpickrDate';

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

class RangeDatePicker extends Component {
  // eslint-disable-next-line react/sort-comp
  state = {
    labelText: '',
    start: '',
    end: '',
  };

  // #region 参数
  static propTypes = {
    /**
     * value 绑定传参
     */
    value: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
    // /**
    //  * The menu direction.
    //  */
    // direction: PropTypes.oneOf([
    //   DIRECTION_TOP,
    //   DIRECTION_BOTTOM,
    //   DIRECTION_RIGHT,
    // ]),

    // /**
    //  * Enable or disable focus trap behavior
    //  */
    // focusTrap: PropTypes.bool,

    // /**
    //  * The CSS class for the icon.
    //  */
    // iconClass: PropTypes.string,

    // /**
    //  * The icon description.
    //  */
    // iconDescription: PropTypes.string.isRequired,

    /**
     * The element ID.
     */
    id: PropTypes.string.isRequired,

    /**
     * `true` to use the light version. For use on $ui-01 backgrounds only.
     * Don't use this to make OverflowMenu background color same as container background color.
     */
    // light: FeatureFlags.enabled('enable-v11-release')
    //   ? deprecate(
    //     PropTypes.bool,
    //     'The `light` prop for `OverflowMenu` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
    //   )
    //   : PropTypes.bool,

    // /**
    //  * The adjustment in position applied to the floating menu.
    //  */
    // menuOffset: PropTypes.oneOfType([
    //   PropTypes.shape({
    //     top: PropTypes.number,
    //     left: PropTypes.number,
    //   }),
    //   PropTypes.func,
    // ]),

    // /**
    //  * The adjustment in position applied to the floating menu.
    //  */
    // menuOffsetFlip: PropTypes.oneOfType([
    //   PropTypes.shape({
    //     top: PropTypes.number,
    //     left: PropTypes.number,
    //   }),
    //   PropTypes.func,
    // ]),

    // /**
    //  * The class to apply to the menu options
    //  */
    // menuOptionsClass: PropTypes.string,

    // /**
    //  * The event handler for the `click` event.
    //  */
    // onClick: PropTypes.func,

    // /**
    //  * Function called when menu is closed
    //  */
    // onClose: PropTypes.func,

    // /**
    //  * The event handler for the `focus` event.
    //  */
    // onFocus: PropTypes.func,

    // /**
    //  * The event handler for the `keydown` event.
    //  */
    // onKeyDown: PropTypes.func,

    // /**
    //  * Function called when menu is opened
    //  */
    // onOpen: PropTypes.func,

    // /**
    //  * `true` if the menu should be open.
    //  */
    // open: PropTypes.bool,

    // /**
    //  * Function called to override icon rendering.
    //  */
    // renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    // /**
    //  * Specify a CSS selector that matches the DOM element that should
    //  * be focused when the OverflowMenu opens
    //  */
    // selectorPrimaryFocus: PropTypes.string,

    // /**
    //  * Specify the size of the OverflowMenu. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
    //  */
    // size: FeatureFlags.enabled('enable-v11-release')
    //   ? PropTypes.oneOf(['sm', 'md', 'lg'])
    //   : PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  };
  // #endregion

  // eslint-disable-next-line react/sort-comp
  static contextType = PrefixContext;

  // #region 参数默认值
  static defaultProps = {
    value: { start: '', end: '' },
    iconDescription: 'open and close list of options',
    open: false,
    direction: DIRECTION_BOTTOM,
    focusTrap: true,
    renderIcon: OverflowMenuVertical,
    onClick: () => {},
    onKeyDown: () => {},
    onClose: () => {},
    onOpen: () => {},
    menuOffset: getMenuOffset,
    menuOffsetFlip: getMenuOffset,
    selectorPrimaryFocus: '[data-overflow-menu-primary-focus]',
  };
  // #endregion

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
    const { start, end } = this.props.value;
    const labelText = start && end ? `${start} to ${end}` : '';
    this.setState({ labelText, start, end });
  }

  handleClick = (evt) => {
    evt.stopPropagation();
    if (!this._menuBody || !this._menuBody.contains(evt.target)) {
      const open = !this.state.open;
      this.setState({ open });
      this.props.onClick(evt);
      //
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

  /**
   * 获取值
   * @returns 值
   */
  getValue = () => {
    const { start, end } = this.state;
    return { start, end };
  };

  /**
   * 更新value
   * @param {*} value
   */
  useSetValue = (value) => {
    const { start, end } = value;
    const labelText = start && end ? `${start} to ${end}` : '';
    this.setState(
      {
        start,
        end,
        labelText,
      },
      () => this.closeMenu()
    );
  };

  render() {
    const {
      id,
      iconDescription,
      direction,
      focusTrap,
      menuOffset,
      menuOffsetFlip,
      iconClass,
      onClick,
      onOpen,
      selectorPrimaryFocus = '[data-floating-menu-primary-focus]',
      renderIcon: IconElement,
      innerRef: ref,
      menuOptionsClass,
      light,
      size = 'md',
      options,
      expandTrigger,
      ...other
    } = this.props;
    const { open, labelText, start, end } = this.state;
    const inputDom = document.getElementById(id);
    const pickerState = {
      inputDom,
      open,
      start,
      end,
      setValue_callBack: this.useSetValue,
    };
    const menuBody = (
      <div className="panelBox">
        <PickerDemo {...pickerState} />
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
        <InputMode
          {...this.props}
          labelText={labelText}
          handleKeyPress={this.handleKeyPress}
          handleClick_callback={this.handleClick}
          _triggerRef={this._triggerRef}
          open={open}
          handleClickOutside_callback={this.handleClickOutside}
          handleSearch={this.handleSearch}
          init={() => this.init}
        />
        {open && wrappedMenuBody}
      </>
    );
  }
}

// 普通-组件
const InputMode = (props) => {
  const {
    id,
    labelText,
    // eslint-disable-next-line react/prop-types
    innerRef: ref,
    ...other
  } = props;
  const prefix = usePrefix();
  return (
    <ClickListener onClickOutside={other.handleClickOutside_callback}>
      <div
        className={`${prefix}--date-picker-input__wrapper`}
        style={{ width: '17rem' }}
      >
        <input
          type="text"
          aria-haspopup
          aria-expanded={other.open}
          className={`${prefix}--date-picker__input ${prefix}--date-picker__input--md flatpickr-input`}
          style={{ width: '17rem' }}
          placeholder="yyyy/mm/dd"
          id={id}
          ref={mergeRefs(other._triggerRef, ref)}
          autoComplete="off"
          onKeyDown={other.hahandleKeyPress}
          onClick={other.handleClick_callback}
          onChange={() => {}}
          value={labelText}
        />
        <Calendar
          className={`${prefix}--date-picker__icon`}
          role="img"
          aria-hidden="true"
        ></Calendar>
      </div>
    </ClickListener>
  );
};

export { RangeDatePicker };
export default (() => {
  const forwardRef = (props, ref) => (
    // <RangeDatePicker {...props} innerRef={ref} />
    <RangeDatePicker {...props} ref={ref} />
  );
  forwardRef.displayName = 'RangeDatePicker';
  return React.forwardRef(forwardRef);
})();
