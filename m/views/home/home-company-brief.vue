<template>
   <div class="m-qrcode">
        <div class="qrcode"></div>
        <p class="brief"> 
           <template v-if="lang == 'en'">
                In 2017, Shanghai Tower International Vertical Marathon commenced at Shanghai Tower which presented a feast for top vertical marathon runners both home and abroad. Shanghai Tower is now the tallest building in China and the second tallest in the world with its 632 meters height. The race was up to 119-storey-high at Shanghai Tower with 3398 steps. The accessible height for runners was 552 meters.<br/><br/>
                The race was authorized by Towerrunning World Association (TWA), which is the leading record-high vertical marathon organization around the world. Shanghai Tower is the tallest venue among all Towerrunning200 points races as well as the highest-level competition within the TWA competition system. The race has become one of the distinctive flagship sports events in China.
            </template>
            <template  v-if="lang == 'zh'">
                2017年，首届上海中心国际垂直马拉松赛在中国第一、世界第二高楼上海中心正式开跑，成为全球及国内顶尖垂直马拉松跑者的盛会。赛事的举办地位于上海中心，楼高632米，赛道共有119层，3398级台阶，选手攀登高度为552米。<br/><br/>
                赛事得到世界高塔竞速协会（TWA）授权认证，是目前全球最高，也是该赛事体系下最高级别 Towerrunning240积分赛中高度最高的赛事。该赛事已成为国内的标杆赛事之一。
            </template>
        </p>
    </div>
</template>
<script>
    export default {
        components: {
        
        },
        data() {
            return {
               
            };
        },
        computed:{
            lang(){
                return this.$i18n.locale;
            }
        },
        created() {
           
        },
        mounted(){
          
        },
        methods: {
         
        }
    };
</script>
<style scoped>
    .m-qrcode{
        margin-top: 90px;
        padding: 0 35px;
    }
    .m-qrcode .qrcode{
        width: 380px;
        height: 380px;
        margin: auto;
        background: #dcd9d9
    }
    .m-qrcode .brief{
        font-size: 32px;
        margin-top: 20px;
    }


</style>

