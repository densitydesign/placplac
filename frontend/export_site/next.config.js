const path = require("path");

module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const newConfig = { ...config };
    newConfig.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        react: path.join(__dirname, "node_modules/react"),
        "react-dom": path.join(__dirname, "node_modules/react-dom"),
      },
    };
    return newConfig;
  },
};
