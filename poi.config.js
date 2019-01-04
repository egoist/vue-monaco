module.exports = {
  entry: 'example/index.js',
  output: {
    dir: 'example/dist'
  },
  chainWebpack(config) {
    config.plugin('monaco').use(require('monaco-editor-webpack-plugin'))
  },
  babel: {
    jsx: 'vue'
  }
}
