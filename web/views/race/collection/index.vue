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
                    label:'2017',
                    key:'2017'
                },{
                    label:'2018',
                    key:'2018'
                },{
                    label:'2019',
                    key:'2019'
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

