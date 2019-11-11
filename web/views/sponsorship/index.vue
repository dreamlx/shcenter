<template>
    <sp-layout>
        <div  slot="side-nav">
            <c-side-nav :navs="navs"></c-side-nav>
        </div>
        <div  slot="box-body">
            <router-view></router-view>
        </div>
    </sp-layout>
</template>
<script>
    import SpLayout from './sp-layout';
    import CSideNav from '../../components/c-side-nav';
    export default {
        components: {
            SpLayout,
            CSideNav
        },
        data() {
            return {
                currentView: '',
                navs:[{
                    label:'招商信息',
                    key:'investment'
                },{
                    label:'赛事赞助商',
                    key:'sponsor'
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
            navClick(index){
                this.currentView = this.navs[index].key;
            }
        }
    };
</script>

<style scoped>
  
   

</style>

