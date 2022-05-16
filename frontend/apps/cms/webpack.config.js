// Helper for combining webpack config objects
const { merge } = require('webpack-merge');
const webpack = require('webpack');

module.exports = (config, context) => {
  return merge(config, {
    plugins: [
      // fix "process is not defined" error:
      // (do "npm install process" before running the build)
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  });
};
