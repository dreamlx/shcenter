<template>
    <div style="overflow-x:hidden">
        <c-top-bar></c-top-bar>
        <div class="top-section">
            <img src="../../assets/enroll.png" 
             class="entrance" 
             @click="toEnroll" >
            <img :src="kv"  v-if="kv" class="kv">
            <div class="notice-dashbord">
                <div>
                    <img src="../../assets/mascot-1.png" />
                </div>
                <div>
                    <div class="match-date">
                        <div>比赛时间</div>
                        <div>2019年11月24日</div>
                    </div>
                    <div class="count-down-list">
                        <div class="count-down-item">
                            <div class="polygon-path"></div>
                            <div class="count">{{days}}</div>
                            <div class="unit">DAYS</div>
                        </div>
                         <div class="count-down-item">
                            <div class="polygon-path"></div>
                            <div class="count">{{hours}}</div>
                            <div class="unit">HOURS</div>
                        </div>
                         <div class="count-down-item">
                            <div class="polygon-path"></div>
                            <div class="count">{{minutes}}</div>
                            <div class="unit">MINUTES</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <c-nav></c-nav>  
        </div>
        <div>
            <c-schedule></c-schedule>
        </div>
        <banner-list :bannerList="bannerList"></banner-list>
        <top-video :video="video"></top-video>
        <news-list :newsList="newsList"></news-list>
        
        <div class="block-container">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td ></td><td class="block" style="text-align:center;cursor:pointer" @click="toResults" >
                        <img src="../../assets/score.png" />
                        <p>成绩查询</p>
                        <p>Results Inquiry</p>
                    </td>
                    <td colspan="2" class="yhhz">
                        <p class="title" style=" visibility: hidden;">友好合作赛事</p>
                        <img src="../../assets/yhhz.png" style=" visibility: hidden;"/>
                        <div class="block block-2 skew"></div>
                    </td>
                    <td class="block"  style="text-align:center;cursor:pointer" @click="toRules">
                        <img src="../../assets/rule.png" />
                        <p>竞赛规程</p>
                        <p>Rules</p>
                    </td>
                </tr>
                <tr>
                    <td class="block" style="text-align:center;cursor:pointer" @click="toGuidelines">
                        <img src="../../assets/guide.png" />
                        <p>备赛指南</p>
                        <p>Guidelines</p>
                    </td><td></td><td colspan="3" class="border race-brief">
                        <template v-if="isEN">
                            In 2017, Shanghai Tower International Vertical Marathon commenced at Shanghai Tower which presented a feast for top vertical marathon runners both home and abroad. Shanghai Tower is now the tallest building in China and the second tallest in the world with its 632 meters height. The race was up to 119-storey-high at Shanghai Tower with 3398 steps. The accessible height for runners was 552 meters.<br/><br/>
                            The race was authorized by Towerrunning World Association (TWA), which is the leading record-high vertical marathon organization around the world. Shanghai Tower is the tallest venue among all Towerrunning240 points races as well as the highest-level competition within the TWA competition system. The race has become one of the distinctive flagship sports events in China.
                        </template>
                        <template v-else>
                        <div style="font-size:16px">
                            2017年，首届上海中心国际垂直马拉松赛在中国第一、世界第二高楼上海中心正式开跑，成为全球及国内顶尖垂直马拉松跑者的盛会。赛事的举办地位于上海中心，楼高632米，赛道共有119层，3398级台阶，选手攀登高度为552米。<br/><br/>
