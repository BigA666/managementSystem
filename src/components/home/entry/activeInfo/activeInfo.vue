<template>
  <div>
        <div class="infoTop" :span='24'>
            <h3>活动信息</h3>
            <p>活动地点：社区居委会活动室</p>
            <p>温馨提示：请携带有效证件前往，如身份证</p>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  :label-position="'top'" >
            <el-form-item label="姓名" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="userPhone">
                <el-input v-model="ruleForm.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="备注信息" prop="remark">
                <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">报名</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
  </div>
  
</template>

<script>
import axios from 'axios'
let newAxios = axios.create({
    baseURL: 'http://localhost:3000'
})
export default {
    name: 'infoTop',
    data() {
        return {
            ruleForm: {
                userName: '',
                userPhone: '',
                remark: ''
            },
            rules: {
                userName: [
                { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                userPhone: [
                { required: true, message: '请输入联系电话', trigger: 'blur' }
                ],
                remark: [
                { required: true, message: '请输入备注', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 报名
        submitForm(formName) {
            let that = this
            that.rules.userName[0].required = true
            that.rules.userPhone[0].required = true
            that.rules.remark[0].required = true
            this.$refs[formName].validate((valid) => {
                // console.log(valid)  // true | false
                if (valid) {
                    that.ruleForm.signUpTime = new Date().toLocaleDateString()
                    newAxios.post('/admin/signUpUser',that.ruleForm).then((data) => {
                        this.$alert('提交成功', '提交', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                                });

                                that.ruleForm.userName = ''
                                that.ruleForm.userPhone = ''
                                that.ruleForm.remark = ''
                                
                                that.rules.userName[0].required = false
                                that.rules.userPhone[0].required = false
                                that.rules.remark[0].required = false

                            }
                        })
                    })
                } else {
                    this.$alert('error submit!!', '提交', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                            });
                        }
                    })
                    
                    return false;
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scopedSlots>
.infoTop {
    background: white;
    padding: 0.1rem 0.2rem;
    box-sizing: border-box;
    margin-bottom:0.2rem;
    width: 100%;
}
.infoTop h3 {
    margin: 0.2rem 0;
    padding: 0;
}
.infoTop p {
    line-height: 0.3rem
}
.el-form {
    background: white;
    display: block;
    padding: 0.2rem 0.2rem;
    box-sizing: border-box;
}
</style>
