<template>
    <div class="banner-swiper-container">
        <swiper :options="bannerSwiperOption" ref="bannerSwiper" :class="'banner-swiper'" v-if="bannerList.length>0">
            <!-- slides -->
            <swiper-slide  v-for="(banner,index) in bannerList" :key="index">
                <template v-if="banner.link">
                    <a :href="banner.link" :class="'banner-link'">
                        <img :src="banner.src">
                    </a>
                </template>
                 <template v-else>
                    <img :src="banner.src">
                </template>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div> 
        </swiper>

    </div>
</template>
<script>
export default {
    props:{
        bannerList:{
            type: Array,
            default: []
        }
    },

    data() {
        return {
            bannerSwiperOption: {
                preventClicks : false,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
               
            }
        };
    },
    computed: {
        swiper() {
            return this.$refs.bannerSwiper.swiper;
        }  
    },
    watch:{

    },
    created() {
     
    },
    mounted(){
       
    },
    methods: {
       
    }
};
</script>
<style  scoped>
   .banner-swiper-container{
        height: 12.5rem;
        overflow: hidden;
    }
    .banner-swiper{
        height: 100%;
        position: relative;
    }
    .banner-swiper-container .swiper-slide{
        background: #DDD9DA;
        color:#fff;
        text-align: center;
        line-height: 12.5rem;
        font-size: 16px;
        overflow: hidden;
    }  
    .banner-swiper-container .swiper-slide img{
        width: 100%;

    }
    .banner-link{
        display: block;
    }

</style>

