<template>
<div class="column">
    <p class="column-top">
        <input type="text" placeholder="请输入栏目名称" class="columnName">
        <span class="skyblue">编辑</span>
        <span class="skyblue" @click="add_column">添加栏目</span>
        <span class="preview" @click="dialogVisible=true">预览</span>
        <span v-if='$store.state[mark][index].hasDelete' class="del" @click='del_column'>删除</span>
    </p>
    
<!-- 图片上传 element框架--> 
    <!-- <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/user/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="arr[index].imageUrl" :src="arr[index].imageUrl" class="avatar">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>  -->
    
    


<!-- 图片上传原生js -->
    <div class="el-upload el-upload--text div">
        <!-- enctype属性规定在发送到服务器之前应该如何对表单数据进行编码，默认的编码是：”application/x-www-form-urlencoded“。对于普通数据是挺适用的，但是，对于文件，就不能乱编码了，该什么就是什么，只能使用multipart/form-data作为enctype属性值。 -->
        <!-- <form ref="uploader" action="http://localhost:3000/user/upload" method="POST" enctype="multipart/form-data"> -->
            
            <!-- multiple 可上传多次图片--> 
            <img  v-if="$store.state[mark][index].imageUrl" :src="$store.state[mark][index].imageUrl" alt="" class="ysImg">

            <label :for="'file_'+id" class="el-icon-plus avatar-uploader-icon" v-else></label> 
            <input name="file" @change="upload_change" type="file" class="upload-input" :id="'file_'+id" style="display:none" multiple>      
        <!-- </form> -->
    </div>
    <p>图片格式：jpg\png  图片大小：小于2MB 建议尺寸：宽度大于800px</p>
    
 <!-- 预览 -->
    <el-dialog
    title="预览图片"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
        <span><img :src='$store.state[mark][index].imageUrl' alt="" class='previewImg'></span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>


 <!-- 该预览有问题 -->
    <!-- <el-dialog
    title="预览图片"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
        <span><img :src='imageUrl' alt="" class='previewImg'></span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog> -->
</div>
    
</template>

<script>
import axios from 'axios'
let newAxios = axios.create({
    baseURL: 'http://localhost:3000'
})
export default {
    name: 'column',
    data () {
        return {
            dialogVisible: false
        }
    },
    props: ['index', 'mark', 'id'],
    methods: {
        add_column () { // 添加栏目
            this.$store.commit('add_column', this.mark)
        },
        del_column () { // 删除栏目
            this.$store.commit('del_column', {
                mark: this.mark,
                index: this.index
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done()
            })
            .catch(_ => {});
        },
        upload_change (e) { // 原生上传图片
            let fd = new FormData() // window下的方法FormData
            let that = this
            // console.log(fd)
            // 上传多个图片
            for(let i=0; i<Array.from(e.target.files).length; i++){
                fd.append('file', e.target.files[i])
            }
            // fd.append('file', e.target.files[0])  // 上传一张图片
            newAxios.post('user/upload', fd).then(res => {
                // console.log(fd)
                console.log(res.data)
                this.$store.commit('setImageUrl',{
                    index: that.index,
                    url: 'http://localhost:3000/' + res.data[0].path,
                    mark: this.mark
                })
                
            })
            
            // this.$refs.uploader.submit()
        },
    // handleAvatarSuccess(res, file) {
        //     // this.arr[this.index].imageUrl = URL.createObjectURL(file.raw);
        //     this.imageUrl = URL.createObjectURL(file.raw);
        //     // console.log(this.imageUrl)
            
        // },
        // beforeAvatarUpload(file) {
        //     const isJPG = file.type === ('image/jpeg' || 'image/jpg' || 'image/png');
        //     const isLt2M = file.size / 1024 / 1024 < 2;
        //     // file.size 单位 B字节
        //     if (!isJPG) {
        //     this.$message.error('上传头像图片只能是 JPG 格式!');
        //     }
        //     if (!isLt2M) {
        //     this.$message.error('上传头像图片大小不能超过 2MB!');
        //     }
        //     return isJPG && isLt2M;
        // }
    }
}
</script>

<style scopedSlots>
    /* .div {
        width: 100px;
        height: 100px;
        background: black;
    } */
    .ysImg {
        width: 100%;
        height: 1.5rem;
    }
    .column {
        margin: 0.2rem 0;
        padding: 0.1rem;
        box-sizing: border-box;
    }
    .column-top {
        margin: 0.1rem 0.1rem;
    }
    .skyblue {
        color: skyblue;
        margin: 0 0.1rem;
    }
    .preview {
        color: gray;
    }
    .del {
        color: red;
    }
    .columnName {
        border: none;
        outline: none;
    }
    .previewImg {
        width: 100%;
        height: auto
    }
    .avatar-uploader {
        border: 1px solid #ccc;
        margin: 0.1rem 0;
    }
    .avatar-uploader .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 100%;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 100%;
        height: 178px;
        display: block;
    }
</style>
