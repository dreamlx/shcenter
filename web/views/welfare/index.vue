<template>
   <div>
        <c-header></c-header>
        <div style="margin-top:.1rem;">
            <c-nav></c-nav>  
        </div>
         <div class="content">
             <c-side-nav :navs="navs"></c-side-nav>
            <div class="body">
                <div v-for="(news,index) in newsList" :key="index" class="news">
                     <div class="v-item" >
                        <img v-lazy="news.banner_src + '?imageslim'">
                    </div>
                    <div>
                        <div class="v-title"><span class="tag"></span><span>{{news.title}}</span></div>
                        <div class="date" >{{news.date}}</div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>
<script>
    import CHeader from '@/components/c-header';
    import CNav from '@/components/c-nav';
    import CSideNav from '@/components/c-side-nav';
    export default {
        components: {
            CHeader,
            CNav,
            CSideNav
        },
        data() {
            return {
                currentView: '',
                navs:[{
                    label:'垂马公益',
                    key:'investment'
                }],
                newsList: []
            };
        },
        computed: {
           
        },
        watch:{
           
        },
        created() {
            this.getNewsList();
        },
        mounted(){
           
        },
        methods: {
            navClick(index){
                this.currentView = this.navs[index].key;
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
        }
    };
</script>

<style scoped>
    .content{
        padding: .625rem 2px 0;
        display: flex;
        width: 100%
    }
    .body{
        padding: 0 .25rem;
        flex: 1;
    }
    .news {
        display: flex;
        margin-bottom: 40px;
    }
    .news > div:first-child {
       width: 370px;  
    }
    .v-item img{
        max-width: 100%;
        width:100%;
    }
    .v-title{
        color: #FF9600;
        font-size: 22px;
        font-weight: bold;
        position: relative;
        padding-left: 2rem;
        line-height: 1rem
    }
    .tag{
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
    .date {
        font-size: 16px;
        padding-left: 1.5rem;
    }
</style>

