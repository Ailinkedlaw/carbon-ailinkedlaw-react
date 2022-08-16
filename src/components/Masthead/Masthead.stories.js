import { boolean, select, text } from '@storybook/addon-knobs';
import Masthead from './Masthead'
import mastheadKnobs from './data/Masthead.stories.knobs.js';


import styles from './_storybook-styles.scss'
import { prepareStory } from '@/global/js/utils/story-helper'
import LogoImg from '@/assets/images/logo.png'
import { HeaderGlobalAction, HeaderMenuButton } from '@carbon/react'
import { Notification, Switcher } from '@carbon/icons-react'
import { action } from '@storybook/addon-actions'

// demo
import mastheadNav from './data/usen.json'
import Nav2 from './data/demo-data.json'

export default {
  title: 'Components/Masthead',
  parameters: {
    styles
  },
  argTypes: {},
};

const Template = (args) => (
  <Masthead {...args} />
)

const customProfileLogin = text(
  'custom profile login url (customProfileLogin)',
  'https://www.example.com/',
)

export const Default = prepareStory(Template, {
  args: {
    // mastheadmenuButton: (isSideNavExpanded, onClickSideNavExpand) => (
    //   <HeaderMenuButton
    //     aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
    //     onClick={onClickSideNavExpand}
    //     isActive={isSideNavExpanded}
    //   />
    // ),
    mastheadmenuButton:  (isSideNavExpanded, onClickSideNavExpand) => {
      console.log({isSideNavExpanded, onClickSideNavExpand})
    },
    navAlign: 'center',
    hasProfileProps: {
      children: (
        <>
          <HeaderGlobalAction
            aria-label="Notifications"
            onClick={action('notification click')}>
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="App Switcher"
            onClick={action('app-switcher click')}
            tooltipAlignment="end">
            <Switcher size={20} />
          </HeaderGlobalAction>
        </>
      )
    },
    logoProps: {
      target: '_blank',
      href: 'https://www.ailinkedlaw.com/',
      children: <img src={LogoImg} alt="logo" />
    },
    navigation: mastheadNav.mastheadNav.links,
    customProfileLogin,
    hasSearch: boolean(
      'show the search functionality (hasSearch)',
      true,
    ),
    placeHolderText: text(
      'search placeholder (placeHolderText)',
      'Search all of IBM',
    ),
    initialSearchTerm: text(
      'initial search term (initialSearchTerm)',
      '',
    ),
    selectedMenuItem: text(
      'selected menu item (selectedMenuItem)',
      'Consulting & Services',
    ),
  }
})

export const DefaultLft = prepareStory(Template, {
  args: {
    navAlign: 'left', // center left
    hasProfileProps: {
      children: (
        <>
          <HeaderGlobalAction
            aria-label="Notifications"
            onClick={action('notification click')}>
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="App Switcher"
            onClick={action('app-switcher click')}
            tooltipAlignment="end">
            <Switcher size={20} />
          </HeaderGlobalAction>
        </>
      )
    },
    logoProps: {
      target: '_blank',
      href: 'https://www.ailinkedlaw.com/',
      children: <img src={LogoImg} alt="logo" />
    },
    navigation: mastheadNav.mastheadNav.links,
    customProfileLogin,
    hasSearch: boolean(
      'show the search functionality (hasSearch)',
      true,
    ),
    placeHolderText: text(
      'search placeholder (placeHolderText)',
      'Search all of IBM',
    ),
    initialSearchTerm: text(
      'initial search term (initialSearchTerm)',
      '',
    ),
    selectedMenuItem: text(
      'selected menu item (selectedMenuItem)',
      'Consulting & Services',
    ),
  }
})


