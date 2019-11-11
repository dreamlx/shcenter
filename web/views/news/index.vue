<template>
    <div style="overflow-x:hidden;min-height:800px;">
        <c-top-bar></c-top-bar>
        <c-header></c-header>
        <div style="margin-top:.1rem;">
            <c-nav></c-nav>  
        </div>
        <div class="content">
             <div class="editor-area" v-if="news">
                <h2 v-html="news.title" class="title" v-if="!isEN"></h2>
                <h2 v-html="news.title_en" class="title" v-if="isEN"></h2>
               <!--  <div style="text-align:center" v-if="news.banner_src">
                    <img :src="news.banner_src">
                </div> -->
                <div class="ql-container">
                    <div class="ql-editor" v-html="news.content" v-if="!isEN"> </div>
                    <div class="ql-editor" v-html="news.content_en" v-if="isEN"> </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CHeader from '@/components/c-header';
    import CNav from '@/components/c-nav';
    import CTopBar from '@/components/c-top-bar';
    export default {
        components: {
            CHeader,
            CNav,
            CTopBar
        },
        data() {
            return {
                news: null,
                
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
            this.getNews();
        },
        mounted(){
        },
        methods: {
            getNews(){
                this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/sport/news/find',{params: {id: this.$route.params.id}}
                )
                .then(response => {
                    let res = response.data;
                    this.news = res.news;
                })
                .catch(() => {
                   
                });
            }
        }
    };
</script>

<style scoped>
    .editor-area{
        padding: 20px;
    }
    .editor-area  h2.title{
        text-align: center;
    }
</style>