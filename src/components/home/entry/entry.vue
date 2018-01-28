<template>
  <div class="divPadding">
    <!-- 活动列表 -->
    <activeList>
    </activeList>
    <div class="btns">
      <el-button type="primary" plain @click='fn(true)'>活动信息与报名</el-button>
      <el-button type="primary" plain @click='fn(false)'>人员管理</el-button>
    </div>
    
    <activeInfo v-if='bool'></activeInfo>
    <signUpList v-else></signUpList>
    
  </div>
</template>

<script>
import activeList from './activeList/activeList'
import signUpList from './signUpList/signUpList'
import activeInfo from './activeInfo/activeInfo'
export default {
  name: 'entry',
  components: {
    activeList,
    signUpList,
    activeInfo
  },
  data () {
    return {
      bool: true
    }
  },
  methods: {
    fn (bool) {
      this.bool = bool
    }
  }
}
</script>

<style>
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.3rem;
    margin-top: 2rem;
    clear: both;
  }
</style>
