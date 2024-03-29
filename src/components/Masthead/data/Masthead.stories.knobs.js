/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Knobs for Masthead. Also used by DotcomShell.stories.js
 *
 * type {{}}
 */
import mastheadLinks from './MastheadLinks.js';

const mastheadKnobs = {
  navigation: {
    default: 'default',
    custom: mastheadLinks,
    none: null,
  },
  platform: {
    none: null,
    platform: {
      name: 'IBM Cloud',
      url: 'https://www.ibm.com/cloud',
    },
  },
  l1Platform: {
    name: '首页',
    url: 'https://www.ailinkedlaw.com',
  },
  mastheadLogo: {
    defaultNoTooltip: {
      denylist: [],
      allowlist: [],
      end: 'May 5, 2021 0:00:01',
      path: '/',
    },
    alternateWithTooltip: {
      svg: `<svg width="81px" height="33px" viewBox="0 0 81 33" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>Artboard</title>
      <defs>
        <path d="M67.716,0.0192 L66.982,2.1532 L80.733,2.1532 L80.733,0.0192 L67.716,0.0192 Z M44.624,0.0192 L44.625,2.1532 L58.392,2.1532 L57.64,0.0192 L44.624,0.0192 Z M17.011,0.0192 L17.011,2.1532 L39.738,2.1532 C38.216,0.8282 36.189,0.0192 33.961,0.0192 L33.961,0.0192 L17.011,0.0192 Z M0.019,2.1532 L14.887,2.1532 L14.887,0.0192 L0.019,0.0192 L0.019,2.1532 Z M66.246,4.2862 L65.479,6.4192 L80.733,6.4192 L80.733,4.2862 L66.246,4.2862 Z M44.624,4.2862 L44.625,6.4192 L59.87,6.4192 L59.132,4.2862 L44.624,4.2862 Z M17.011,4.2862 L17.011,6.4192 L41.863,6.4192 C41.672,5.6612 41.365,4.9442 40.97,4.2862 L40.97,4.2862 L17.011,4.2862 Z M0.019,6.4192 L14.887,6.4192 L14.887,4.2862 L0.019,4.2862 L0.019,6.4192 Z M64.761,8.5532 L64.009,10.6862 L76.485,10.6862 L76.485,8.5532 L64.761,8.5532 Z M48.872,8.5532 L48.872,10.6862 L61.354,10.6862 L60.602,8.5532 L48.872,8.5532 Z M34.004,8.5532 L34.004,10.6862 L41.565,10.6862 C41.756,10.0052 41.863,9.2912 41.863,8.5532 L41.863,8.5532 L34.004,8.5532 Z M21.259,10.6862 L27.632,10.6862 L27.632,8.5532 L21.259,8.5532 L21.259,10.6862 Z M4.267,10.6862 L10.639,10.6862 L10.639,8.5532 L4.267,8.5532 L4.267,10.6862 Z M63.273,12.8192 L62.679,14.5432 L62.084,12.8192 L48.872,12.8192 L48.872,14.9532 L55.244,14.9532 L55.244,12.9912 L55.945,14.9532 L69.39,14.9532 L70.113,12.9912 L70.113,14.9532 L76.485,14.9532 L76.485,12.8192 L63.273,12.8192 Z M21.259,12.8192 L21.259,14.9532 L38.953,14.9532 C39.685,14.3502 40.316,13.6292 40.801,12.8192 L40.801,12.8192 L21.259,12.8192 Z M4.267,14.9532 L10.639,14.9532 L10.639,12.8192 L4.267,12.8192 L4.267,14.9532 Z M70.113,19.2182 L76.485,19.2182 L76.485,17.0852 L70.113,17.0852 L70.113,19.2182 Z M56.82,17.0862 L57.644,19.2182 L67.691,19.2182 L68.522,17.0862 L56.82,17.0862 Z M48.872,19.2182 L55.244,19.2182 L55.244,17.0852 L48.872,17.0852 L48.872,19.2182 Z M21.259,17.0862 L21.259,19.2182 L40.801,19.2182 C40.316,18.4092 39.685,17.6882 38.953,17.0862 L38.953,17.0862 L21.259,17.0862 Z M4.267,19.2182 L10.639,19.2182 L10.639,17.0852 L4.267,17.0852 L4.267,19.2182 Z M70.113,23.4852 L76.485,23.4852 L76.485,21.3522 L70.113,21.3522 L70.113,23.4852 Z M58.494,21.3522 L59.334,23.4852 L66.023,23.4852 L66.857,21.3522 L58.494,21.3522 Z M48.872,23.4852 L55.244,23.4852 L55.244,21.3522 L48.872,21.3522 L48.872,23.4852 Z M34.004,21.3522 L34.004,23.4852 L41.863,23.4852 C41.863,22.7472 41.756,22.0322 41.565,21.3522 L41.565,21.3522 L34.004,21.3522 Z M21.259,23.4852 L27.632,23.4852 L27.632,21.3522 L21.259,21.3522 L21.259,23.4852 Z M4.267,23.4852 L10.639,23.4852 L10.639,21.3522 L4.267,21.3522 L4.267,23.4852 Z M70.113,27.7522 L80.733,27.7522 L80.733,25.6192 L70.113,25.6192 L70.113,27.7522 Z M60.169,25.6192 L61.001,27.7522 L64.363,27.7522 L65.191,25.6192 L60.169,25.6192 Z M44.624,27.7522 L55.244,27.7522 L55.244,25.6192 L44.624,25.6192 L44.624,27.7522 Z M17.011,25.6192 L17.011,27.7522 L40.97,27.7522 C41.365,27.0932 41.672,26.3772 41.863,25.6192 L41.863,25.6192 L17.011,25.6192 Z M0.019,27.7522 L14.887,27.7522 L14.887,25.6192 L0.019,25.6192 L0.019,27.7522 Z M70.113,32.0192 L80.733,32.0192 L80.733,29.8852 L70.113,29.8852 L70.113,32.0192 Z M61.833,29.8852 L62.676,32.0192 L63.53,29.8852 L61.833,29.8852 Z M44.624,32.0192 L55.244,32.0192 L55.244,29.8852 L44.624,29.8852 L44.624,32.0192 Z M17.011,29.8852 L17.011,32.0192 L33.961,32.0192 C36.205,32.0192 38.216,31.2102 39.738,29.8852 L39.738,29.8852 L17.011,29.8852 Z M0.019,32.0192 L14.887,32.0192 L14.887,29.8852 L0.019,29.8852 L0.019,32.0192 Z" id="path-1"></path>
      </defs>
      <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group-7">
          <mask id="mask-2" fill="white">
            <use xlink:href="#path-1"></use>
          </mask>
          <g id="Clip-2"></g>
          <polygon id="Fill-1" fill="#EC1D24" mask="url(#mask-2)" points="-1 33.0382 86.8 33.0382 86.8 -0.9998 -1 -0.9998"></polygon>
          <polygon id="Fill-3" fill="#2E3092" mask="url(#mask-2)" points="-1 3.3942 86.8 3.3942 86.8 -0.9998 -1 -0.9998"></polygon>
          <polygon id="Fill-4" fill="#2E3092" mask="url(#mask-2)" points="-1 11.8162 86.8 11.8162 86.8 7.4222 -1 7.4222"></polygon>
          <polygon id="Fill-5" fill="#00A550" mask="url(#mask-2)" points="-1 20.3502 86.8 20.3502 86.8 15.9562 -1 15.9562"></polygon>
          <polygon id="Fill-6" fill="#FFF100" mask="url(#mask-2)" points="-1 28.8832 86.8 28.8832 86.8 24.4892 -1 24.4892"></polygon>
        </g>
      </g>
      </svg>`,
      tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      denylist: [],
      allowlist: [],
      end: 'May 5, 2021 0:00:01',
      path: '/',
    },
  },
};

export default mastheadKnobs;
