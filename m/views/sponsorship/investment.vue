<template>
    <div class="editor-area" >
        <h2 v-html="investment_info.title" class="title" v-if="!isEN"></h2>
        <h2 v-html="investment_info.title_en" class="title" v-if="isEN"></h2>
        <div style="text-align:center" v-if="investment_info.banner">
            <img :src="investment_info.banner">
        </div>
        <div class="ql-container">
            <div class="ql-editor" v-html="investment_info.content" v-if="!isEN"> </div>
            <div class="ql-editor" v-html="investment_info.content_en" v-if="isEN"> </div>
        </div>
    </div>
</template>
<script>

    export default {
        components: {
           
        },
        data() {
            return {
                investment_info:{}
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
            this.getInvestment();
        },
        mounted(){
          
        },
        methods: {
            getInvestment(){
                this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/investment/info',{}
                )
                .then(res => {
                    this.investment_info = res.data.investment;
                })
                .catch(() => {
                 
                });
            }
        }
    };
</script>

<style scoped>
   
.editor-area{
    margin:35px 35px;
}

</style>

