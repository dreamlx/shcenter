<template>
   <ul :class='["nav-list",{"skew": skew}]'>
        <li v-for="(n,index) in  tabs" :class="[{active: currentTab == n.key }]"  :key="index" @click="tabClick(index)">
            <a class="c-menu"><span>{{$t(n.label)}}</span></a>
        </li>
    </ul>
</template>
<script>
    export default {
        props:{
            tabs:Array,
            skew: {
                type: Boolean,
                default:  true
            },
            activeTabIndex:{
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                currentTab:''
            };
        },
        computed: {
           
        },
        watch:{
           
        },
        created() {
         
        },
        mounted(){
            this.currentTab = this.tabs[this.activeTabIndex].key;
        },
        methods: {
            tabClick(index){
                this.currentTab = this.tabs[index].key;
                this.$emit('tabClick',index);
            },
            setActiveTab(index){
                this.currentTab = this.tabs[index].key;
            }
        }
    };
</script>

<style  scoped>
    .nav-list{
        list-style: none;
        display: inline-block;
    }
    .nav-list>li .c-menu{
        background: #EEEEEE;
        margin-left: 10px;
    }

    .nav-list>li.active .c-menu{
        background: #FEA000;
       
    }
    .nav-list>li{
        display: inline-block;
        text-align: center;
    }
    .nav-list>li.active .c-menu>span{
         color: #fff
    }

    .c-menu{ 
        height: 1.22rem;
        width: 3.975rem;
        display: inline-block;
    } 

    .c-menu > span { 
        line-height: 1.22rem;
        color: #fff;
        font-size: 14px;
        text-align: center;
        display: inline-block;
        width: 2.5rem;
        color: #2c3e50;
        height: 1.22rem;
    }
    .c-menu.active{
        background: #fEA000
    }
    .skew .c-menu{
        transform: skewX(-30deg); 
        transform-origin: right bottom;

    }
    .skew .c-menu > span{
        transform: skewX(30deg);
    }


</style>