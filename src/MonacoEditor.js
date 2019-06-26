import assign from 'nano-assign'

export default {
  name: 'MonacoEditor',

  props: {
    original: String,
    value: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      default: 'vs'
    },
    language: String,
    options: Object,
    amdRequire: {
      type: Function
    },
    diffEditor: {
      type: Boolean,
      default: false
    }
  },

  model: {
    event: 'change'
  },

  watch: {
    options: {
      deep: true,
      handler(options) {
        if (this.editor) {
          const editor = this.getModifiedEditor()
          editor.updateOptions(options)
        }
      }
    },

    value(newValue) {
      if (this.editor) {
        const editor = this.getModifiedEditor()
        if (newValue !== editor.getValue()) {
          editor.setValue(newValue)
        }
      }
    },

    language(newVal) {
      if (this.editor) {
        const editor = this.getModifiedEditor()
        this.monaco.editor.setModelLanguage(editor.getModel(), newVal)
      }
    },

    theme(newVal) {
      if (this.editor) {
        this.monaco.editor.setTheme(newVal)
      }
    }
  },

  mounted() {
    if (this.amdRequire) {
      this.amdRequire(['vs/editor/editor.main'], () => {
        this.monaco = window.monaco
        this.initMonaco(window.monaco)
      })
    } else {
      // ESM format so it can't be resolved by commonjs `require` in eslint
      // eslint-disable-next-line import/no-unresolved
      const monaco = require('monaco-editor')
      this.monaco = monaco
      this.initMonaco(monaco)
    }
  },

  beforeDestroy() {
    this.editor && this.editor.dispose()
  },

  methods: {
    initMonaco(monaco) {
      const options = assign(
        {
          value: this.value,
          theme: this.theme,
          language: this.language
        },
        this.options
      )

      if (this.diffEditor) {
        this.editor = monaco.editor.createDiffEditor(this.$el, options)
        const originalModel = monaco.editor.createModel(
          this.original,
          this.language
        )
        const modifiedModel = monaco.editor.createModel(
          this.value,
          this.language
        )
        this.editor.setModel({
          original: originalModel,
          modified: modifiedModel
        })
      } else {
        this.editor = monaco.editor.create(this.$el, options)
        this.editor.onContextMenu(event => this.$emit('contextMenu', event))
        this.editor.onDidBlurEditorWidget(() => this.$emit('blur'))
        this.editor.onDidBlurEditorText(() => this.$emit('blurText'))
        this.editor.onDidChangeConfiguration(event =>
          this.$emit('configuration', event)
        )
        this.editor.onDidChangeCursorPosition(event =>
          this.$emit('position', event)
        )
        this.editor.onDidChangeCursorSelection(event =>
          this.$emit('selection', event)
        )
        this.editor.onDidChangeModel(event => this.$emit('model', event))
        this.editor.onDidChangeModelContent(event => {
          const value = this.editor.getValue()
          if (this.value !== value) {
            this.$emit('change', value, event)
          }
        })
        this.editor.onDidChangeModelDecorations(event =>
          this.$emit('modelDecorations', event)
        )
        this.editor.onDidChangeModelLanguage(event =>
          this.$emit('modelLanguage', event)
        )
        this.editor.onDidChangeModelOptions(event =>
          this.$emit('modelOptions', event)
        )
        this.editor.onDidDispose(event => this.$emit('afterDispose', event))
        this.editor.onDidFocusEditorWidget(() => this.$emit('focus'))
        this.editor.onDidFocusEditorText(() => this.$emit('focusText'))
        this.editor.onDidLayoutChange(event => this.$emit('layout', event))
        this.editor.onDidScrollChange(event => this.$emit('scroll', event))
        this.editor.onKeyDown(event => this.$emit('keydown', event))
        this.editor.onKeyUp(event => this.$emit('keyup', event))
        this.editor.onMouseDown(event => this.$emit('mouseDown', event))
        this.editor.onMouseLeave(event => this.$emit('mouseLeave', event))
        this.editor.onMouseMove(event => this.$emit('mouseMove', event))
        this.editor.onMouseUp(event => this.$emit('mouseUp', event))
      }

      this.$emit('editorDidMount', this.editor)
    },

    /** @deprecated */
    getMonaco() {
      return this.editor
    },

    getEditor() {
      return this.editor
    },

    getModifiedEditor() {
      return this.diffEditor ? this.editor.getModifiedEditor() : this.editor
    },

    focus() {
      this.editor.focus()
    }
  },

  render(h) {
    return h('div')
  }
}
