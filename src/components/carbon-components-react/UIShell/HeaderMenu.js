/* istanbul ignore file */

/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { matches } from '@carbon/react/es/internal/keyboard/match'
import { Enter, Space, Escape } from '@carbon/react/es/internal/keyboard/keys'

import root from 'window-or-global';

const prefix = 'cds'

const defaultRenderMenuContent = () => (
  <ChevronDown size={20} className={`${prefix}--header__menu-arrow`} />
);

/**
 * `HeaderMenu` is used to render submenu's in the `Header`. Most often children
 * will be a `HeaderMenuItem`. It handles certain keyboard events to help
 * with managing focus. It also passes along refs to each child so that it can
 * help manage focus state of its children.
 */
class HeaderMenu extends React.Component {
  static propTypes = {

    /**
     * Optional data-title attribute
     */
    dataTitle: PropTypes.string,

    /**
     * Provide a custom ref handler for the menu button
     */
    focusRef: PropTypes.func,

    /**
     * Optionally provide a tabIndex for the underlying menu button
     */
    tabIndex: PropTypes.number,

    /**
     * Provide a label for the link text
     */
    menuLinkName: PropTypes.string.isRequired,

    /**
     * Optional component to render instead of string
     */
    renderMenuContent: PropTypes.func,

    /**
     * Determines whether to disable body scroll
     */
    disableScroll: PropTypes.bool,

    /**
     * function to toogle overlay that appears when opening menu
     */
    setOverlay: PropTypes.func,

    /**
     * sets the selected styles
     */
    selected: PropTypes.bool,
  };

