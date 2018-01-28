<template>
    <div class="public divPadding">
        <p class="btns">
            <el-button type="primary" plain @click="fn(true)">信息管理</el-button>
            <el-button type="primary" plain @click="fn(false)">活动管理</el-button>
        </p>
        <div class="content">

            <baseInfo v-if="bool"></baseInfo>
            <activity v-else></activity> 

        </div>
    </div>
</template>

<script>
import baseInfo from './baseInfo/baseInfo'
import activity from './activity/activity.vue'
export default {
    name: 'public',
    data () {
        return {
            bool: true
        }
    },
    components: {
        baseInfo,
        activity
    },
    methods: {
        fn (bool) {
            this.bool = bool
        }
    }
}
</script>

<style scopedSlots>
    
    .btns {
        display: flex; 
        align-items: center;
        justify-content: center; 
        margin:0.2rem auto;
        margin-top: 0;

    }
    .content {
        background: white;
    }
    
</style>
