<template>
    <div>
        <div class="m-channel-tabs">
            <c-button :disable='channel != "images" ' @click="handleTabClick('images')" class="c-button"> 
                <span>{{$t('图片')}}</span>
            </c-button>
            <span class="separator"></span>
            <c-button :disable='channel != "videoes"' @click="handleTabClick('videoes')" class="c-button"> <span>{{$t('视频')}}</span></c-button>
        </div>
        <template v-if="channel == 'images'">
            <div v-if="total > 0" class="img-list-wrapper">
                <div class="img-box">
                    <div class="img-box lazy-box" v-lazy:background-image="currentPreviewImage + '?imageslim'"  v-if='currentPreviewImage'></div>
                </div>
                <div class="thumb-img-list">
                    <div v-for="(pic,index) in  picList" :key="pic.src"  class="thumb-img-box lazy-box" v-lazy:background-image="pic.src + '?imageslim'" @click="handlePreviewImage(index)"></div>
                </div>
                <div class="m-pagination">
                    <div @click='getPrePage' :class='[{"m-page-link-disable": pageIndex == 1}]'><i class="iconfont  pre">&#xe614;</i>上一页</div>
                    <div></div>
                    <div @click='getNextPage' :class='[{"m-page-link-disable": pageIndex == totalPages}]'>下一页<i class="iconfont next">&#xe605;</i></div>
                </div>
            </div>
        </template>
        <template v-if="channel == 'videoes'">
            <div v-if="total > 0" class="img-list-wrapper">
                <!-- <video-player class="vjs-custom-skin needsclick" ref="videoPlayer"
                            :options="playerOptions"
                            @ready="playerReadied($event)"></video-player>
                </video-player> -->
                <!-- v-lazy:background-image="v.poster + '?imageslim'"  -->
                <c-video-player :source='currentVideoSource' :poster='currentVideoSource + "?vframe/jpg/offset/5"' ref="player"></c-video-player>
                <div class="thumb-img-list">
                    <div v-for="(v,index) in  videoList" 
                        :key="v.src"  
                        class="thumb-img-box lazy-box" 
                        v-lazy:background-image="v.src + '?vframe/jpg/offset/5'" 
                        @click="handlePreviewVideo(index,$event)"></div>
                </div>
                <div class="m-pagination">
                    <div @click='getPrePage' :class='[{"m-page-link-disable": pageIndex == 1}]'><i class="iconfont  pre">&#xe614;</i>上一页</div>
                    <div></div>
                    <div @click='getNextPage' :class='[{"m-page-link-disable": pageIndex == totalPages}]'>下一页<i class="iconfont next">&#xe605;</i></div>
                </div>
            </div>
        </template>
         <div style="text-align:center;font-size:14px;" v-if="total == 0 ">暂没有相关文件</div>
        <c-loading :show='loading'></c-loading>
    </div>
