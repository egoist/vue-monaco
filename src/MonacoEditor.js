// eslint-disable-next-line no-unused-vars
import assign from 'nano-assign'
import * as monaco from 'monaco-editor'

export default {
  name: 'MonacoEditor',

  props: {
    value: String,
    theme: {
      type: String,
      default: 'vs'
    },
    language: String,
    options: Object,
    amd: {
      type: Boolean,
      default: false
    },
    require: {
      type: Function,
      default: window.require
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
          this.editor.updateOptions(options)
        }
      }
    },

    value(newValue) {
      if (this.editor) {
        if (newValue !== this.editor.getValue()) {
          this.editor.setValue(newValue)
        }
      }
    },

    language(newVal) {
      if (this.editor) {
        window.monaco.editor.setModelLanguage(this.editor.getModel(), newVal)
      }
    },

    theme(newVal) {
      if (this.editor) {
        window.monaco.editor.setTheme(newVal)
      }
    }
  },

  mounted() {
    if (this.amd) {
      this.require(['vs/editor/editor.main'], () => {
        this.initMonaco(window.monaco)
      })
    } else {
      this.initMonaco(monaco)
    }
  },

  beforeDestroy() {
    this.editor && this.editor.dispose()
  },

  methods: {
    initMonaco(monaco) {
      const options = assign({
        value: this.value,
        theme: this.theme,
        language: this.language
      }, this.options)

      this.editor = monaco.editor.create(this.$el, options)
      this.$emit('editorDidMount', this.editor)
      this.editor.onContextMenu(event => this.$emit('contextMenu', event))
      this.editor.onDidBlurEditor(() => this.$emit('blur'))
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
      this.editor.onDidFocusEditor(() => this.$emit('focus'))
      this.editor.onDidFocusEditorText(() => this.$emit('focusText'))
      this.editor.onDidLayoutChange(event => this.$emit('layout', event))
      this.editor.onDidScrollChange(event => this.$emit('scroll', event))
      this.editor.onKeyDown(event => this.$emit('keydown', event))
      this.editor.onKeyUp(event => this.$emit('keyup', event))
      this.editor.onMouseDown(event => this.$emit('mouseDown', event))
      this.editor.onMouseLeave(event => this.$emit('mouseLeave', event))
      this.editor.onMouseMove(event => this.$emit('mouseMove', event))
      this.editor.onMouseUp(event => this.$emit('mouseUp', event))
    },

    getMonaco() {
      return this.editor
    },

    focus() {
      this.editor.focus()
    }
  },

  render(h) {
    return h('div')
  }
}