赛事得到世界高塔竞速协会（TWA）授权认证，是目前全球最高，也是该赛事体系下最高级别 Towerrunning240积分赛中高度最高的赛事。该赛事已成为国内的标杆赛事之一。
</div>
                        </template>
                    </td>
                </tr>
                 <tr>
                    <td></td>
                    <td class="block" @click="toQa" style="cursor:pointer">
                        <img src="../../assets/qna.png" width="100%" />
                    </td>
                    <td>
                        <div class="block skew" style="width: 3.2rem;height: 100%;"></div>
                    </td>
                    <td colspan="2" style="position: relative;">
                        <div class="notice-dashbord">
                            <div>
                                <img src="../../assets/mascot-1.png" />
                            </div>
                            <div>
                                <div class="match-date">
                                    <div>比赛时间</div>
                                    <div>2019年11月24日</div>
                                </div>
                                <div class="count-down-list">
                                    <div class="count-down-item">
                                        <div class="polygon-path"></div>
                                        <div class="count">{{days}}</div>
                                        <div class="unit">DAYS</div>
                                    </div>
                                    <div class="count-down-item">
                                        <div class="polygon-path"></div>
                                        <div class="count">{{hours}}</div>
                                        <div class="unit">HOURS</div>
                                    </div>
                                    <div class="count-down-item">
                                        <div class="polygon-path"></div>
                                        <div class="count">{{minutes}}</div>
                                        <div class="unit">MINUTES</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>

        <!-- <div class="brand-level-1">
            <div class="column-item-container"> 
                <div class="column-header">
                    <a class="button"> <div>{{$t('赞助商')}}</div> </a>
                </div>
                <ul class="brand-logo-list">
                    <li v-for="(brd,index) in specBrandList" :key="index">
                        <a :href="brd.link" target="_blank">
                            <img :src="brd.logo">
                        </a>
                        <div class="brand-name">{{brd.name}}</div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="brand-level-2" >
            <div>
                <div class="column-item-container"> 
                    <div class="column-header">
                        <a class="button"> <div>{{$t('赞助商')}}</div> </a>
                    </div>
                    <ul class="brand-logo-list">
                        <li v-for="(brd,index) in coopBrandList" :key="index">
                            <a :href="brd.link" target="_blank">
                                <img :src="brd.logo">
                            </a>
                            <div class="brand-name">{{brd.name}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <div class="column-item-container"> 
                    <div class="column-header">
                        <a class="button"> <div>{{$t('赞助商')}}</div> </a>
                    </div>
                    <ul class="brand-logo-list">
                        <li v-for="(brd,index) in coopBrandList" :key="index">
                            <a :href="brd.link" target="_blank">
                                <img :src="brd.logo">
                            </a>
                            <div class="brand-name">{{brd.name}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="brand-level-3">
            <div class="column-item-container"> 
                <div class="column-header">
                    <a class="button"> <div>{{$t('赞助商')}}</div> </a>
                </div>
                <ul class="brand-logo-list">
                    <li v-for="(brd,index) in coopBrandList" :key="index">
                        <a :href="brd.link" target="_blank">
                            <img :src="brd.logo">
                        </a>
                        <div class="brand-name">{{brd.name}}</div>
                    </li>
                </ul>
            </div>
        </div> -->

        <div style="text-align: center; padding:  0  3.125vw; ">
            <img src="../../assets/sponors.jpeg" style="width: auto; max-width: 100%" />
        </div>
        <div style="text-align: center">
            <img src="../../assets/orgnization.png" />
        </div>
        
        <c-footer></c-footer>
        <c-fixed-float></c-fixed-float>
    </div>
</template>
<script>
    import CNav from '@/components/c-nav';
    import CSchedule from '@/components/c-schedule';
    import CTopBar from '@/components/c-top-bar';
    import CFixedFloat from '@/components/c-fixed-float';
    import CFooter from '@/components/c-footer';
    import BannerList from './banner-list';
    import TopVideo from './top-video';
    import NewsList from './news-list';
    
    export default {
        components: {
            CNav,
            CSchedule,
            CTopBar,
            BannerList,
            TopVideo,
            NewsList,
            CFixedFloat,
            CFooter
        },
        data() {
            return {
                kv: '',
                bannerList:[],
                newsList:[],
                coopBrandList:[],
                honorBrandList:[],
                specBrandList:[],
                days: '',
                hours: '',
                minutes: '',
                video:{
                    src: '',
                    poster: ''
                }
            };
        },
        computed: {
            isEN(){
                return this.$i18n.locale == 'en' ;
            }       
        },
        watch:{
    
        },
        created() {
            this.getKV();
            this.getBannerList();
            this.getNewsList();
            this.getSponsorList();
            this.getTopVideo();
        },
        mounted(){
            const countdown = () => {
                var current =  new Date(), 
                    start = new Date(2019, 10, 24).getTime(),
                    oneDayMillis =  24 * 3600 * 1000;
                var remain = start - current;
                this.days = parseInt(remain / oneDayMillis);
                remain = remain -  this.days * oneDayMillis;
                this.hours = parseInt(remain / (3600 * 1000));
                remain = remain -  this.hours * 3600 * 1000;
                this.minutes = parseInt(remain / 60000);
                this.timerId = setTimeout(countdown, 10 * 1000);
            };
            countdown();
        },
        beforeDestroy(){
            clearTimeout(this.timerId);
        },
        methods: {
            getKV(){
                this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/shcenter/api/sport/kv/find', {params: {type: 1}}
                    )
                    .then(response => {
                        this.kv = response.data.kv.src;
                    })
                    .catch(() => {
                     
                    });
            },
            getBannerList(){
                this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/shcenter/api/sport/banner/list', {params: {valid: 1}}
                    )
                    .then(response => {
                        this.bannerList = response.data.banners;
                    })
                    .catch(() => {
                     
                    });
            },
            getNewsList(){
                this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/shcenter/api/sport/news/list',{pageSize:6}
                    )
                    .then(response => {
                        let newsList = response.data.list ;
                        newsList.forEach((n)=>{
                            let d = new Date(n.updated_at.replace(/-/g, '/'));
                            n.date = !isNaN(d) ? d.format('yyyy.MM.dd') : '';
                        });
                        this.newsList = newsList ;
                    })
                    .catch(() => {
                     
                    });
            },
            getSponsorList(){
                this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/shcenter/api/sport/sponsor/list',{pageSize:6}
                    )
                    .then(response => {
                        let list = response.data.sponsors, coopBrandList = [],honorBrandList = [],specBrandList = [];
                        list.forEach((s)=>{
                            if(s.type == '合作品牌'){
                                coopBrandList.push(s);
                            }
                            if(s.type == '荣誉赞助品牌'){
                                honorBrandList.push(s);
                            }
                            if(s.type == '独家冠名'){
                                specBrandList.push(s);
                            }
                        });
                        this.coopBrandList = coopBrandList;
                        this.honorBrandList = honorBrandList;
                        this.specBrandList = specBrandList;
                    })
                    .catch(() => {
                     
                    });
            },
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
           
            toEnroll(){
                this.$router.push('/enroll');
            },
            toResults(){
                this.$router.push('/record');
            },
            toRules(){
                this.$router.push('/current/race/rules');
            },
            toGuidelines(){
                this.$router.push('/current/race/guidelines');
            },
            toQa(){
                this.$router.push('/current/race/qa');
            }
           
        }
    };
