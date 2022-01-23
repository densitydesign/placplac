const url = require('postcss-url');
module.exports = {
  plugins: [url({ url: 'inline' })],
};
