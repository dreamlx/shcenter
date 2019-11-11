<template>
    <div class="editor-area">
        <h2 v-html="title" class="title"></h2>
        <div class="ql-container">
            <div class="ql-editor" v-html="content">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                title: '',
                content: '',
            };
          
        },
        computed: {
          
        },
        watch:{
           
        },
        created(){
           
        },
        mounted() {
            this.getNews();
        },
        methods: {
            getNews(){
                this.$Spin.show({
                    render: h => {
                        return h('div', [
                            h('Icon', {
                                class: 'demo-spin-icon-load',
                                props: {
                                    type: 'load-c',
                                    size: 18
                                }
                            }),
                            h('div', 'Loading')
                        ]);
                    }
                });
                this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/sport/news/find',{params: {id: this.$route.query['id']}}
                )
                .then(response => {
                    let res = response.data;
                    this.title =  res.news.title;
                    this.content = res.news.content;
                    this.$Spin.hide();
                })
                .catch(() => {
                   
                    this.$Spin.hide();
                });

            }
        },
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