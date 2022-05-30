// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  basePath: process.env.NX_BASE_PATH,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl$/,
      loader: 'raw-loader',
      exclude: /node_modules/,
    });

    return config;
  },
};

module.exports = withNx(nextConfig);
