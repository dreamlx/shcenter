<template>
     <div class="video-container">
          <swiper :options="videoSwiperOption" ref="videoSwiper" :class="'video-swiper-container'" v-if="video.src">
             <!-- slides -->
            <swiper-slide >
                  <!-- <video :src="video.src" :poster=" video.src + '?vframe/jpg/offset/5'"  width="100%"   height="100%" v-if="video.src" ref="topVideo" controls  @playing="handlePlay" @pause="handlePause"></video> -->
                <div class="video-player-wrapper">
                    <video :src="video.src" :poster=" video.src + '?vframe/jpg/offset/5'"  width="100%"   height="100%" v-if="video.src" ref="topVideo" controls ></video>
                </div>
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
        video:{
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            playing: false,
            videoSwiperOption: {
                preventClicks : false,
                // slidesPerView: 3,
                // spaceBetween: 30,
                slidesPerGroup: 3,
                loop: true,
              
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        };
    },
    computed: {
       
    },
    watch:{

    },
    created() {
     
    },
    mounted(){
       // this.$refs.topVideo.onplaying = ()=>{
         
       // }
    },
    methods: {
        playVideo(){
            if(this.$refs.topVideo){
                this.$refs.topVideo.play();
                this.playing = true;
            }
        },
        // handlePlay(){
        //     this.playing = true;
        // },
        // handlePause(){
        //     this.playing = false;
        // }
    }
};
</script>
<style  scoped>
    .video-container{
        margin: 20px   2.25rem ;
        background: #716F70;
        margin-bottom: 50px;
        height: 11.25rem;
        position: relative;
        overflow: hidden;
         
    }

    .video-container:before{
        content: "";
        display: block;
        position: absolute;
        top:0;
        left:0;
        bottom: 0;
        width: 3.75rem;
        background:  #FEC35D;
        transform-origin: left bottom ; 
        transform: skewX(-33deg);
        z-index: 1
    }
    .video-player-wrapper {
        margin: .625rem auto;
        height: 10rem;
        width: 16.875rem;
        background: #131313;
        z-index: 2;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
    }

    .play-btn{
        width: 2.5rem;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        cursor: pointer;
        z-index: 99;
    }
    .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
        background-image: url('../../assets/left.png');
        left: 7.03vw;
        right: auto;
        z-index: 100;
        width: 2.8125vw;
        height: 5vw;
        background-size: 100%;
        transform: translate(0,-50%);
    }

    .swiper-button-next, .swiper-container-rtl .swiper-button-prev {
        background-image: url('../../assets/right.png');
        right: 7.03vw;
        left: auto;
        z-index: 100;
        width: 2.8125vw;
        height: 5vw;
        background-size: 100%;
        transform: translate(0,-50%);

    }
</style>

