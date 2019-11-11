<template>
    <transition  name="transition-drop">
        <div class="nav"  v-show="currentVisible" >
            <ul class="nav-list">
                <li @click="toHome" :class="[{active: currentView == 'home' }]"><a class="nav-link">首页</a><i class="iconfont arrow">&#xe605;</i></li>
                <li v-for="(n,index) in  navs" :class="[{active: currentView == n.label }]" @click="navClick(index)" ><a class="nav-link">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t(n.label)}}</a>
                    <i class="iconfont arrow">&#xe605;</i>
                </li>
            </ul>
        </div>
    </transition>
</template>
<script>
    export default {
        props:{
            navs:{
                type: Array,
                default: []
            },
            visible: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                currentView: '',
                currentVisible: this.visible
            };
        },
        computed: {
           
        },
        watch:{
            visible (val) {
                this.currentVisible = val;
            },
            currentVisible (val) {
                this.$emit('on-visible-change', val);
            }
        },
        created() {
         
        },
        mounted(){
            let routerNames = this.$route.name.split('-');
            routerNames.push('');
            this.currentView = routerNames[1] || this.navs[0].label;
        },
        methods: {
            toHome(){
                this.currentView = 'home';
                this.$router.push({path: '/'});
            },
            navClick(index){
                let routerNames = this.$route.name.split('-'),
                    parentRouter = this.$router.options.routes.find(r=>{ return r.name == routerNames[0];}),
                    childRouter = parentRouter ?  parentRouter.children.find(r=>{ return r.name == [routerNames[0],this.navs[index].label].join('-');}) : '';
                if(childRouter){
                    this.currentView = this.navs[index].label;
                    this.$router.push({path:  parentRouter.path  + '/' + childRouter.path});
                }

                this.currentVisible = false;
            }
        }
    };
</script>

<style  scoped>
    .nav {
        padding: 15px 35px;
        position: absolute;
        width: 100%;
        z-index: 999;
    }
    .nav > ul{
        list-style: none;
    }
    .nav-list > li {
        height: 135px;
        line-height: 135px;
        padding-left: 195px;
        position: relative;
        background: #b0afaf;
        color: #fff;
        overflow: hidden;

    }
    .nav-list > li .nav-link {
        font-size: 42px;
    }
    .nav-list > li.active {
        background: #FEA000;
    }
    .nav-list > li .arrow {
        float: right;
        margin-right: 90px;
    }
 
</style>

