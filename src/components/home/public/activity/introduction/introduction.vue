<template>
    <el-col :span='24'>
        <el-col :span='8'>
            <p>基本信息</p>
            <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/user/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>  
        </el-col>
        <el-col :span='15' :offset='1'>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="活动名称">
                    <el-input v-model="formLabelAlign.name" placeholder="春暖花开4月生日会"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <div class="block">
                        <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <mySelect></mySelect>
            </el-form>   
        </el-col>
        <column v-for='(v, k) in $store.state.introductArr' :key='$store.state.introductArr[k].id' :index='k' :mark='"introductArr"' :id='$store.state.introductArr[k].id'></column>
        <el-row :span='24'><el-button type="primary" class="preBtn" @click='preBtn'>保存并发布</el-button></el-row>
    </el-col>
</template>

<script>
import mySelect from './select/select'
import column from '../../column/column'
import axios from 'axios'
let newAxios = axios.create({
    baseURL: 'http://localhost:3000'
})
export default {
    name: 'introduction',
    data () {
        return {
            imageUrl: '',
            labelPosition: 'top',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            value1: '' 
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === ('image/jpeg' || 'image/jpg' || 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;
            // file.size 单位 B字节
            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        preBtn () {
            let that = this
            newAxios.post('/admin/savePre',{
                headPortrait: this.imageUrl,
                activityName: this.formLabelAlign.name,
                activityTime: this.value1,
                imageUrl: this.$store.state.introductArr,
                selectArr: this.$store.state.selectArr
            }).then(({data}) => {
                this.$alert(data.msg, '提交', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                })
                
            })
        }
    },
    components: {
        mySelect,
        column
    }
}
</script>

<style scopedSlots>
.preBtn {
    margin: 0.2rem auto 0.2rem;
    display: block;
}
</style>
