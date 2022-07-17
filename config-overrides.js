const path = require('path');
const {
  override,
  addWebpackModuleRule,
  addWebpackPlugin,
  addWebpackAlias,
} = require('customize-cra');

module.exports = {
    webpack: override(
      // addWebpackModuleRule({
      //   test: /\.svg$/,
      //   loader: '@svgr/webpack',
      // }),
      addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
      })
    ),
  };
  