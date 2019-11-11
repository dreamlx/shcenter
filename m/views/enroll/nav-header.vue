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
                    label:'立刻报名',
                    key:'enrol'
                },{
                    label:'报名查询',
                    key:'query'
                },{
                    label:'报名须知',
                    key:'notice'
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

