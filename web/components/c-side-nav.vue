<template>
    <div class="nav" v-bind:style="{ height: getNavHeight(navs.length)}">
        <ul class="nav-list">
            <li v-for="(n,index) in  navs" :class="[{active: currentView == n.label }]" :key="index"  @click="navClick(index)" ><a class="c-menu-skew"><span>{{$t(n.label)}}</span></a></li>
        </ul>
        <div class="nav-clip"></div>
    </div>
</template>
<script>
    export default {
        props:{
            navs:{
                type: Array,
                default: []
            }
        },
        data() {
            return {
                currentView: ''
            };
        },
        computed: {
           
        },
        watch:{

        },
        created() {
         
        },
        mounted(){
            let routerNames = this.$route.name.split('-');
            routerNames.push(routerNames[0]);
            this.currentView = routerNames[1];
        },
        methods: {
            navClick(index){
                let routerNames = this.$route.name.split('-'),
                    parentRouter = this.$router.options.routes[0].children.find(r=>{ return r.name == routerNames[0];}),
                    childRouter = parentRouter ?  parentRouter.children.find(r=>{ return r.name == [routerNames[0],this.navs[index].label].join('-');}) : '';
                if(childRouter){
                    this.currentView = this.navs[index].label;
                    this.$router.push({path: '/' + parentRouter.path + '/' + childRouter.path});
                }
            },
            getNavHeight(count){
                if(count == 6){
                    return '7.3rem';
                }else{
                    return '6.1rem';
                }
            }
        }
    };
</script>

<style  scoped>
    .nav{
        width: 5.325rem;
        border: 1px solid #FEA000;
        height: 6.1rem;
        position: relative;
        padding-left: .6rem
    }
    .nav > ul{
        list-style: none;
    }

    .nav-clip{
        height: 2.35rem;
        width: 1.4rem;
        border: 1px solid #fff;
        border-right-color: #FEA000;
        transform: skewX(-30deg); 
        transform-origin: left  bottom ;

        background: #fff;
        position: absolute;
        top: -1px;
        left: -1.4rem;

    }
    .nav-list>li{
       /* line-height: .55rem;*/
        font-size: 14px;
        font-size: 14px;
        height: 1.22rem;
        line-height: 1.22rem;
        text-align: center;
        position: relative;

    }
    .c-menu-skew > span { 
        transform: skewX(30deg);
        line-height: 1.22rem;
        color: #fff;
        font-size: 14px;
        text-align: center;
        display: inline-block;
        width: 2.5rem;
        color: #2c3e50;
        height: 1.22rem;
        border-top: 1px solid #FEA000 ;
    }

    .nav-list>li:first-child .c-menu-skew >span{
        border-top-color: transparent;
    }

    .nav-list>li.active .c-menu-skew{
        background: #FEA000;
       
    }
    .nav-list>li.active .c-menu-skew>span{
        color: #fff
    }
    .nav-list>li.active + li .c-menu-skew>span{
        border-top-color: transparent;
    }
   
</style>

