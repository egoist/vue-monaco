# vue-monaco

[![NPM version](https://img.shields.io/npm/v/vue-monaco.svg?style=flat)](https://npmjs.com/package/vue-monaco) [![NPM downloads](https://img.shields.io/npm/dm/vue-monaco.svg?style=flat)](https://npmjs.com/package/vue-monaco) [![CircleCI](https://circleci.com/gh/egoist/vue-monaco/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/vue-monaco/tree/master) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

_[Monaco Editor](https://github.com/Microsoft/monaco-editor) is the code editor that powers VS Code._

## Install

```bash
yarn add vue-monaco
```

## Usage

### Use ESM version with webpack

Use [monaco-editor-webpack-plugin](https://github.com/Microsoft/monaco-editor-webpack-plugin):

```js
// webpack.config.js
const MonocoEditorPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  plugins: [
    new MonocoEditorPlugin({
      // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      // Include a subset of languages support
      // Some language extensions like typescript are so huge that may impact build performance
      // e.g. Build full languages support with webpack 4.0 takes over 80 seconds
      // Languages are loaded on demand at runtime
      languages: ['javascript', 'css', 'html']
    })
  ]
}
```

Then use the component:

```vue
<template>
  <monaco-editor class="editor" v-model="code" language="javascript">
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

<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>
```

### Use AMD version

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
  </head>
  <body>
    <div
      id="container"
      style="width:800px;height:600px;border:1px solid grey"
    ></div>

    <script src="monaco-editor/min/vs/loader.js"></script>
    <script src="https://unpkg.com/vue"></script>
    <script src="https://unpkg.com/vue-monaco"></script>
    <script>
      require.config({ paths: { vs: 'monaco-editor/min/vs' } })

      new Vue({
        template: `<monaco-editor v-model="code" language="javascript" :amdRequire="amdRequire" />`,
        data: {
          code: 'const noop = () => {}'
        },
        methods: {
          amdRequire: require
        }
      })
    </script>
  </body>
</html>
```

When loading monaco-editor from a CDN, you need to change `require.config` to look like this:

```js
require.config({ paths: { vs: 'http://www.mycdn.com/monaco-editor/min/vs' } })

// Before loading vs/editor/editor.main, define a global MonacoEnvironment that overwrites
// the default worker url location (used when creating WebWorkers). The problem here is that
// HTML5 does not allow cross-domain web workers, so we need to proxy the instantiation of
// a web worker through a same-domain script
window.MonacoEnvironment = {
  getWorkerUrl: function(workerId, label) {
    return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: 'http://www.mycdn.com/monaco-editor/min/'
        };
        importScripts('http://www.mycdn.com/monaco-editor/min/vs/base/worker/workerMain.js');`)}`
  }
}
```

### Props

- `options`: The [second argument](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html) of [`monaco.editor.create`](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#create).
- `code`: A shortcut to set `options.value`.
- `theme`: A shortcut to set `options.theme`.
- `language`: A shortcut to set `options.language`.
- `amdRequire`: Load monaco-editor using given amd-style require function.

### Events

| Event              | IStandaloneCodeEditor Event | Parameters                                  |
| ------------------ | --------------------------- | ------------------------------------------- |
| `editorDidMount`   |                             | IStandaloneCodeEditor                       |
| `contextMenu`      | onContextMenu               | IEditorMouseEvent                           |
| `blur`             | onDidBlurEditor             |                                             |
| `blurText`         | onDidBlurEditorText         |                                             |
| `configuration`    | onDidBlurEditorText         | IConfigurationChangedEvent                  |
| `position`         | onDidChangeCursorPosition   | ICursorPositionChangedEvent                 |
| `selection`        | onDidChangeCursorSelection  | ICursorSelectionChangedEvent                |
| `model`            | onDidChangeModel            | IModelChangedEvent                          |
| `change`           | onDidChangeModelContent     | value: string, e: IModelContentChangedEvent |
| `modelDecorations` | onDidChangeModelDecorations | IModelDecorationsChangedEvent               |
| `modelLanguage`    | onDidChangeModelLanguage    | IModelLanguageChangedEvent                  |
| `modelOptions`     | onDidChangeModelOptions     | IModelOptionsChangedEvent                   |
| `afterDispose`     | onDidDispose                |                                             |
| `focus`            | onDidFocusEditor            |                                             |
| `focusText`        | onDidFocusEditorText        |                                             |
| `layout`           | onDidLayoutChange           | EditorLayoutInfo                            |
| `scroll`           | onDidScrollChange           | IScrollEvent                                |
| `keydown`          | onKeyDown                   | IKeyboardEvent                              |
| `keyup`            | onKeyUp                     | IKeyboardEvent                              |
| `mouseDown`        | onMouseDown                 | IEditorMouseEvent                           |
| `mouseLeave`       | onMouseLeave                | IEditorMouseEvent                           |
| `mouseMove`        | onMouseMove                 | IEditorMouseEvent                           |
| `mouseUp`          | onMouseUp                   | IEditorMouseEvent                           |

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

> [Website](https://egoist.sh) · GitHub [@egoist](https://github.com/egoist) · Twitter [@\_egoistlily](https://twitter.com/_egoistlily)