  static defaultProps = {
    renderMenuContent: defaultRenderMenuContent,
    setOverlay: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      // Used to manage the expansion state of the menu
      expanded: false,
      // Refers to the menuitem that is currently focused
      // Note: children should have `role="menuitem"` on node consuming ref
      selectedIndex: null,
    };
    this.items = [];
    this.scrollBarWidth = root.window?.innerWidth - root.document?.body.offsetWidth;
    this.menuLinkRef = React.createRef();
  }
  /**
   * Toggle the expanded state of the menu on click.
   */
  handleOnClick = event => {

    // event.preventDefault();
    this.menuLinkRef.current.focus();

    // set the margin for masthead and body to adjust for scrollbar disappearing on scroll lock
    const elems = root.document?.querySelectorAll(
      `.${prefix}--masthead__l0, body`
    );

    this.setState(prevState => {

      if (this.props.disableScroll) {
        if (prevState.expanded) {
          this.props.setOverlay(false);
          root.document?.body?.classList.remove(`${prefix}--body__lock-scroll`);
          elems.forEach(elem => (elem.style.marginRight = '0px'));
        } else {
          this.props.setOverlay(true);
          root.document?.body?.classList.add(`${prefix}--body__lock-scroll`);
          elems.forEach(
            elem => (elem.style.marginRight = `${this.scrollBarWidth}px`)
          );
        }
      }


      const onMegaMenuToggle = new CustomEvent('onMegaMenuToggle', {
        bubbles: true,
        detail: { isExpanded: !prevState.expanded },
      });

      this.menuLinkRef.current.dispatchEvent(onMegaMenuToggle);

      return {
        expanded: !prevState.expanded,
      };
    });
  };

  /**
   * Keyboard event handler for the entire menu.
   */
  handleOnKeyDown = event => {
    // Handle enter or space key for toggling the expanded state of the menu.
    if (matches(event, [Enter, Space])) {
      event.stopPropagation();
      event.preventDefault();

      this.handleOnClick(event);

      return;
    }
  };


  closeMenu = (event) => {
    // const elems = root.document?.querySelectorAll(
    // `.${prefix}--masthead__l0, body`
    // );
    // if (!event.currentTarget.contains(event.relatedTarget)) {
    // this.setState({ expanded: false, selectedIndex: null });
    // if (this.props.disableScroll) {
    //   root.document?.body?.classList.remove(`${prefix}--body__lock-scroll`);
    //   elems.forEach(elem => (elem.style.marginRight = '0px'));
    // }
    // }

    // if (!event.relatedTarget || !this.checkMenuItems(event).length) {
    // this.props.setOverlay(false);
    // }
  }
  /**
   * Checks if user has tabbed to menu items within the megamenu,
   * if so do not set overlay to false
   */
  checkMenuItems = event => {
    const megamenuItems = [
      `${prefix}--masthead__megamenu__category-headline`,
      `${prefix}--masthead__megamenu__category-group`,
      `${prefix}--masthead__megamenu__view-all-cta`,
      `${prefix}--masthead__megamenu__l0-nav`,
      `${prefix}--masthead__megamenu__l1-nav`,
      `${prefix}--header__menu`,
    ];

    return megamenuItems.filter(item =>
      event.relatedTarget.parentElement.className?.includes(item)
    );
  };

  /**
   * Handle our blur event from our underlying menuitems. Will mostly be used
   * for toggling the expansion status of our menu in response to a user
   * clicking off of the menu or menubar.
   */
  handleOnBlur = event => {
    const elems = root.document?.querySelectorAll(
      `.${prefix}--masthead__l0, body`
    );
    if (!event.currentTarget.contains(event.relatedTarget)) {
      // this.setState({ expanded: false, selectedIndex: null });
      // if (this.props.disableScroll) {
      //   root.document?.body?.classList.remove(`${prefix}--body__lock-scroll`);
      //   elems.forEach(elem => (elem.style.marginRight = '0px'));
      // }
    }

    if (!event.relatedTarget || !this.checkMenuItems(event).length) {
      // this.props.setOverlay(false);
    }
  };

  /**
   * ref handler for our menu button. This node is represented by the
   * `role="menu"` attribute. If we are supplied a `focusRef` prop, we also
   * forward along the node.
   *
   * This is useful when this component is a child in a
   * menu or menubar as it will allow the parent to explicitly focus the menu
   * button node when that child should receive focus.
   */
  handleMenuButtonRef = node => {
    if (this.props.focusRef) {
      this.props.focusRef(node);
    }
    this.menuButtonRef = node;
  };

  /**
   * Handles individual menuitem refs. We assign them to a class instance
   * property so that we can properly manage focus of our children.
   */
  handleItemRef = index => node => {
    this.items[index] = node;
  };

  handleMenuClose = event => {
    // Handle ESC keydown for closing the expanded menu.
    if (matches(event, [Escape]) && this.state.expanded) {
      event.stopPropagation();
      event.preventDefault();

      this.setState(() => ({
        expanded: false,
        selectedIndex: null,
      }));

      // remove overlay
      this.props.setOverlay(false);

      // Return focus to menu button when the user hits ESC.
      this.menuLinkRef.current.focus();
      return;
    }
  };




  // eslint-disable-next-line react/sort-comp
  render () {
    const {
      ariaLabel,
      className: customClassName,
      children,
      renderMenuContent: MenuContent,
      menuLinkName,
      autoId,
      selected,
      dataTitle,
    } = this.props;
    const accessibilityLabel = { 'aria-label': ariaLabel };

    const className = cx(`${prefix}--header__submenu`, customClassName);
    // Notes on eslint comments and based on the examples in:
    // https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
    // - The focus is handled by the <a> menuitem, onMouseOver is for mouse
    // users
    // - aria-haspopup can definitely have the value "menu"
    // - aria-expanded is on their example node with role="menuitem"
    // - href can be set to javascript:void(0), ideally this will be a button
    return (
      <li
        className={className}
        data-autoid={autoId}
        onClick={this.props.handleClick}
        onMouseOver={this.props.handleMouseOver}
        onMouseLeave={(e) => {
          this.props.handleMouseLeave && this.props.handleMouseLeave()
        }}
      //  onKeyDown={this.handleMenuClose}
      // onBlur={this.handleOnBlur}
      // onClick={this.handleMenuClose}
      >
        <a
          aria-haspopup="menu"
          // aria-expanded={this.state.expanded}
          aria-expanded={this.props.exStatus}
          className={`${prefix}--header__menu-item ${prefix}--header__menu-title`}
          data-title={dataTitle}
          // onClick={this.handleOnClick}
          //  onKeyDown={this.handleOnKeyDown}
          role="menuitem"
          data-selected={`${!!selected}`}
          tabIndex={0}
          ref={this.menuLinkRef}
          {...accessibilityLabel}>
          {menuLinkName}
          <MenuContent />
        </a>
        <ul {...accessibilityLabel} className={`${prefix}--header__menu`}>
          {React.Children.map(children, this._renderMenuItem)}
        </ul>
      </li>
    );
  }

  /**
   * Render an individual menuitem, passing along `role: 'none'` because the
   * host node <li> doesn't apply when in a <ul> with `role="menu"` and so we
   * need to revert the semantics.
   *
   * We also capture the `ref` for each child inside of `this.items` to properly
   * manage focus. In addition to this focus management, all items receive a
   * `tabIndex: -1` so the user won't hit a large number of items in their tab
   * sequence when they might not want to go through all the items.
   */
  _renderMenuItem = (item, index) => {
    return React.cloneElement(item, {
      ref: this.handleItemRef(index),
      role: 'none',
    });
  };
}

export default React.forwardRef((props, ref) => {
  return <HeaderMenu {...props} focusRef={ref} />;
});
