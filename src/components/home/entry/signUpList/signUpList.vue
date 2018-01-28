<template>
<!-- 人员管理 -->
<div class="list">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="居民姓名"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userPhone"
        label="联系电话"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注信息"
        align="center">
      </el-table-column>
      <el-table-column
        prop="signUpTime"
        label="报名时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作"
        align="center">
            <template slot-scope="scope" class="opreration">
                <span @click='del(scope.row.id)'>删除</span>
            </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="count"
        @current-change='current_change'>
    </el-pagination>
</div>
    
</template>

<script>
import axios from 'axios'
let newAxios = axios.create({
    baseURL: 'http://localhost:3000'
})
export default {
    name: 'signUpList',
    data() {
        return {
          tableData:[],
          currentPage: 1,
          count: 10,
          total: 100
        }
    },
    methods: {
        // 点击分页器时
        current_change (page) {
            this.currentPage = page
            newAxios.post('/admin/signUpList', {
                currentPage: this.currentPage,
                count: this.count
            }).then(({data}) => {
                this.tableData = data.newArr
                console.log(data.newArr)
            })
        },
        // 删除人员管理名单时 
        del (id) {
            newAxios.post('/admin/signUpDel', {
                currentPage: this.currentPage,
                count: this.count,
                id: id
            }).then(({data}) => {

                this.tableData = data.newArr
                this.total = data.data.data.length
                this.$alert('删除成功', '删除', {
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
    mounted () {
        
        newAxios.post('/admin/signUpList', {
            currentPage: this.currentPage,
            count: this.count
        }).then(({data}) => {
            // console.log(data.newArr)
            this.tableData = data.newArr
            this.total = data.data.data.length
        })
    }
}
</script>

<style>
.list {
    background: white;
}
</style>
