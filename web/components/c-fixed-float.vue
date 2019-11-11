<template>
   <div class="fixed-float-container" v-if="visible">
       <i class="close-icon" @click="visible = false"></i>
       <img src="../assets/enroll-hot.png"/>
    </div>
</template>
<script>
const prefixCls = 'ivu-btn';
export default {
    data(){
        return {
            visible: true
        };
    }
};
</script>

<style  scoped>
    .fixed-float-container{
        width: 16.02vw;
        height: 10.93vw;
        position: fixed;
        top: 50%;
        right: 1.5625vw;
        z-index: 999;
    }
    .close-icon {
        content: "";
        display: block;
        width: 1.95vw;
        height: 1.95vw;
        background-image: url(../assets/close.png);
        background-size: 100%;
        position: absolute;
        top: -.4vw;
        right: -.4vw;
        cursor: pointer;
    }
    .fixed-float-container img {
        width: 100%;

    }
   
</style>

