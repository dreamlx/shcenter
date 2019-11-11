<template>
    <div class="editor-area" >
        <h2 v-html="race.title" class="title" v v-if="lang == 'zh'"></h2>
        <h2 v-html="race.title_en" class="title" v-if="lang == 'en'"></h2>
        <div class="ql-container">
              <div class="ql-editor" v-html="race.content" v-if="lang == 'zh'"> </div>
              <div class="ql-editor" v-html="race.content_en" v-if="lang == 'en'"> </div>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
           
        },
        data() {
            return {
                race:{}
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
          
        },
        mounted(){
            this.getRaceInfo();
        },
        methods: {
            getRaceInfo(){
                this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/race/info',{params: {nav_name: '报名须知'}}
                )
                .then(res => {
                    this.race = res.data.result;
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
    }
    .editor-area .ql-editor{
        font-size: 7px;
    }


</style>