export const WithCustomNavigation = prepareStory(Template, {
  args: {
    logoProps: {
      target: '_blank',
      href: 'https://www.ailinkedlaw.com/',
      children: <img src={LogoImg} alt="logo" />,
      // element: Link, // import { Link } from 'react-router-dom'
      // to: '/dashboard'
    },
    navigation: mastheadKnobs.navigation.custom,
    customProfileLogin,
    hasSearch: boolean(
      'show the search functionality (hasSearch)',
      true
    ),
    placeHolderText: text(
      'search placeholder (placeHolderText)',
      'Search all of IBM'
    ),
    selectedMenuItem: text(
      'selected menu item (selectedMenuItem)',
      'Lorem ipsum dolor sit amet'
    ),
  }
})


export const WithL1 = prepareStory(Template, {
  args: {
    mastheadmenuButton:  (isSideNavExpanded, onClickSideNavExpand) => {
      console.log({isSideNavExpanded, onClickSideNavExpand})
    },
    hideMenuButton: false,
    logoProps: {
      target: '_blank',
      href: 'https://www.ailinkedlaw.com/',
      children: <img src={LogoImg} alt="logo" />
    },
    platform: mastheadKnobs.l1Platform,
    hasSearch: boolean(
      'show the search functionality (hasSearch)',
      true
    ),
    placeHolderText: text(
      'search placeholder (placeHolderText)',
      'Search all of IBM'
    ),
    mastheadL1Data: {
      navigationL1: mastheadKnobs.navigation.custom,
    },
    selectedMenuItem: text(
      'selected menu item (selectedMenuItem)',
      'Lorem ipsum dolor sit amet'
    ),
  }
})

export const WithL1Left = prepareStory(Template, {
  args: {
    navAlign: 'left',
    logoProps: {
      target: '_blank',
      href: 'https://www.ailinkedlaw.com/',
      children: <img src={LogoImg} alt="logo" />
    },
    platform: mastheadKnobs.l1Platform,
    hasSearch: boolean(
      'show the search functionality (hasSearch)',
      true
    ),
    placeHolderText: text(
      'search placeholder (placeHolderText)',
      'Search all of IBM'
    ),
    mastheadL1Data: {
      navigationL1: mastheadKnobs.navigation.custom,
    },
    selectedMenuItem: text(
      'selected menu item (selectedMenuItem)',
      'Lorem ipsum dolor sit amet'
    ),
  }
})

export const WithAlternateLogoAndTooltip = prepareStory(Template, {
  args: {
    logoProps: {
      target: '_blank',
      href: 'https://www.ailinkedlaw.com/',
      children: <img src={LogoImg} alt="logo" />
    },
    navigation: select(
      'navigation data (navigation)',
      mastheadKnobs.navigation,
      mastheadKnobs.navigation.custom,
    ),
    hasSearch: boolean(
      'show the search functionality (hasSearch)',
      true,
    ),
    placeHolderText: text(
      'search placeholder (placeHolderText)',
      'Search all of IBM',
    ),
    selectedMenuItem: text(
      'selected menu item (selectedMenuItem)',
      'Consulting & Services',
    ),
    mastheadLogo: select(
      'masthead logo data (mastheadLogo)',
      mastheadKnobs.mastheadLogo,
      mastheadKnobs.mastheadLogo.alternateWithTooltip,
    ),
  }
})

export const Demo2 = prepareStory(Template, {
  args: {
    logoProps: {
      target: '_blank',
      href: 'https://www.ailinkedlaw.com/',
      children: <img src={LogoImg} alt="logo" />
    },
    navigation: Nav2.mastheadNav.links,
    hasSearch: boolean(
      'show the search functionality (hasSearch)',
      true,
    ),
    placeHolderText: text(
      'search placeholder (placeHolderText)',
      'Search all of IBM',
    ),
    selectedMenuItem: 'Products',
    mastheadLogo: select(
      'masthead logo data (mastheadLogo)',
      mastheadKnobs.mastheadLogo,
      mastheadKnobs.mastheadLogo.alternateWithTooltip,
    ),
  }
})
