import sFile from './s-file'
import sInput from './s-input'
export default {
  install (vue) {
    vue.component('s-file', sFile)
    vue.component('s-input', sInput)
  }
}