</script>

<style >
    .top-section{
        background:#B6B6B6;
        min-height: 12.5rem;
        overflow: hidden;
      /*  background-image: url('../../assets/main-banner.jpg');*/
        background-size: contain;
        position: relative;
    }

    .kv{
        width: 100%;
        display: block;
    }

    .notice-dashbord {
        width: 28.9vw;
        height: 13.12vw;
        background-color: #FEA000;
        position: absolute;
        left: 2vw;
        bottom: 2vw;
        align-items: center;
        display: flex;
        border-radius: 10px;
    }

    .notice-dashbord > div:first-child {
        width: 10.2vw;
        text-align: center;
        vertical-align: middle;
        display: table-cell;
        
    }

    .notice-dashbord > div img {
        width: 7vw;
    }

    .match-date {
        color: #fff;
        font-size: 1.56vw;
        line-height: 1.87vw;
        margin-bottom: 1.56vw;
    }

    .count-down-list {
        display: flex;
    }

    .count-down-item {
        width: 5.2vw;
        height: 5.2vw;
        background-color: #fec35d;
        position: relative;
        margin-right: 0.78vw;
        overflow: hidden;

    }

    .count-down-item  .polygon-path{
        position: absolute;
        height: 35%;
        width: 30%;
        border: 1px solid transparent;
        border-right-color: #FEA000;
        transform: skewX(-30deg);
        transform-origin: left bottom;
        background: #FEA000;
        position: absolute;
        top: -1px;
        left: -33%;
        z-index: 3
    }
    
    .count-down-item .count {
        color: #fff;
        line-height: 3.9vw;
        font-size: 3vw;
        text-align: center;
        font-weight: bold;
    }

    .count-down-item .unit {
        text-align: center;
        color: #fff;
        border-top: #fff solid 1px;
    }

    .entrance{
        width:4.5rem;
        top:2.5rem;
        left:7.6rem;
        cursor:pointer;
        position: absolute;
        display: none;
    }
   
    .logo{
        margin: 1.375rem  2.625rem 0 ;
        width: 8rem;
        height:  2.375rem;
        background: #FEA000;
        color: #fff;
        line-height: 2.375rem;
        text-align: center;
        font-size: 16px;
        letter-spacing: 2px
    }

    .line {
        margin-top: 0.2rem;
        margin-left:  2.625rem;
        height: 1px;
        width: 8rem;
        background: #FEA000;

    }

    .notice-block{
        width: 8rem;
        height: 4rem;
        margin-top: 0.2rem;
        background: #737373;
        margin-left:  2.625rem;
        text-align: center;
    }

    .notice-block .date{
        color: #fff;
        padding: 0.5rem 0;
        line-height: 0.75rem;
        font-size:16px;
    }
    
    .notice-block .date .iconfont{
        font-size: 25px;
    }

    .button { 
        transform: skewX(-33deg); 
        height: 1.25rem;
        background: #FEA000;
        min-width: 3.9rem;
        display: inline-block;
        padding: 0 10px;
    } 

    .button > div { 
        transform: skewX(33deg);
        line-height: 1.25rem;
        color: #fff;
        font-size: 16px;
        text-align: center;
    }
