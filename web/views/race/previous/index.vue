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
                currentView: 'media',
                navs:[{
                    label:'图片与视频',
                    key:'media'
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
    .content{
        padding: .625rem 2px 0;
        display: flex;
        width: 100%
    }
    .body{
        padding: 0 .25rem;
        flex: 1;

    }
   

</style>

