<template>
    <div>
       <div>
            <div class="nav-wrapper">
                 <c-tab :tabs="navs"  :activeTabIndex="1"  @tabClick="onTabClick"></c-tab>
            </div>
            <ul class="news-list" v-if="currentView == 'video'">
                <li v-for="(video,index) in videoList" :key="index">
                    <div v-if="!video.faked">
                        <div class="img"> 
                          <!--   <img src="../../../assets/play.png" class="play-btn" @click="playVideo(index)" v-if="!video.playing"/> -->
                            <video :src="video.src" :poster="video.poster"  width="100%" v-if="video.src" :ref='"topVideo_" + index'  controls  @playing="handlePlay(index)" @pause="handlePause(index)"></video>
                        </div>
                        <div class="v-title"><span class="tag"></span><span>{{video.date}}</span></div>
                        <div class="brief">{{video.title}}</div>
                    </div>
                </li>
            </ul>
            <div style="text-align:center;font-size:14px;" v-if="currentView == 'video' && isVideoListEmpty   ">暂没有相关视频</div>
            <div v-if="currentView ==  'pic'" style="padding-bottom:50px;"> 
                <swiper :options="swiperOptionTop" class="gallery-top pic" ref="swiperTop">
                    <swiper-slide class="slide" v-for="(pic,index) in picList" :key="index">
                         <img :data-src="pic.src + '?imageslim'" class="swiper-lazy">
                         <div class="swiper-lazy-preloader"></div>
                    </swiper-slide>
                    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                </swiper>
                <!-- swiper2 Thumbs -->
                <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                    <swiper-slide  class="slide" v-for="(pic,index) in picList" :key="index">
                         <img :data-src="pic.src + '?imageslim' " class="swiper-lazy">
                         <div class="swiper-lazy-preloader"></div>
                    </swiper-slide>
                </swiper>
            </div>
       </div>
    </div>
</template>
<script>
    import CTab from '@/components/c-tab';
    export default {
        components: {
            CTab
        },
        data() {
            return {
                currentView:'video',
                navs:[{
                    label:'图片',
                    key:'pic'
                },{
                    label:'视频',
                    key:'video'
                }],
                pageSize: 6,
                pageIndex: 1,
                videoList: [],
                isVideoListEmpty: false,
                picList: [],
                swiperOptionTop: {
                    spaceBetween: 10,
                    loop: true,
                    loopedSlides: 5, //looped slides should be the same
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    lazy: {
                        loadPrevNext: true,
                    },
                },
                swiperOptionThumbs: {
                    spaceBetween: 10,
                    slidesPerView: 4,
                    touchRatio: 0.2,
                    loop: true,
                    loopedSlides: 5, //looped slides should be the same
                    slideToClickedSlide: true,
                    lazy: {
                        loadPrevNext: true,
                    },
                }
            };
        },
        computed: {
            isEN(){
                return this.$i18n.locale == 'en' ;
            }     
        },
        watch:{
            currentView(){
                if(this.currentView == 'pic'){
                    this.$nextTick(() => {
                        const swiperTop = this.$refs.swiperTop.swiper;
                        const swiperThumbs = this.$refs.swiperThumbs.swiper;
                        swiperTop.controller.control = swiperThumbs;
                        swiperThumbs.controller.control = swiperTop;
                    });
                }
            }
        },
        created() {
            let routerNames = this.$route.name.split('-');
            this.currentRouterName = routerNames[0];
            this.getVideoList();
            this.getPicList();
        },
        mounted(){

        },
        methods: {
            getVideoList(){
                let params = {pageSize: 1000,pageIndex: this.pageIndex};
                if(this.currentRouterName == '本届赛事'){
                    params['current']  = true;
                }else{
                    params['previous']  = true;
                }
                this.$http
                    .post(
                        this.$root.$options.baseURI +
                            '/shcenter/api/sport/video/list',params
                    )
                    .then(response => {
                        let videoList = response.data.list ;
                        this.isVideoListEmpty = videoList.length == 0 ;
                        videoList.forEach((n)=>{
                            let d = new Date(n.updated_at.replace(/-/g, '/'));
                            n.date = !isNaN(d) ? d.format('yyyy.MM.dd') : '';
                            n.playing = false;
                        });

                        for(let left = 3 - videoList.length % 3; left > 0  && left < 3;left--){
                            videoList.push({faked :true});
                        }
                        this.videoList = videoList;


                    })
                    .catch(() => {
                     
                    });
            },
            getPicList(){
                let params = {pageSize: 1000,pageIndex: this.pageIndex};
                if(this.currentRouterName == '本届赛事'){
                    params['current']  = true;
                }else{
                    params['previous']  = true;
                }
                this.$http
                    .post(
                        this.$root.$options.baseURI +
                            '/shcenter/api/sport/image/list',params
                    )
                    .then(response => {
                        this.picList = response.data.list ;
                    })
                    .catch(() => {
                     
                    });
            },
            onTabClick(index){
                this.currentView = this.navs[index].key;
            },
            playVideo(index){
                this.$refs['topVideo_' + index][0].play();
                this.videoList[index].playing = true;
            },
            handlePlay(index){
                this.videoList[index].playing = true;
            },
            handlePause(index){
                this.videoList[index].playing = false;
            }
        }
    };
</script>

<style scoped>
    .nav-wrapper{
        text-align: center;
    }
    

    .news-list{
        list-style: none;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        margin-top: .75rem;
    }
    .news-list>li{
        width: 8.5rem;
        margin-bottom: 1.1rem
    }
    .news-list>li:last-child{
        padding-right: 0
    }
    .news-list>li .img{
        width: 100%;
        height: 5.7rem;
        background: #000;
        position: relative;

    }

    .tag{
        width: 1.05rem;
        height: 1.05rem;
        display: inline-block;
        background:  #FF9600;
        transform-origin: left bottom ; 
        transform: skewX(-33deg);
        position: absolute;
        top:-.3rem;
        left:0;
    }
    .v-title{
        color: #FF9600;
        font-size: 22px;
        font-weight: bold;
        position: relative;
        padding-left: 2rem;
        line-height: 1rem
    }
    .brief{
        font-size: 16px;
    }
    .pic{
        width: 16rem;
        height: 10.25rem;
        background: #EEEEEE;
        margin: 10px auto 0;
    }
    .pic-list{
        display: flex;
        justify-content: space-between;
        margin: 10px auto;
        width: 16rem;
    }
    .pic-list>div{
        width:3.1rem;
        height: 2rem;
        background: #EEEEEE;
    }

    .play-btn{
        width: 1.125rem;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        cursor: pointer;
        z-index: 999
    }
    .gallery-thumbs{
        height: 2rem;
        width: 16rem;
    }

    .slide img{
        width: 100%;
    }

    .gallery-thumbs .swiper-slide {
        width: 25%;
        height: 100%;
    }

</style>

