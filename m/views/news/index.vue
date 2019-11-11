<template>
    <div>
       <race-nav></race-nav>
       <div>
           <div class="editor-area">
                <h2 v-html="news.title" class="title" v-if="lang == 'zh'"></h2>
                <h2 v-html="news.title_en" class="title" v-if="lang == 'en'"></h2>
                <div class="ql-container">
                    <div class="ql-editor" v-html="news.content" v-if="lang == 'zh'" > </div>
                    <div class="ql-editor" v-html="news.content_en" v-if="lang == 'en'" > </div>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
    import RaceNav from '../race/current/race-nav';
    export default {
        components: {
            RaceNav
        },
        data() {
            return {
                news:{}
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
        padding: 90px 25px;
    }
    .editor-area h2{
        text-align: center;
        font-size: 40px;
        display: inline-block;
    }
    .editor-area .ql-editor{
        font-size: 7px;
    }


</style>

