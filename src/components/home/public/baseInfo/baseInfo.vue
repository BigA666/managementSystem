<template>
    <div class="info">
        <h2>基本信息</h2>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="责任人">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="温馨提示">
                <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
        </el-form>

        <!-- 上传图片 -->
        <column v-for='(v, k) in $store.state.arr' :key='$store.state.arr[k].id' :index='k' :mark='"arr"' :id='$store.state.arr[k].id'></column>

        <p class="btns">
            <el-button type="primary">保存并发布</el-button>
        </p>
    </div>
</template>

<script>
import column from '../column/column.vue'
export default {
    name: 'baseInfo',
    data () {
        return {
            labelPosition: 'top',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            }
        } 
    },
    components: {
        column
    }
}
</script>

<style>
.info {
    padding: 0.2rem;
    box-sizing: border-box;
}
</style>
