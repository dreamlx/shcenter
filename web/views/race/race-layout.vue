<template>
    <div class="wrapper">
        <c-top-bar></c-top-bar>
        <c-header></c-header>
        <div style="margin-top:.1rem;">
            <c-nav></c-nav>  
        </div>
        <div class="content">
            <slot name="side-nav"></slot>
            <div class="body">
                <slot name="box-body" ></slot>
            </div>
        </div>
      
    </div>
</template>
<script>
    import CHeader from '@/components/c-header';
    import CNav from '@/components/c-nav';
    import CTopBar from '@/components/c-top-bar';
    export default {
        components: {
            CHeader,
            CNav,
            CTopBar
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
    .wrapper{
        overflow-x: hidden;
        min-height: 24rem
    }
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

