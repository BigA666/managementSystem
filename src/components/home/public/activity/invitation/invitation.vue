<template>
    <div>
        <p class="invitationTop">
            <h3>邀请名单</h3>
            <span @click='addResident' class="addResident">添加居民</span>
            <span>短信通知</span>
        </p>
        <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="userName"
            label="居民姓名"
            width="120">
                <template slot-scope="scope">{{ scope.row.userName }}</template>
            </el-table-column>
            <el-table-column
            prop="userPhone"
            label="联系电话"
            width="120">
                <template slot-scope="scope">{{ scope.row.userPhone }}</template>
            </el-table-column>
            <el-table-column
            prop="gender.name"
            label="性别"
            width="120">
                <template slot-scope="scope">{{ scope.row.gender.name }}</template>
            </el-table-column>
            <el-table-column
            prop="age"
            label="年龄"
            width="120">
                <template slot-scope="scope">{{ scope.row.age }}</template>
            </el-table-column>
            <el-table-column
            prop="smsStatus"
            label="短信通知"
            width="120">
                <template slot-scope="scope">{{ scope.row.smsStatus }}</template>
            </el-table-column>
            <el-table-column
            prop="remark"
            label="备注信息"
            show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.remark }}</template>
            </el-table-column>
            <el-table-column
            prop="operation"
            label="操作"
            show-overflow-tooltip>
                <template slot-scope="scope" class="opreration">
                    <span @click='remarkEvent(scope.row.id, page)'>备注</span>
                    <span @click='inforEvent(scope.row)'>查看详情</span>
                    <span @click='delEvent(scope.row.id, page)'>删除</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- page -->
        <div style="margin-top: 20px">
            <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="total"
            :page-size="pageSize"
            >
            </el-pagination>
        </div>

    </div>
</template>

<script>
import {getCookie} from '@/utils/utils'
import axios from 'axios'
let newAxios = axios.create({
    baseURL: 'http://localhost:3000'
})
export default {
    name: 'invitation',
    data () {
        return {
            tableData3: [],
            multipleSelection: [],
            page:1,
            pageSize: 10, // 每页显示条目数
            total: 100 // 总条目数
        }
    },
    methods: {
        addResident() {

        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleCurrentChange (page) {  // 点击page
            this.page = page
            newAxios.post('/admin/getUserList', {
                pageSize: page,
                count: this.pageSize
            }).then(({data}) => {
                this.tableData3 = data
            })
        },
        remarkEvent (id, page) { // 备注
            let that = this
            this.$prompt('添加备注', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: '',
                inputErrorMessage: ''
                }).then(({ value }) => {
                    newAxios.post('/admin/addRemark',{
                        id: id,
                        remark: value,
                        pageSize: page,
                        count: this.pageSize
                    }).then(function(data) {
                        that.tableData3 = data.data
                    })
                    this.$message({
                        type: 'success',
                        message: '您添加的备注是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
            });
        },
        inforEvent (val) { // val == 对象  查看详情
            
            this.$alert(`姓名：${val.userName}，性别：${val.gender.name}，年龄：${val.age}，手机号：${val.userPhone}，备注：${val.remark}`, '查看详情', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                    });
                }
            })
        },
        delEvent (val, page) { // val == id   删除时
            let that = this
            this.$msgbox({  
                title: '消息',
                message: '确定要删除此用户？',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose (action, instance, done) {
                    if (action === 'confirm') { // 确定
                        instance.confirmButtonLoading = true;
                        setTimeout(() => {
                            instance.confirmButtonLoading = false;
                            newAxios.post('admin/delInvitation', {
                                id: val,
                                pageSize: page,
                                count: that.pageSize,
                                token: getCookie('token')
                            }).then(({data}) => {
                               
                                if(data.code && (data.code === 1001)){ // 登陆超时
                                    this.$msgbox({
                                        title: '消息',
                                        message: data.message,
                                        showCancelButton: true,
                                        confirmButtonText: '重新登陆',
                                        cancelButtonText: '取消',
                                        beforeClose (action, instance, done) {
                                            if (action === 'confirm') { // 重新登陆
                                                instance.confirmButtonLoading = true;
                                                setTimeout(() => {
                                                    setTimeout(() => {
                                                        instance.confirmButtonLoading = false;
                                                        that.$router.push({
                                                            name: 'login',
                                                            params: {
                                                                from: that.$route.name
                                                            }
                                                        })
                                                        done()
                                                    }, 300)
                                                }, 3000)

                                            }else{
                                                done()
                                            }
                                        }
                                    }).catch(e => {
                                        // console.log(e)
                                    })
                                } else {
                                    
                                    newAxios.get('/residents/list').then(({data}) => {
                                        that.total = data.data.data.length
                                    })
                                    that.tableData3 = data
                                }
                            })
                            done()
                        }, 1000)
                    }else{
                        done()
                    }
                    
                }
            }).catch(e => {
                console.log(e)
            })

            
        }

    },
    mounted () {
        newAxios.post('/admin/getUserList', {
            pageSize: 1,
            count: this.pageSize
        }).then(({data}) => {
            this.tableData3 = data
        })
        newAxios.get('/residents/list').then(({data}) => {
            this.total = data.data.data.length
        })
    }
}
</script>

<style>
.invitationTop {
    display: flex;
}
.cell span {
    margin: 0 0.1rem;
}
.addResident {
    color: green;
}
</style>
