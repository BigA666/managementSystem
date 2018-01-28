<template>
  <div v-loading='loading'>
      <h1>登陆页面</h1>
      <!-- 修饰符 .trim 去掉前后空格 -->
      <input placeholder="用户名" type="text" v-model.trim='user_name'>
      <input placeholder="密码" type="password"  v-model.trim='user_password'>
      <p>
        <button @click='login' >登陆</button>
        <button @click='go_to_register'>去注册</button>
      </p>
      
  </div>
</template>

<script>
import axios from 'axios'
import {setCookie} from '../../utils/utils'
let newAxios = axios.create({
    baseURL: 'http://localhost:3000'  // 重定向 端口为3000，默认8888
})
export default {
  name: 'login',
  data () {
    return {
        user_name: '',
        user_password: '',
        loading: false
    }
  },
  methods: {
      // 登陆
    login () {
        this.loading = true
        let that = this
        // console.log(this.$route.params.from)
        let params = this.$route.params.from || 'entry'
        newAxios.post('/admin/loginUser', {  // post用对象进行传参
            user_name: this.user_name,
            user_password: this.user_password
        }).then(function({data}) {
            setTimeout(() => {
                that.loading = false
                if(data.code === 1){
                    // document.cookie = 'token='+data.data.token  // 自己设置一个cookie存入document
                    setCookie('token', data.token)
                    that.$store.state.username = that.user_name
                    that.$store.state.authorization = data.authorization
                    that.$router.push({name: params})
                }else{
                    that.$alert(data.msg, '登陆信息有误', {
                        confirmButtonText: '确定',
                        callback: action => {
                            that.user_name = ''
                            that.user_password = ''
                        }
                    })
                }
            }, 2000)
        })
    },
    go_to_register () {  // 去注册
        this.$router.push({name: 'register'})
    }
  }
}
</script>

<style>

</style>
