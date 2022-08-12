import { boolean, select, text } from '@storybook/addon-knobs';
import Masthead from './Masthead'
import mastheadKnobs from './data/Masthead.stories.knobs.js';

import mastheadNav from './data/usen.json'

import styles from './_storybook-styles.scss'
import { prepareStory } from '@/global/js/utils/story-helper'

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
    navigation: mastheadNav.mastheadNav.links,
    hasProfile: boolean(
      'show the profile functionality (hasProfile)',
      true,
    ),
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
    navigation: mastheadKnobs.navigation.custom,
    hasProfile: boolean(
      'show the profile functionality (hasProfile)',
      true
    ),
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
    platform: mastheadKnobs.l1Platform,
    hasProfile: boolean(
      'show the profile functionality (hasProfile)',
      true
    ),
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
    navigation: select(
      'navigation data (navigation)',
      mastheadKnobs.navigation,
      mastheadKnobs.navigation.custom,
    ),
    hasProfile: boolean(
      'show the profile functionality (hasProfile)',
      true,
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
