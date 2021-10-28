// config-overrides.js
const path = require("path");

module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...
  const newConfig = { ...config };
  newConfig.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      react: path.join(__dirname, "node_modules/react"),
      "react-dom": path.join(__dirname, "node_modules/react-dom"),
      "react-router": path.join(__dirname, "node_modules/react-router"),
      "react-router-dom": path.join(__dirname, "node_modules/react-router-dom"),
    },
  };
  return newConfig;
};
