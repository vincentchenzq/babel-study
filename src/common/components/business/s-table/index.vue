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
export default {
  data () {
    return {
      componentName: 's-table'
    }
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
