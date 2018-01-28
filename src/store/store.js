import vue from 'vue'
import Vuex from 'vuex' 
import menuEntry from '../../server/data/entry.json'
import axios from 'axios'
vue.use(Vuex)

let newAxios = axios.create({
    baseURL: 'http://localhost:3000'
})

let store = new Vuex.Store({
    state: {
        username: '',
        authorization: '',
        imageUrl: '',
        menuData: menuEntry.data,
        content: menuEntry.data[0].name,
        arr: [{
            hasDelete: false,
            imageUrl: '',
            id: 0
        }],
        publicBool: true,
        introductArr: [{
            hasDelete: false,
            imageUrl: '',
            id: 0
        }],
        selectArr: {
            province: '',
            city: '',
            area: ''
        },
        carousel: []
    },
    mutations: {
        update_menu (state, data) { // 菜单更新
            state.menuData = data
            state.content = data[0].name 
        },
        carousel (state) {
            newAxios.post('/admin/carousel').then((data) => {
                state.carousel = data.data
            })
            
        },
        add_column (state, mark) {
            let id = state[mark][state[mark].length-1].id
            state[mark].push({
                hasDelete: true,
                imageUrl: '', // 因为删除的bug想出来的解决方案
                id: id + 1
            })
        },
        del_column (state, data) {
            state[data.mark].splice(data.index, 1)
        },
        setImageUrl (state, data) {
            state[data.mark][data.index].imageUrl = data.url
        }
    },
    actions: {

    },
    modules: {

    },
    getters: {
        
    }
})
export default store