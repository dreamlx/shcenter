<template>
    <div>
       <c-top-header @onMenuClick="onMenuClick">
           <div slot="side-nav" style="position:relative">
                <c-top-nav :navs="navs" :visible='showMenuList' @on-visible-change="onVisibleChange"></c-top-nav>
           </div>
       </c-top-header>
    </div>
</template>
<script>
    import CTopHeader from '@/components/c-top-header';
    import CTopNav from '@/components/c-top-nav';
    export default {
        components: {
            CTopNav,
            CTopHeader
        },
        data() {
            return {
                showMenuList: false,
                navs:[{
                    label:'招商信息',
                    key:'investment'
                },{
                    label:'赛事赞助商',
                    key:'sponsors'
                }]
            };
        },
        computed: {
          
        },
        watch:{
           
        },
        created() {
          
        },
        mounted(){
          
        },
        methods: {
            onMenuClick(){
                this.showMenuList = !this.showMenuList;
            },
            onVisibleChange(val){
                this.showMenuList = val;
            }
        }
    };
</script>

<style scoped>
   


</style>

