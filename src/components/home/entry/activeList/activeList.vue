<template>
    <div class="block">
        <span class="demonstration">活动列表</span>
        <!-- <el-carousel trigger="click" height="150px" indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel> -->
        <carousel></carousel>
    </div>
</template>

<script>
import carousel from './carousel/carousel'
export default {
    name: 'activeList',
    components: {
        carousel
    }
}
</script>

<style scoped>
.demonstration {
    display: block;
    font-size: 0.16rem;
    padding: 0.2rem;
    clear: both;
    box-sizing: border-box;
    
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.block {
    background: white;
    display: block;
    width: 100%;
    height: auto;
    clear: both;
}
</style>
