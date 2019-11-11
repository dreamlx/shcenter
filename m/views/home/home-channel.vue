<template>
    <div class="m-channel">
        <c-button :disable='true'> <span class="date">{{$t('比赛时间：')}}<br>2019年11月24日</span></c-button><span class="separator"></span><c-button @click="toEnroll"> <span class="enroll">{{$t('立刻报名')}}</span></c-button>
    </div>
</template>
<script>
    export default {
        components: {
        
        },
        data() {
            return {
               
            };
        },
        created() {
           
        },
        mounted(){
          
        },
        methods: {
            toEnroll(){
                this.$router.push('/enroll');
            }
        }
    };
</script>
<style scoped>
    .m-channel{
        text-align: center;
        padding: 20px 0;
    }
    .m-channel .separator{
        padding: 0 1px;
    }
    .date,.enroll{
        font-size: 35px;
    }

</style>

