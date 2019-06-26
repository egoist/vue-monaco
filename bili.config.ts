import { Config } from 'bili'

const config: Config = {
  input: 'src/index.js',
  output: {
    format: ['esm', 'umd'],
    moduleName: 'VueMonaco',
    fileName({ format }) {
      if (format === 'esm') {
        return 'vue-monaco.es.js'
      }
      return 'vue-monaco.js'
    }
  },
  externals: ['monaco-editor']
}

export default config
