<template>
    <div class="activity">
        <el-tabs type="border-card">
            <el-tab-pane label="活动介绍">
                <introduction></introduction>
            </el-tab-pane>
            <el-tab-pane label="邀请居民">
                <invitation></invitation>
            </el-tab-pane>
            <el-tab-pane label="居民报名">
                <sign-up></sign-up>
            </el-tab-pane>
            <el-tab-pane label="活动总结">活动总结</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import introduction from './introduction/introduction'
import invitation from './invitation/invitation'
import signUp from './signUp/signUp'
export default {
    name: 'activity',
    components: {
        signUp,
        introduction,
        invitation
    }
}
</script>

<style>
.activity {
    border: 1px solid #ccc;
}
</style>
