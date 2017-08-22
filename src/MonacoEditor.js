// eslint-disable-next-line no-unused-vars
import assign from 'nano-assign'

export default {
  name: 'MonacoEditor',

  props: {
    value: String,
    theme: {
      type: String,
      default: 'vs'
    },
    language: String,
    options: Object
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
    const options = {
      value: this.value,
      theme: this.theme,
      language: this.language,
      ...this.options
    }

    window.require(['vs/editor/editor.main'], () => {
      this.editor = window.monaco.editor.create(this.$el, options)
      this.editor.onDidChangeModelContent(event => {
        const value = this.editor.getValue()
        if (this.value !== value) {
          this.$emit('change', value, event)
        }
      })
      this.editor.onDidFocusEditor(() => {
        this.$emit('focus')
      })
      this.editor.onDidBlurEditor(() => {
        this.$emit('blur')
      })
    })
  },

  beforeDestroy() {
    this.editor && this.editor.dispose()
  },

  methods: {
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
