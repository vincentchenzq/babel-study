import sTable from './s-table'
import sUploader from './s-uploader'
export default {
  install (vue) {
    vue.component('s-table', sTable)
    vue.component('s-uploader', sUploader)
  }
}
