<template>
    <div class="m-video">
        <div class="m-vide-inner">
            <c-video-player :source='video.src'  :poster='video.src + "?vframe/jpg/offset/5"' :height='"53.333vw"' ref="player" v-if="video.src"></c-video-player>
        </div>
    </div>
</template>
<script>
    import CVideoPlayer from '@/components/c-video-player';
    export default {
        components: {
            CVideoPlayer
        },
        data() {
            return {
                video:{},
            };
        },
        computed: {
            player() {
                return this.$refs.player;
            }
        },
        created() {
            this.getTopVideo();
        },
        mounted(){
          
        },
        methods: {
            getTopVideo(){
                this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/shcenter/api/sport/video/find?top=1',{}
                    )
                    .then(response => {
                        this.video =  response.data.video || {};

                    })
                    .catch(() => {
                     
                    });
            },
            playerReadied(){
                this.player.play();
            }
        }
    };
</script>
<style scoped>
   .m-video{
        margin: 30px 35px;
        background: #dcd9d9;
        height: 650px;
        position: relative;
        overflow: hidden;
    }

    .m-video:before{
        content: "";
        display: block;
        position: absolute;
        top:0;
        left:0;
        bottom: 0;
        width: 150px;
        background:  #ff9600;
        transform-origin: left bottom ; 
        transform: skewX(-33deg);
        z-index: 1
    }

    .m-vide-inner{
        margin: 25px auto;
        height: 600px;
        width: 920px;
        background: #131313;
        z-index: 2;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
    }
    


</style>

