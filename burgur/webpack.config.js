const path = require('path');

module.exports = {
  // webpack 설정 옵션들...
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify")
    }
  },
  // webpack 로더, 플러그인 설정 등...
};
