<template>
    <race-layout>
        <div  slot="side-nav">
            <c-side-nav :navs="navs"></c-side-nav>
        </div>
        <div  slot="box-body">
            <router-view></router-view>
        </div>
    </race-layout>
</template>
<script>
    import RaceLayout from '../race-layout';
    import CSideNav from '@/components/c-side-nav';
    export default {
        components: {
            RaceLayout,
            CSideNav
        },
        data() {
            return {
                currentView: '',
                navs:[{
                    label:'系列活动',
                    key:'events'
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

