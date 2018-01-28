import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import {getCookie} from '../utils/utils'
Vue.use(VueRouter)

let router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    
    if(to.name != 'login' && to.name != 'register'){
        if(getCookie('token')){
            next()
        }else{
            next('/login')
        }
        
    }else {
        next()
    }
})
export default router