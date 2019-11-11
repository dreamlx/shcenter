<template>
    <div>
       <!--  <div class="m-banner lazy-box" v-lazy:background-image="TopBanner"> -->
        <div class="m-banner">
            <img :src="kv"  v-if="kv" class="kv">
        </div>
    </div>
</template>
<script>
    // import TopBanner from '../../assets/m-banner.png';
    export default {
        components: {
        
        },
        data() {
            return {
                // TopBanner: TopBanner,
                kv: ''
            };
        },
        created() {
            this.getKV();
        },
        mounted(){
          
        },
        methods: {
            getKV(){
                this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/shcenter/api/sport/kv/find', {params: {type: 2}}
                    )
                    .then(response => {
                        this.kv = response.data.kv.src;
                    })
                    .catch(() => {
                     
                    });
            }
        }
    };
</script>
<style scoped>
    .m-banner{
        min-height: 945px;
        overflow: hidden;
    }
    .m-banner .kv{
        display: block;
        width: 100%;
    }

</style>