</template>
<script>
    import format from '../../../lib/datetime-format';
    export default {
        components: {
            
        },
        data() {
            return {
                newsList: [],
                channel: 'images',
                pageIndex: 1,
                pageSize: 5,
                picList: [],
                total: -1,
                totalPages: 0,
                currentPreviewImage: '',
                videoList:[],
                currentVideoSource: '',
                loading: false
                // playerOptions: {
                //   // videojs options
                //     height: '100%',
                //     muted: true,
                //     language: 'en',
                //     playbackRates: [0.7, 1.0, 1.5, 2.0],
                //     sources: [],
                //     poster: '',
                // }
            };
        },
        computed: {
            player() {
                //return this.$refs.videoPlayer.player
                return this.$refs.player;
            }
        },
        watch:{
            channel(val){
                let channel = val;
                this.pageIndex = 1;
                this.total = -1;
                this.totalPages = 0;
                if(channel == 'images'){
                    this.getPicList();
                }
                if(channel == 'videoes'){
                    this.getVideoList();
                }
            }
        },
        created() {
            let routerNames = this.$route.name.split('-');
            this.currentRouterName = routerNames[0];
            this.getPicList();
        },
        mounted(){
          
        },
        methods: {
            getVideoList(){
                this.loading = true;
                let params = {pageSize: this.pageSize,pageIndex: this.pageIndex};
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
                        this.loading = false;
                        let videoList = response.data.list ,pageSize = this.pageSize;
                        this.total =  response.data.total;
                        if(this.total > 0){
                            // this.playerOptions.sources = [{
                            //     type: "video/mp4",
                            //     src: videoList[0].src
                            // }]
                            this.currentVideoSource = this.currentVideoSource ||  videoList[0].src;
                        }
                        
                        this.videoList = videoList;
                        this.total =  response.data.total;
                        this.totalPages =  Math.ceil(this.total / this.pageSize);

                    })
                    .catch(() => {
                        this.loading = false;
                    });
            },
            getPicList(){
                this.loading = true;
                let params = {pageSize: this.pageSize, pageIndex: this.pageIndex};
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

                        this.loading = false;
                        this.picList = response.data.list;
                        this.total =  response.data.total;
                        this.currentPreviewImage =  this.total > 0  ? this.picList[0].src : '';
                        this.totalPages =  Math.ceil(this.total / this.pageSize);
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            },
            getPrePage(){
                this.pageIndex =  this.pageIndex > 1 ? this.pageIndex - 1 : 1;
                this.channel == 'images' ?  this.getPicList() : this.getVideoList();
            },
            getNextPage(){
                this.pageIndex = this.pageIndex < this.totalPages ?  this.pageIndex + 1 : this.totalPages;
                this.channel == 'images' ?  this.getPicList() : this.getVideoList();
            },
            handlePreviewImage(index){
                this.currentPreviewImage = '';
                this.$nextTick(()=>{
                    this.currentPreviewImage = this.picList[index].src;
                });

                //
            },
            handleTabClick(channel){
                this.channel = channel;
              
            },
            handlePreviewVideo(index,e){
               
                let videoUrl =  this.videoList[index].src;
                if (this.player === null || this.currentVideoSource == videoUrl) {
                    return;
                }
                this.player.setPoster('');
                this.player.loadByUrl(videoUrl);
                this.player.play();
                this.currentVideoSource = videoUrl;
            
                return;
            }
        }
    };
</script>

<style scoped>
   .c-button span{
       font-size: 40px;
    }
   .m-channel-tabs{
        text-align: center;
        padding: 20px 0;
    }
    .m-channel-tabs .separator{
        padding: 0 1px;
    }

    .img-box{
        height: 500px;
        overflow: hidden;
        background-color: #c0c0c0;
    }

    .img-list-wrapper{
        padding: 20px 30px;
    }
    .thumb-img-list {
        display:flex;
        flex-flow: row wrap;
        justify-content: space-between;
        margin-top: 20px;
        position: relative;
        z-index: 1
    }
    .thumb-img-box{
        height: 130px;
        width: 205px;
        background-color: #c0c0c0;
        position: relative;
    }

    .thumb-img-box::after{
        position: absolute;
        content: "";
        display: block;
        top:0;
        left: 0;
        width: 100%;
        bottom: 0;
    }

    .m-pagination{
        margin-top: 18px;
        display: flex;
    }

    .m-pagination > div{
        width: 20px;
    }
    .m-pagination > div:first-child,.m-pagination > div:last-child{
        flex: 1;
        height: 130px;
        background: #FEA000;
        color: #fff;
        line-height:  130px;
        font-size: 40px;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
        position: relative;
    }
    .m-pagination div.m-page-link-disable{
        background: #b6b6b5;
        color: #666666;
        opacity: .6
    }
    .pre{
       left:  55px;
       position: absolute;
    }
    .next{
       right:  55px;
       position: absolute;
    }
    .vjs-custom-skin{
        height: 680px;
        
    }
    


</style>

