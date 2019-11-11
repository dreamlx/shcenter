<template>
    <div>
       <div class="m-news">
            <div class="news-header">
                <span class="title">赛事新闻</span>
                <span class="more" @click="toNewsList">more 更多</span>
            </div>
            <div class="top-news">
                <div class="img-box">
                    <div v-if="newsList.length>0">
                        <div class="img-box lazy-box" v-lazy:background-image="newsList[0].banner_src + '?imageslim'"></div>
                    </div>
                </div>
                <div class="brief">
                    <p v-if="newsList.length>0" >
                        <template v-if="lang == 'zh'"> {{newsList[0].title}}</template>
                        <template v-if="lang == 'en'"> {{newsList[0].title_en}}</template>
                    </p>
                </div>
            </div>
            <div class="m-news-date" v-if="newsList.length>0">
                <span>{{newsList[0].date}}</span>
            </div>
            <div class="news-list-wrapper">
                <ul class="news-list">
                    <li class="news-item" v-for="(news,index) in newsList" :key="index" @click="toNews(index)">
                        <p v-if="lang == 'zh'">{{news.title}}</p>
                        <p v-if="lang == 'en'">{{news.title_en}}</p>
                       
                        <i  class="ivu-icon ivu-icon-md-arrow-forward" ></i>
                         <span class="date">{{news.day}}</span>
                    </li>
                </ul>
                <!-- <div class="more">+更多内容</div> -->
            </div>
        </div>
    </div>
</template>
<script>
    import format from '../../lib/datetime-format';
    export default {
        components: {
        
        },
        data() {
            return {
                newsList: []
            };
        },
        computed:{
            lang(){
                return this.$i18n.locale;
            }
        },
        created() {
            this.getNewsList();
        },
        mounted(){
          
        },
        methods: {
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
                            n.date = !isNaN(d) ? format(d,'YYYY.MM.DD') : '';
                            n.day =   !isNaN(d) ? format(d,'MM.DD') : '';
                        });
                        this.newsList = newsList ;
                    })
                    .catch(() => {
                     
                    });
            },
            toNewsList(){
                this.$router.push('/current/race/news');
            },
            toNews(index){
                this.$router.push({path: '/news/' + this.newsList[index].id ,query: {}});
            }
        }
    };
</script>
<style scoped>
  
    .m-news{
        padding: 0 35px;
    }
    .news-header{
        height: 80px;
        border-bottom: 2px solid  #FF9F00;
        overflow: hidden;
    }
    .news-header .title{
        color: #FF9F00;
        font-weight: bold;
        font-size: 42px;
    }
    .news-header .more{
        float: right;
        background: #FF9F00;
        color: #fff;
        display: inline-block;
        width: 375px;
        height: 80px;
        text-align: center;
        font-size: 35px;
        line-height: 80px;
    }

    .top-news{
        margin-top: 18px;
    }
    .top-news .img-box{
        height: 500px;
        overflow: hidden;
    }
    
    .top-news .brief{
        height: 132px;
        background: #7F7F7F;
    }
    .top-news .brief p{
        padding:25px;
        color: #fff;
        font-size:42px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .m-news-date{
        margin: 30px 0;
        text-align: center;
    }
    .m-news-date span{
        color: #FF9F00;
        padding: 0 20px;
        border-left: 2px solid #FF9F00;
        border-right:  2px solid #FF9F00;
        font-size: 40px;
    }
    .news-list{
        list-style: none;
    }
    .news-item{
        height: 130px;
        line-height: 130px;
        padding: 0 20px;
        overflow: hidden;
    }
    .news-item p{
        width: 420px;
        font-size: 36px;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .news-list >li:nth-of-type(odd){
        background: #FFF1DA
    }
    .news-item .date{
        padding: 2px 15px;
        float: right;
        font-size: 36px;
        height: 40px;
        border-left: 2px solid #737171;
        border-right:  2px solid #737171;
        line-height: 40px;
        text-align: center;
        margin-top: 40px;
        margin-right: 20px;
    }
    .ivu-icon-md-arrow-forward{
        float: right;
        height: 40px;
        margin-top: 40px;
        font-size: 36px;
        font-weight: bold;
    }

    .news-list-wrapper .more{
        height: 130px;
        background: #FF9F00;
        text-align: center;
        line-height: 130px;
        color: #fff;
    }

</style>

