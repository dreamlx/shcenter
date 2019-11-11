<template>
    <div>
        <div class="m-news">
            <div class="top-news" v-for="(news,index) in newsList" :key="index">
                <p class="m-news-brief">
                    <template v-if="lang == 'zh'"> {{news.title}}</template>
                    <template v-if="lang == 'en'"> {{news.title_en}}</template>
                </p>
                <div class="img-box lazy-box" v-lazy:background-image="news.banner_src + '?imageslim'"></div>
                <div class="m-news-date" >
                    <span>{{news.date}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import format from '../../../lib/datetime-format';
    export default {
        components: {
           
        },
        data() {
            return {
                newsList: []
            };
        },
        computed: {
            lang(){
                return this.$i18n.locale;
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
            }
        }
    };
</script>

<style scoped>
    .m-news{
        padding: 20px 35px 0 35px; 
    }
    .m-news-brief{
        font-size: 40px;
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


</style>

