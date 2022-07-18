const { resolve } = require('path');
const { merge } = require('webpack-merge');


module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "webpackFinal": (config) => {
    return merge(config, {
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src')
        }
      }
    })
  }
}
