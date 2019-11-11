<template>
    <div class="news-swiper-wrapper">
        <swiper :options="newsSwiperOption" ref="newsSwiper" :class="'news-swiper-container'" v-if="newsList.length>0">
            <!-- slides -->
            <swiper-slide  v-for="(news,index) in newsList" :key="index">
                 <router-link :to="{ path: '/news/' + news.id , query: {}}" :class="'news-link'">
                     <div class="v-item swiper-lazy" >
                        <img  :data-src="news.banner_src + '?imageslim'"  class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="v-title"><span class="tag"></span><span>{{news.date}}</span></div>
                    <div class="brief" v-if="!isEN">{{news.title}}</div>
                    <div class="brief" v-if="isEN">{{news.title_en}}</div>
                </router-link>
            </swiper-slide>
            <!-- Optional controls -->
            <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>
<script>
export default {
    props:{
        newsList:{
            type: Array,
            default: []
        }
    },

    data() {
        return {
            newsSwiperOption: {
                preventClicks : false,
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
                loop: true,
              
                lazy: {
                    loadPrevNext: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        };
    },
    computed: {
        isEN(){
            return  this.$i18n.locale == 'en' ;
        }       
    },
    watch:{
       
    },
    created() {
     
    },
    mounted(){
       
    },
    methods: {
        onSlideClick(){
            
        }
    }
};
</script>
<style  scoped>
    .news-swiper-wrapper{
        height: 7.5rem;
    }
    .news-swiper-container{
        margin: 0  ;
        padding:0  2.25rem;
        overflow: hidden;
        position: relative;
        
    }

    .news-swiper-container:before{
        content: "";
        display: block;
        width: 2.25rem;
        background: #fff;
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        z-index: 99
    }
    .news-swiper-container:after{
        content: "";
        display: block;
        width: 2.25rem;
        background: #fff;
        position: absolute;
        top:0;
        bottom: 0;
        right:  0;
        z-index: 99
    }

    .news-swiper-container .v-item{
        background: #DBDAD8;
        padding-bottom: 66%;
        overflow: hidden;
        position: relative;
    }
    .news-swiper-container .v-item img{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        bottom: 0;
     }

    .news-swiper-container .tag{
        width: 1.1rem;
        height: 1.2rem;
        display: inline-block;
        background:  #FF9600;
        transform-origin: left bottom ; 
        transform: skewX(-33deg);
        position: absolute;
        top:-.3rem;
        left:0;
    }
    .news-swiper-container .v-title{
        color: #FF9600;
        font-size: 22px;
        font-weight: bold;
        position: relative;
        padding-left: 2rem;
        line-height: 1rem
    }
    .news-swiper-container .brief{
        font-size: 16px;
    }

    .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
        background-image: url('../../assets/left-arrow.png');
        left: 10px;
        right: auto;
        z-index: 100;
        width: 1.175rem;
        height: 2.075rem;
        background-size: 100%;
        transform: translate(0,-50%);
    }

    .swiper-button-next, .swiper-container-rtl .swiper-button-prev {
        background-image: url('../../assets/right-arrow.png');
        right: 10px;
        left: auto;
        z-index: 100;
        width: 1.175rem;
        height: 2.075rem;
        background-size: 100%;
        transform: translate(0,-50%);

    }
    .news-link{
        display: block;
        color: #2c3e50;
    }
   
</style>

