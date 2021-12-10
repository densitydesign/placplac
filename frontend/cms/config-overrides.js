module.exports = function override(config, env) {
  //do stuff with the webpack config...

  return {
    ...config,
    devServer: {
      ...config.devServer,
      watchOptions: {
        ignored: /\.#|public|~$/,
      },
    },
  };
};
