<template>
  <div>
      <h1>注册页面</h1>
      <input placeholder="用户名" type="text" v-model='user_name'>
      <input placeholder="密码" type="password"  v-model='user_password'>
      <p>
        <button @click='register'>确认注册</button>
        <button @click='login'>登陆</button>
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
  name: 'register',
  data () {
    return {
        user_name: '',
        user_password: ''
    }
  },
  methods: {
      register () {
        if(!this.user_name || !this.user_password){
           alert('用户名与密码不可为空')
        }else{
          let that = this
          newAxios.post('/admin/register', {
            user_name: that.user_name,
            user_password: that.user_password,
            authorization: "群众"
          }).then(function({data}) {
            if (data.code === 1) { // 用户已存在
              alert(data.msg)
            }else{
              alert(data.msg)
              setCookie('token', data.token)
              that.$store.state.username = that.user_name
              that.$store.state.authorization = data.authorization
              that.$router.push({name: 'entry'})
            }
            that.user_name = ''
            that.user_password = ''
          })
        }
        
      },
      login () {
        this.$router.push({name: 'login'})
      }
  }
}
</script>

<style>

</style>