/*
    .video-container-inner{
         clip-path: polygon(200px 0, 0 100%,120px 100%,320px 0%);
        background: #FEC35D;
        position: absolute;
        left: 0;
        top:0;
        bottom: 0;
        width: 100%;
        width: 13.6%;
        background:  #FEC35D;
        height: 100%
    }*/


    .block-container{
        margin: 1.5rem 2.74rem;
    }
    .block-container table > tr:last-child td {
        height: 0;
    }
    .block-list{
        margin: 0;
        overflow: hidden;
        display: flex;
    }
    .block{
        width: 5.35rem;
        height: 5.35rem;
        background: #FF9600;
        border: 1px solid #FF9600;
    }

    .block p, .yhhz .title{
        color: #fff;
        font-size: 18px;
        font-weight: bold;
    }
    
    .block-2{
        width: 7.17rem;
        height: 5.35rem;
        background: #FF9600;
        border: 1px solid #FF9600;
        position:absolute;
        top:0;
        z-index: -1;
    }
    .block-3{
        width: 16.05rem;
        height: 5.35rem;
        border: 1px solid #FF9600;
    }
    .block.skew{
        background:  #FEC35D;
        transform-origin: left bottom ; 
        transform: skewX(-33deg);
        border: none;
    }
    .block.center{
        background: transparent;
        /*border: 1px solid  transparent;*/
        border-right-color: transparent ; 
    }

    .block-container td{
        width: 5.35rem;
        height: 5.35rem;
    }
    .block-container td.yhhz {
        text-align: center;
        vertical-align: middle;
        position: relative;
    }

    .block-container td.block{
        background:  #FF9600;
    }
    .block-container td.border{
         border:1px solid  #FF9600;
    }
    .block-container td.skew{
        background:  #FEC35D;
        transform-origin: left bottom ; 
        transform: skewX(-33deg);
    }

    .block-container .race-brief{
        color: #f98019;
        font-size: 14px;
        padding: 10px;
        /*line-height: 25px;*/
    }
    .block-container .notice-dashbord{
        left: auto;
        right: 0;
        top:0;
        height: 100%;
        border-radius: 0;
    }
    .brand-level-1 {
       width: 44.92vw;
       margin: auto;
    }

    .brand-level-1 .brand-logo-list > li {
        width: auto;
    }

    .brand-level-2 {
        display: flex;
        padding:  0  3.125vw;
        justify-content: space-between;
    }

    .brand-level-2 > div {
        width: 44.92vw;
    }

    .brand-level-3 {
        padding:  0  3.125vw;
    }
     
    .column-item-container{
        margin: 2.5rem auto;
        margin-bottom: 5.75rem;
       
    }
    .column-header{
        position: relative;
        display: flex;
        justify-content: center
    }

    .column-header>div{
        flex: 1
    } 

    .column-header:after{
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: #FF9600;
        bottom: 0;
        position: absolute;
    }

    .column-header .caption{
        line-height: 1.25rem; 
        font-size: 16px;
        padding-right: 1.75rem;
        padding-left: .5rem
    } 

    .column-header .button{
        transform-origin: right bottom;
    }

    .column-header .button >div{
        font-weight: bold;
    }

    .brand-logo-list{
        list-style: none;
    }

    .brand-logo-list > li{
        display: inline-block;
        width: 25%;
        vertical-align: baseline;
        margin-bottom: 20px
    }

    .brand-logo-list > li img{
        width:100% ;
        cursor: pointer;
        display: block;
    }

    .brand-logo-list .brand-name{
        text-align: center;
    }

</style>

