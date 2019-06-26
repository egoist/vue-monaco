import Vue from 'vue'
import MonacoEditor from '../src'
import './style.css'

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
    theme: 'vs',
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
      this.theme = 'vs-dark'
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
