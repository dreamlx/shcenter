<template>
    <div>
        <ul class="news-list">
            <li  v-for="(news,index) in newsList" :key="index">
                <div v-if="!news.faked" @click="toNews(index)">
                    <div class="img lazy-box" v-lazy:background-image="news.banner_src + '?imageslim'"></div>
                    <div class="v-title"><span class="tag"></span><span>{{news.date}}</span></div>
                    <div class="brief" v-if="!isEN">{{news.title}}</div>
                    <div class="brief" v-if="isEN">{{news.title_en}}</div>
                </div>
            </li>
        </ul>
        <div class="page-bar" v-if="total>0">
            <Page :total="total" :prev-text='$t("上一页")' :next-text='$t("下一页")' :pageSize='pageSize' @on-change="onPageIndexChange" />
        </div>
    </div>
</template>
<script>
    export default {
        components: {
          
        },
        data() {
            return {
                pageSize: 6,
                pageIndex: 1,
                newsList: [],
                total: 0
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
            this.getNewsList();
        },
        mounted(){
           
        },
        methods: {
            getNewsList(){
                this.$http
                    .post(
                        this.$root.$options.baseURI +
                            '/shcenter/api/sport/news/list',{pageSize: this.pageSize,pageIndex: this.pageIndex}
                    )
                    .then(response => {
                        let newsList = response.data.list ;
                        newsList.forEach((n)=>{
                            let d = new Date(n.updated_at.replace(/-/g, '/'));
                            n.date = !isNaN(d) ? d.format('yyyy.MM.dd') : '';
                        });
                        
                        for(let left = 3 - newsList.length % 3; left > 0  && left < 3;left--){
                            newsList.push({faked :true});
                        }
                        this.newsList = newsList;
                        this.total = response.data.total;
                    })
                    .catch(() => {
                     
                    });
            },
            onPageIndexChange(index){
                this.pageIndex = index;
                this.getNewsList();
            },
            toNews(index){
                this.$router.push('/news/' + this.newsList[index].id);
            }
        }
    };
</script>

<style scoped>
    .news-list{
        list-style: none;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }
    .news-list>li{
        width: 8.5rem;
        margin-bottom: 1.1rem;
        cursor: pointer;
    }
    .news-list>li:last-child{
        padding-right: 0
    }
    .news-list>li .img{
        width: 100%;
        height: 5.7rem;
        background-color:  #DDD9DA
    }
    .news-list>li  img{
        width: 100%;
        height: 100%
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
    .page-bar{
        margin: 1.75rem 0;
        text-align: center;
    }

</style>

