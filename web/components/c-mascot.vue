<template>
    <div class="mascot">
        <img src="../assets/mascot.png" v-if="mascotType == 0">
        <img src="../assets/mascot-1.png" v-if="mascotType == 1">
        <img src="../assets/mascot-2.png" v-if="mascotType == 2">
        <img src="../assets/mascot-3.png" v-if="mascotType == 3">
        <div :class='["bubble","bubble-" + mascotType]'>
            <div class="bubble-inner">
                <span v-html='$t(message)'></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        message: String,
        mascotType:{
            type: Number,
            default: 0
        }
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

<style  scoped>
    .mascot{
        position: relative;
        padding-top: 50px;
        display: inline-block;
    }
    .bubble{
        position: absolute;
        top:0;
        left: 108px;
        width: 260px;
        height: 99px;
        background-image: url('../assets/bubble.png');
        background-repeat: no-repeat;
        background-size: 100%;
    }

    .bubble-0,.bubble-2,.bubble-3{
        width: 260px;
        height: 99px;
        background-image: url('../assets/bubble.png');
    }
    .bubble-1{
        background-image: url('../assets/bubble-1.png');
        width: 156px;
        height: 97px;
    }

    .bubble-inner{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        bottom: 20px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        display: flex;
      
        align-items: center;
    }
    .bubble-inner >span{
        flex: 1;
        text-align: center;
        opacity: .8;
        font-size: 15px;
        line-height: 18px;
    }
</style>

