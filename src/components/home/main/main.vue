<template>
<el-main>
    <el-col class="menu" :span='24'>
        <el-col :span='12'>
            <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="white"
                text-color="black"
                active-text-color="#ffd04b" :span='12'>
                <el-menu-item index="1" @click='fn("entry")'>一口式受理平台</el-menu-item>
                <el-menu-item index="2" @click='fn("grid")'>网格化管理平台></el-menu-item>
                <el-menu-item index="3" @click='fn("public")'>公共服务平台</el-menu-item>
            </el-menu>   
        </el-col>
        <el-col :span='12'>
            <el-menu
                class="el-menu-demo menu-right"
                mode="horizontal"
                background-color="white"
                text-color="black"
                active-text-color="#ffd04b">
                <el-menu-item index="1"><i class="fa fa-home"></i></el-menu-item>
                <el-menu-item index="2"><i class="fa fa-home"></i></el-menu-item>
                <el-submenu index="3">
                    <template slot="title"><i class="fa fa-home"></i> {{$store.state.job}} {{$store.state.username}} </template>
                    <el-menu-item index="2-1" @click="loginOut">退出</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-col>
    <p class="contentP">{{$store.state.content}}</p>
    <router-view></router-view>
</el-main>
</template>

<script>
import axios from 'axios'
import {delCookie} from '../../../utils/utils'
let newAxios = axios.create({
    baseURL: 'http://localhost:3000'
})
export default {
    name: 'main',
    methods: {
        fn (path) {
            this.$router.push({name: path})
            newAxios.post('/admin/menu/'+path).then(({data}) => {
                this.$store.commit('update_menu', data.data)
            })
        },
        loginOut () { // 退出
            delCookie('token')
            this.$router.push({name: 'login'})
        }
    }
}
</script>

<style scopedSlots>
.el-main {
    background: #eee;
    padding: 0; 
}
.menu {
    display: flex
}
.contentP {
    margin: 0.2rem auto;
    margin-bottom: 0;
    padding: 0.2rem 0 0.1rem 0.2rem;
    box-sizing: border-box;
    clear: both;
    display: block;
    background: #eee;
}
.menu-right {
    display: flex;
    justify-content: flex-end;
}
</style>
