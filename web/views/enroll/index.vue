<template>
    <sign-layout>
        <div  slot="box-body">
             <router-view></router-view>
        </div>
    </sign-layout>
</template>
<script>
    import CHeader from '@/components/c-header';
    import CNav from '@/components/c-nav';
    import SignLayout from './sign-layout';
    export default {
        components: {
            CHeader,
            CNav,
            SignLayout
        },
        data() {
            return {
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
          
        }
    };
</script>

<style scoped>

</style>

