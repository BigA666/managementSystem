<template>
    <el-col :span='24'>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div v-for='(val, key) in $store.state.carousel' :key='key' class="swiper-slide">
                    <p>{{val.activityName}}</p>
                    <p>活动时间：{{val.activityTime}}</p>
                </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
       
            <!-- 该方法未成功 -->
        <!-- <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for='(val, key) in brr' :key='key'>
                    <p>{{val.activityName}}</p>
                    <p>活动时间：{{val.activityTime}}</p>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper> -->
      
    </el-col>
</template>

<script>
import '@/common/css/swiper.min.css' // 这个一定要引否则样式会没有
import '@/common/js/swiper-3.3.1.min.js'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from 'axios'
let newAxios = axios.create({
    baseURL: 'http://localhost:3000'
})

export default {
    name: 'carousel',
    // components: {
    //     swiper,
    //     swiperSlide
    // },
    data () {
        return {
            swiperOption: {
                // 没用上
                initialSlide: 0,//设定初始化时slide的索引
                direction: 'horizontal',//Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
                loop: true,  //无限滚动
                // speed: 300,//滑动速度
                autoplay: 1000,//自动切换的时间间隔
                onSlideChangeEnd: swiper => { //滑动之后回调函数
                    //切换结束时，告诉我现在是第几个slide
                    console.log('onSlideChangeEnd', swiper.realIndex)
                },
                slidesPerView : 4, // 一页显示
                loopedSlides : 4, // 有几个需要循环 
                prevButton:'.swiper-button-prev',//上一张
                nextButton:'.swiper-button-next',//下一张
                mousewheelControl : true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true//修改swiper的父元素时，自动初始化swiper
            }
            
        }
    },
    methods: {
    // 把this保存下，比如var _that = this,
    // 然后试试把swiper的定义写在接口请求的_that.$nextTick(function(){})里 等待数据渲染成功，再定义swiper
    // 一楼评论不能照抄，this作用域要搞清楚
        newSwiper () {
            new Swiper('.swiper-container',{
                autoplay: 1000,
                loop : true,
                slidesPerView : 4, // 初始化div内显示多少个swiper-slide
                // loopedSlides : 4,  // 写了并没有看到效果
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
            })
        }
    },
    mounted () {
        // this.$store.commit('carousel')
        newAxios.post('/admin/carousel').then((data) => {
            this.$store.state.carousel = data.data
            // 一、this.$nextTick是在下次DOM更新循环结束时调用延迟回调函数。
            // 二、什么会引起DOM更新，Vue中响应式数据被修改（包括默认绑定）
            // 该函数的调用时机是在vue实例mounted钩子中响应式data属性绑定默认值以后（亲测）
            
            // 方法二  
            this.$nextTick(function(){

                this.newSwiper()
               
            })

            // ！！！本质问题
            // 在给this.brr重新赋值后，页面相应进行DOM更新，但还未更新完全便执行了new,
            // 导致new Swiper()无法获取到完整的DOM结构，（.swiper-slide 就是在new 完后进行循环，所以导致没有被实例上）
            
        })
        // 方法一 不够灵活 会要求时间问题
        // setTimeout(() => {
        //     console.log(this)
        //     new Swiper('.swiper-container',{
        //         // autoplay: 1000,
        //         loop: true,
        //         prevButton: '.swiper-button-prev',
        //         nextButton: '.swiper-button-next',
        //         slidesPerView: 4, // 可以控制swiper-slide 的宽度 ，不加这无法控制
        //         loopedSlides : 4
        //     })
        // }, 500)
        
    }
}
</script>

<style scoped>
.el-col {
    background: white;
    width: 100%;
    height: auto;
    display: block;
    padding: 0;
    margin: 0;
}
.swiper-container {
    width: 100%;
}
.swiper-slide {
    height: 1.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
.swiper-slide p {
    text-align: center;
    margin: 0.1rem 0;
}
</style>
