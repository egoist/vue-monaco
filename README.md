# vue-monaco

[![NPM version](https://img.shields.io/npm/v/vue-monaco.svg?style=flat)](https://npmjs.com/package/vue-monaco) [![NPM downloads](https://img.shields.io/npm/dm/vue-monaco.svg?style=flat)](https://npmjs.com/package/vue-monaco) [![CircleCI](https://circleci.com/gh/egoist/vue-monaco/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/vue-monaco/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

*[Monaco Editor](https://github.com/Microsoft/monaco-editor) is the code editor that powers VS Code.*

## Install

```bash
yarn add vue-monaco
```

## Usage

<details><summary>You need to include monaco-editor first.</summary>

Then use the component:

```html
<script src="/path/to/monaco-editor/min/vs/loader.js"></script>
<script>
  require.config({ 
    paths: { 
      vs: '/path/to/monaco-editor/min/vs'
    }
  })
</script>
```
</details>

```vue
<template>
  <monaco-editor
    v-model="code"
    language="javascript">
  </monaco-editor>
</template>

<script>
import MonacoEditor from 'vue-monaco'

export default {
  components: {
    MonacoEditor
  },

  data() {
    return {
      code: 'const noop = () => {}'
    }
  }
}
</script>
```

### Props

- `code`
- `language`
- `theme`
- `options`

### Events

- `change`: Emitted when the value is changed, args:
  - `newValue`
- `focus`: Emitted when the editor is focused.
- `blur`: Emitted when the editor loses focus.

### Methods

- `getMonaco(): IStandaloneCodeEditor`: Return the [editor instance](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html).

Use `ref` to interact with the `MonacoEditor` component in order to access methods: `<MonacoEditor ref="editor"></MonacoEditor>`, then `this.$refs.editor.getMonaco()` will be available.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**vue-monaco** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/vue-monaco/contributors)).

> [egoist.moe](https://egoist.moe) · GitHub [@egoist](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
