<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <s-file/>
  </div>
</template>

<script>
import sFile from '@/common/components/basic/s-file'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    sFile: sFile
  },
  mounted () {
    this.$Message.info(`当前使用的常量模块是 ${this.$constant.moduleA.moduleName}`)
  }
}
</script>
