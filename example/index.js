import Vue from 'vue'
import MonacoEditor from '../src'
import customThemeData from './custom-theme.js/index.js'
import './style.css'

const customTheme = {
  name: 'custom-theme',
  data: customThemeData
}

const code = `
function foo() {
  return 'foo'
}
`.trim()

const markdownCode = `
<template>
  <div id="app">hello</div>
</template>

<script>
export default {
  data() {
    return {
      foo: 'foo'
    }
  }
}
</script>
`

new Vue({
  el: '#app',

  data: {
    code,
    language: 'javascript',
    customTheme: {},
    theme: 'vs-dark',
    options: {
      lineNumbers: true
    }
  },

  methods: {
    updateCode() {
      this.language = 'html'
      this.code = markdownCode
      this.options.tabSize = 8
      this.options.lineNumbers = false
      this.customTheme = customTheme
    }
  },

  render() {
    return (
      <div id="app">
        <button onClick={this.updateCode}>update</button>
        <MonacoEditor
          class="editor"
          value={this.code}
          language={this.language}
          customTheme={this.customTheme}
          theme={this.theme}
          options={this.options}
          onChange={newValue => (this.code = newValue)}
        />
        <MonacoEditor
          class="editor"
          diffEditor={true}
          original={`original value`}
          value={this.code}
          language={this.language}
          theme={this.theme}
          options={this.options}
          onChange={newValue => (this.code = newValue)}
        />
      </div>
    )
  }
})
