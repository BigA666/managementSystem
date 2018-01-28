<template>
<el-aside>
    <el-row class="tac">
        <el-col :span="24">
            <div class="tac_div">
                <h1>三鑫智慧社区</h1>
                <h3>公共管理平台</h3>
                <dl class="potrit">
                    <dt><img src="../../../common/images/zhihu_072.png"></dt>
                    <dd>
                    {{$store.state.authorization}}：{{$store.state.username}}
                    </dd>
                </dl>
            </div>

            <!-- menu -->
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu v-for='(v, k) in $store.state.menuData' :key='k' :index='k+""'>
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{v.name}}</span>
                </template>
                <el-submenu v-for = '(val, key) in v.submenus' :index='k+"-"+key' :key='key'>
                    <template slot="title">{{val.name}}</template>
                    <el-submenu v-for = '(value, keyk) in val.submenus' :index='k+"-"+key+keyk' :key='keyk'>
                        <template slot="title"><span @click="spanTo">{{value.name}}</span></template>
                    </el-submenu>
                </el-submenu>
            </el-submenu>
            <!-- <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                </template>
                <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            -->
            </el-menu>
        </el-col>
    </el-row> 
</el-aside>

</template>

<script>
import axios from 'axios'
export default {
  name: 'menu',
  methods: {
    handleOpen(key, keyPath) {
        let arr = key.split('-')
        let brr = [+arr[0]]
        let content = this.$store.state.menuData[brr[0]].name
        if(arr[1]){
          brr.push(+arr[1].slice(0,1))
          content += ' > ' + this.$store.state.menuData[brr[0]].submenus[brr[1]].name
          if(arr[1].slice(1)){
              brr.push(+arr[1].slice(1))
              content += ' > ' + this.$store.state.menuData[brr[0]].submenus[brr[1]].submenus[brr[2]].name
          }
        }
        
        this.$store.state.content = content
    
    },
    handleClose(key, keyPath) {
        let arr = key.split('-')
        let brr = [+arr[0]]
        let content = this.$store.state.menuData[brr[0]].name
        if(arr[1]){
          brr.push(+arr[1].slice(0,1))
          content += ' > ' + this.$store.state.menuData[brr[0]].submenus[brr[1]].name
          if(arr[1].slice(1)){
              brr.push(+arr[1].slice(1))
              content += ' > ' + this.$store.state.menuData[brr[0]].submenus[brr[1]].submenus[brr[2]].name
          }
        }
        this.$store.state.content = content
    },
    spanTo () {
        // alert(2)
    }
  }
}
</script>

<style scoped>
  .el-aside {
      background: #545c64;
      height: 100%;
  }
  .el-aside .el-menu {
      width: 100%;
  }
  .potrit img {
    width: 20%; 
    border-radius: 50%;

  }
  .tac {
      background-color: #545c64;
      color: white
  }
  .tac_div h1, h3, dl{
      text-align: center;
      margin: 0.2rem
  }
</style>
