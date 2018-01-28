import './common/css/font-awesome.min.css'
import './common/css/reset.css'
import './common/css/common.css'
import './common/css/style.css'

import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import ElementUI from 'element-ui' // 依赖vue 
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
import store from './store/store'
import mock from './mock/index'

// let fs = require('fs')
mock.boostrap()

import router from './router/index.js'
import App from './App.vue'


// .runtime.esm 报错 该vue/package.json  中的 moudule  改为 dist/vue.js  ，该main 是没有用的
new Vue({
    el: '.container',
    router,
    store,
    render: function(createElement){ // 级别最高
        return createElement(App)
    },
    // render:(h)=>h(app)

})
if(module.hot){
    module.hot.accept() // 热替换
}