<template>
  <el-container>
    <myMenu></myMenu>
    <myMain></myMain>
  </el-container>
</template>

<script>
import myMenu from './menu/menu.vue'
import myMain from './main/main.vue'
export default {
  name: 'index',
  components: {
    myMenu,
    myMain
  }

};
</script>

<style>
.el-container {
  width: 100%;
  height: 100%;

}
</style>
