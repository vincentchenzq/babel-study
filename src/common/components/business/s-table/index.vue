<template>
  <div class="s-table">
    business-component:
    {{ componentName }}
    <div class="s-table--content">
      <s-input />
      <s-file />
    </div>
  </div>
</template>

<script>
import sFile from '@/common/components/basic/s-file'
import sInput from '@/common/components/basic/s-input'
export default {
  data () {
    return {
      componentName: 's-table'
    }
  },
  components: {
    sInput: sInput,
    sFile: sFile
  }
}
</script>

<style lang="less" scoped>
.s-table {
  border: 1px solid green;
  &--content{
    border:1px solid red;
  }
}
</style>
