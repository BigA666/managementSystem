<template>
<el-form-item label="请选择地址">
    <el-select v-model="province" placeholder="请选择省" @change="changeProvince">
        <!-- :label 选项展示项   :value 是@change事件 的参数 -->
        <el-option
        v-for="item in options"
        :key="item.name"
        :label="item.name" 
        :value="item.name">
        </el-option>
    </el-select>
    <el-select v-model="city" placeholder="请选择市" @change="changeCity">
        <el-option
        v-for="item in cityArr"
        :key="item.name"
        :label="item.name"
        :value="item.name">
        </el-option>
    </el-select>
    <el-select v-model="area" placeholder="请选择区" @change="changeArea">
        <el-option
        v-for="item in areaArr"
        :key="item"
        :label="item"
        :value="item">
        </el-option>
    </el-select>
    <!-- 无数据 -->
    <!-- <el-select v-model="door" placeholder="请选择门牌" @change="changeDoor">
        <el-option
        v-for="item in options"
        :key="item.name"
        :label="item.name"
        :value="item.name">
        </el-option>
    </el-select> -->
</el-form-item>
    
</template>

<script>
import axios from 'axios'
let newAxios = axios.create({
    baseURL: 'http://localhost:3000'
})
export default {
    name: 'select',
    data () {
        return {
            province: '',
            city: '',
            area: '',
            door: '',
            options: [],
            value: '',
            cityArr: [],
            areaArr: [],
            content: []
        }
    },
    methods: {
        changeProvince (val) {
            this.city = ''
            this.area = ''
            this.options.map((v, k) => {
                if(v.name === val){
                    this.cityArr = v.city
                }
            })
            this.$store.state.selectArr.province = val
        },
        changeCity (val) {
            this.area = ''
            this.cityArr.map((v, k) => {
                if(v.name === val){
                    this.areaArr = v.area
                }
            })
            this.$store.state.selectArr.city = val
        },
        changeArea (val) {
            this.$store.state.selectArr.area = val
        },
        changeDoor () {

        }
    },
    mounted () {
        newAxios.get('/admin/community/location/root').then(data => {
            this.options = data.data
            // console.log(this.options)
        })
    }
}
</script>

<style>

</style>
