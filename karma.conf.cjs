const webpackConfig = require('./webpack.karma.config.cjs');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/tests/setup.js',
      { pattern: 'src/**/*.spec.js', watched: false },
      { pattern: 'src/**/*.test.js', watched: false }
    ],
    preprocessors: {
      'src/tests/setup.js': ['webpack'],
      'src/**/*.spec.js': ['webpack'],
      'src/**/*.test.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    reporters: ['progress'],
    browsers: ['jsdom'],
    browserNoActivityTimeout: 20000,
    singleRun: true,
    concurrency: Infinity
  });
};
