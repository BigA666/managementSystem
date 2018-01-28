import home from '../components/home/home.vue'
import entry from '../components/home/entry/entry.vue'
import grid from '../components/home/grid/grid.vue'
import publicServer from '../components/home/public/public.vue'

import login from '../components/login/login.vue'
import register from '../components/register/register.vue'

let routes = [
    {
        path: '/home',
        name: 'home',
        component: home,
        children: [
            {
                path: 'entry',
                name: 'entry',
                component: entry
            },
            {
                path: 'grid',
                name: 'grid',
                component: grid
            },
            {
                path: 'public',
                name: 'public',
                component: publicServer,
                children: [
                    {
                        path: 'communityBirthday',
                        name: 'communityBirthday'
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/',
        redirect: '/login'
    }
]
export default routes

// {
//     path: '/index',
//     component: {
//         template: '<h1>6666</h1>'
//     }
// }