module.exports = {
  entry: 'example/index.js',
  outDir: 'example/dist',
  chainWebpack(config) {
    config.plugin('monaco')
      .use(require('monaco-editor-webpack-plugin'))
  },
  babel: {
    jsx: 'vue'
  }
}
