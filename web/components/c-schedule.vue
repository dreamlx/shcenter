<template>
    <div class="c-schedule">
        <div class="c-schedule-list">
            <div>
                <div class="circle">
                    <span class="circle-inner">3月</span>
                </div>
                <div class="topic">女神节专场 <br>训练营</div>
            </div>
            <div>
                 <div class="circle circle-4">
                    <span class="circle-inner ">4月</span>
                </div>
                <div class="topic">环保公益行  <br>训练营</div>
            </div>
            <div>
                <div class="circle circle-5">
                    <span class="circle-inner ">5月</span>
                </div>
                <div class="topic">一个鸡蛋的暴走<br> 帝国大厦EBS RUNNING <br>赛事发布 </div>
            </div>
            <div>
                 <div class="circle circle-6">
                    <span class="circle-inner ">6月</span>
                </div>
                <div class="topic">台阶训练 </div>
            </div>
            <div>
                 <div class="circle circle-7">
                    <span class="circle-inner ">7月</span>
                </div>
                <div class="topic">夏日夜晚 </div>
            </div>
            <div>
                <div class="circle circle-8">
                    <span class="circle-inner ">8月</span>
                </div>
                 <div class="topic">登高技巧 <br>训练 </div>
            </div>
            <div>
                <div class="circle circle-9">
                    <span class="circle-inner ">9月</span>
                </div>
                 <div class="topic">秋日夜跑</div>
            </div>
            <div>
                <div class="circle circle-10">
                    <span class="circle-inner ">10月</span>
                </div>
                <div class="topic">赛事发布会</div>
            </div>
            <div>
                <div class="circle circle-11">
                    <span class="circle-inner ">11月</span>
                </div>
                <div class="topic">2019上海中心 <br>国际马拉松比赛 </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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
    .c-schedule-list {
        display: flex;
        justify-content: space-between;
        padding: 2.22vw 4.6875vw 1.56vw 4.6875vw;
    }
    .c-schedule-list > div {
        text-align: center;
    }
    .circle{
        display: inline-block;
        color: #fff;
        position: relative;
    }
    .circle-inner{
        width: 3.59vw;
        height: 3.59vw;
        font-size: 1.8vw;
        line-height: 3.59vw;
        text-align: center;
        background-color:#e3352b; 
        border-radius: 3.59vw;
        transform: skew(-14deg);
        white-space: nowrap;
        letter-spacing: -3px;
        display: inline-block;
    }
    .circle::before {
        display: block;
        content: "";
        height: 1.6vw;
        width: 2px;
        background-color:#e3352b; 
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -1px) skew(0);
    }
    .circle::after {
        display: block;
        content: "";
        height: 5px;
        width: 5px;
        border-radius: 50%;
        background-color:#e3352b; 
        position: absolute;
        bottom: -1.6vw;
        left: 50%;
        transform: translateX(-50%) skew(0);
    }
     
    .circle-4 .circle-inner, .circle-4::before, .circle-4::after  {
        background-color: #e9672d;
    }
    .circle-5  .circle-inner, .circle-5::before, .circle-5::after  {
        background-color: #ea802d;
    }
    .circle-6  .circle-inner, .circle-6::before, .circle-6::after  {
        background-color: #e9972d;
    }
    .circle-7  .circle-inner, .circle-7::before, .circle-7::after  {
        background-color: #e9ad2e;
    }
    .circle-8  .circle-inner, .circle-8::before, .circle-8::after  {
        background-color: #e9972d;
    }
    .circle-9  .circle-inner, .circle-9::before, .circle-9::after  {
        background-color: #ea802d;
    }
    .circle-10 .circle-inner, .circle-10::before, .circle-10::after  {
        background-color: #e9672d;
    }
    .circle-11 .circle-inner, .circle-11::before, .circle-11::after  {
        background-color: #e3352b;
    }
    .topic {
        margin-top:2.8125vw;
        text-align: center;
        font-size: 1.4vw;
        line-height: 1.5625vw
    }
   
</style>

