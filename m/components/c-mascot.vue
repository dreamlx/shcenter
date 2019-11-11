<template>
    <div class="mas">
        <img src="../assets/mascot.png" v-if="mascotType == 0">
        <img src="../assets/mascot-1.png" v-if="mascotType == 1">
        <img src="../assets/mascot-2.png" v-if="mascotType == 2">
        <img src="../assets/mascot-3.png" v-if="mascotType == 3">
        <div :class='["mas-bubble","mas-bubble-" + mascotType]'>
            <div class="mas-bubble-inner">
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
    .mas{
        position: relative;
        display: inline-block;
        padding-top: 8vw;
        margin: 8vw;
        margin-bottom: 0;

    }
    .mas-bubble{
        position: absolute;
        top:0;
        left: 26vw;
        width: 26vw;
        padding-bottom: 75%;
        background-image: url('../assets/bubble.png');
        background-repeat: no-repeat;
        background-size: 100%;
    }

    .mas-bubble-0,.mas-bubble-2,.mas-bubble-3{
        width: 50vw;
        padding-bottom: 75%;
        background-image: url('../assets/bubble.png');
    }
    .mas-bubble-1{
        background-image: url('../assets/bubble-1.png');
        width: 30vw;
        padding-bottom: 150%;
    }

    .mas-bubble-inner{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        bottom: 0;
        color: #fff;
        text-align: center;
        padding-top: 20%;
    }

    .mas-bubble-0 .mas-bubble-inner,.mas-bubble-2 .mas-bubble-inner{
        padding-top: 12%;
    }
    
    .mas-bubble-inner >span{
        text-align: center;
        opacity: .8;
        font-size: 30px;
        line-height: 30px;
    }

    .mas img{
        width: 26vw;
    }
</style>

