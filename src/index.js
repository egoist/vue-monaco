import MonacoEditor from './MonacoEditor'

export default MonacoEditor

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(MonacoEditor.name, MonacoEditor)
}
