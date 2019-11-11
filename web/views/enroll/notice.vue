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
                race_info: {}
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
                        '/shcenter/api/race/info',{params: {nav_name: '报名须知'}}
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
    
    .tips{
        color: #FEA000;
        font-size: 16px;
        font-weight: bold;
        font-family: cursive;
        margin-bottom: .7rem
    }
    .tips .iconfont{
        font-size: 30px;
        font-weight: normal;
    }
    .tips span{
        margin-left: 20px;
    }

    .result-tbl{
        width: 16.25rem;
        border-left: 1px solid  #FEA000;
        border-top: 1px solid  #FEA000;
    }
    .result-tbl td{
        border-right: 1px solid  #FEA000;
        border-bottom:  1px solid  #FEA000;
        height: 1.5rem;
        text-align: center;
        vertical-align: center;
        font-size:14px;
    }

    .result-tbl tr td:first-child{
        width: 5.9rem;
    }


    .button { 
        transform: skewX(-33deg); 
        height: 1.25rem;
        background: #FEA000;
        width: 7.5rem;
        display: inline-block;
        position: relative;
        max-height: 50px;
        margin-top: 1rem;
        margin-left: 4.25rem;
        margin-bottom:40px;
    } 

    .button > span { 
        transform: skewX(33deg) translateY(-50%);
        color: #fff;
        font-size: 16px;
        text-align: center;
        display:block;
        vertical-align: middle;
        text-align: center;
        width: 100%;
        position: absolute;
        top:50%;
        left:0;
        width: 100%;
    }


</style>

