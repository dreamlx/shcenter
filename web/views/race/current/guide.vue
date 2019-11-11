<template>
    <div class="editor-area" >
        <h2 v-html="race_info.title" class="title" v-if="!isEN"></h2>
        <h2 v-html="race_info.title_en" class="title" v-if="isEN"></h2>
        <div class="ql-container">
            <div class="ql-editor" v-html="race_info.content" v-if="!isEN"> </div>
            <div class="ql-editor" v-html="race_info.content_en" v-if="isEN"> </div>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
          
        },
        data() {
            return {
                race_info:{}
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
            this.getRaceInfo();
        },
        mounted(){
           
        },
        methods: {
            getRaceInfo(){
                this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/race/info',{params: {nav_name: '备赛指南'}}
                )
                .then(res => {
                    this.race_info = res.data.result;
                })
                .catch(() => {
                 
                });
            }
        }
    };
</script>

<style scoped>
   

</style>

