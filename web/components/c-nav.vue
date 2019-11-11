<template>
    <div style="margin:.5rem 0">
        <ul class="menu-list">
            <li v-for="(n,index) in  navs"  :class="[{actived: currentView == n.label }]" @click="navClick(index)" :key="index">
                <div class="menu-item">
                    <i  :class="['c-icon', navIcons[index]]"></i><br/>
                    <span>{{$t(n.label)}}</span>
                </div>
                <div class="skew"></div>
                <div class="sub-menu-ct" v-if="n.sub && n.sub.length>0">
                    <div class="sub-menu-inner">
                        <ul class="sub-menu-list">
                             <li v-for="(s,subIndex) in  n.sub" @click="subNavClick($event,index,subIndex)" :key="subIndex"><span>{{$t(s.label)}}</span></li>
                        </ul>
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"  class="svg-clip-path" >
                            <polygon points="0 30, 20 0, 100 0,100 100,0 100" style=" fill:#fff; opacity:.6; overflow: hidden; z-index:3"></polygon>
                        </svg>
                      <!--   <div class="polygon-skew">
                             <div class="polygon-skew-bg" v-bind:style="{ transform: formatSkew(n.sub.length)}"></div>
                             <div style="height:5px;background:rgba(255,255,255,.6);width100%;z-index:3"></div>
                             <div class="rect-path"></div>
                        </div> -->
                        <div class="polygon-skew-path" v-bind:style="{ transform: formatSkew(n.sub.length)}"></div>
                      <!--   <div class="rect-path"></div> -->
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                currentView: '',
                //navIcon:["&#xe601;","&#xe625;","&#xe60f;","&#xe602;","&#xe67c;","&#xe600;"],
                navIcons:['home','bjss','wjss','video','bsbm','cjcx','gongyi','sponsor'],
                navs: [
                    { label: '首页', sub: [] },
                    {
                        label: '本届赛事',
                        sub: [{
                            label: '竞赛规程'
                        }, {
                            label: '常见问题'
                        },{
                            label: '备赛指南'
                        },{
                            label: '垂马课堂'
                        }]
                    },
                    { label: '系列活动', sub: [] },
                    { label: '图片与视频',sub: [] },
                    {
                        label: '比赛报名',
                        sub: [{
                            label: '立刻报名'
                        }, {
                            label: '报名查询'
                        }, {
                            label: '报名须知'
                        }]
                    },
                    {
                        label: '成绩查询',
                        sub: [
                             { label: '2018' },
                           
                        ]
                    },
                    { label: '垂马公益', sub: [] },
                    {
                        label: '赞助商',
                        sub: [{
                            label: '招商信息'
                        }, {
                            label: '赛事赞助商'
                        }]
                    },
                ]
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
            this.currentView = routerNames[0];
        },
        methods: {
            navClick(index){
                let router = this.$router.options.routes[0].children.find(r=>{ return r.name == this.navs[index].label; });
                this.currentView = this.navs[index].label;
                if(router){
                    this.$router.push('/' + router.path);
                }
            },
            subNavClick($event,index,subIndex){
                $event.stopPropagation();
                let routerNames = [this.navs[index].label,this.navs[index].sub[subIndex].label],
                    parentRouter = this.$router.options.routes[0].children.find(r=>{ return r.name == routerNames[0];}),
                    childRouter = parentRouter.children ?  parentRouter.children.find(r=>{ return r.name == routerNames.join('-');}) : '';
                if(childRouter){
                    this.currentView = this.navs[index].label;
                    this.$router.push({path: '/' + parentRouter.path + '/' + childRouter.path});
                    return;
                }
                if(parentRouter){
                    this.currentView = this.navs[index].label;
                    this.$router.push({path: '/' + parentRouter.path });
                    return;
                }

            },
            formatSkew(count){
                let skewX = 30 + (5 - count) * 8;
                if(count == 6 ){
                    skewX = 26;
                }
                return 'skewX(-' +  (skewX ) + 'deg)';
            }
        }
    };
</script>

<style  scoped>
    .menu-list{
        border-top: 1px dashed #c0c0c0 ;
        border-bottom:  1px dashed #c0c0c0;
        height: 2.125rem;
    }

    .menu-list>li{
        display: inline-block;
        width: 12.5%;
        text-align: center;
        white-space: nowrap;
        position: relative;
        border-right: 1px dashed #c0c0c0;
        position: relative;
    }
    .menu-list>li:last-child{
        border-right-color: transparent;         
    }

    .menu-list>li .skew{
        left: 0;
        top:0;
        width: 8.3vw;
        bottom: 1px;
        transform: skewX(-33deg); 
        background: #FEA000;
        position: absolute;
        transform-origin: left  bottom ;
        z-index: 1;
        display: none;

    }

    .menu-list>li:hover .skew {
        display:block;
    }
    .menu-list>li.actived .skew{
        display: block;
    }
    .menu-list>li.actived .menu-item{
        color: #fff
    }
    .menu-list>li:not(.actived):hover .menu-item{
        color: #fff
    }

    .menu-list>li:not(.actived):hover .sub-menu-ct{
        visibility: visible;
        transform: translateY(0) scale(1);
        opacity: 1;
    }

    .menu-list>li.actived:hover .sub-menu-ct{
        visibility: hidden;
        display: none;
        transform: translateY(-20%) scale(0); 
        opacity:0;

    }

    .menu-item{
        line-height: .55rem;
        font-size: 14px;
        padding: .5rem;
        height: 2.1rem;
        position: relative;
        z-index: 2;
        cursor: pointer;
    }
    .menu-item .c-icon{
        font-size: 25px;
        display: inline-block;
        width: 40px;
        height: 30px;
        background-repeat: no-repeat;
        background-position: center;

    }

    .menu-item .home{
        background-image: url(../assets/home.png);
    }
    .menu-list>li.actived .menu-item .home{
        background-image: url(../assets/home.png);
    }

    .menu-item .bjss{
        background-image: url(../assets/bjss.png);
    }
    .menu-list>li.actived .menu-item .bjss, .menu-list>li:hover .menu-item .bjss{
        background-image: url(../assets/bjss-light.png);
    }

    .menu-item .wjss{
        background-image: url(../assets/wjss.png);
    }
    .menu-list>li.actived .menu-item .wjss, .menu-list>li:hover .menu-item .wjss{
        background-image: url(../assets/wjss-light.png);
    }

    .menu-item .video{
        background-image: url(../assets/video.png);
    }
    .menu-list>li.actived .menu-item .video, .menu-list>li:hover .menu-item .video{
        background-image: url(../assets/video-light.png);
    }

    .menu-item .bsbm{
        background-image: url(../assets/bsbm.png);
    }
    .menu-list>li.actived .menu-item .bsbm, .menu-list>li:hover .menu-item .bsbm{
        background-image: url(../assets/bsbm-light.png);
    }

    .menu-item .cjcx{
        background-image: url(../assets/cjcx.png);
    }
    .menu-list>li.actived .menu-item .cjcx, .menu-list>li:hover .menu-item .cjcx{
        background-image: url(../assets/cjcx-light.png);
    }

    .menu-item .gongyi{
        background-image: url(../assets/gongyi.png);
    }
    .menu-list>li.actived .menu-item .gongyi, .menu-list>li:hover .menu-item .gongyi{
        background-image: url(../assets/gongyi-light.png);
    }

    .menu-item .sponsor{
        background-image: url(../assets/sponsor.png);
    }
    .menu-list>li.actived .menu-item .sponsor, .menu-list>li:hover .menu-item .sponsor{
        background-image: url(../assets/sponsor-light.png);
    }

    .sub-menu-ct{
        position: absolute;
        width: 100%;
      /*  clip-path: polygon(0 30%, 20% 0, 100% 0,100% 100%,0 100%);*/
       /* background:  #FEA000;*/
        padding: 1px;
        opacity: 1;
        transform: translateY(-20%) scale(0);
        transform-origin: top center;
        transition: all .3s cubic-bezier(0,0,.2,1) .3s;
        visibility: hidden;
        z-index: 999


    }
    .sub-menu-inner{
        position: relative;
        overflow:hidden;
        border-right: 1px solid  #FEA000;
        border-bottom:  1px solid  #FEA000;
       /* clip-path: polygon(0 30%, 20% 0, 100% 0,100% 100%,0 100%);
        border: solid 1px #FEA000;*/
    }
    .sub-menu-inner:before{
        position: absolute;
        top:30%;
        left: 0;
        width: 1px;
        bottom: 0;
        background: #FEA000 ;
        display: block;
        content: ""
    }

 
    .sub-menu-list{
        position: relative;
        z-index: 5;
        list-style: none;
    }

    .sub-menu-list >li{
        padding: 0 1.4rem;
    }

    .sub-menu-list >li span{
        border-bottom: 1px solid #FEA000 ;
        display: block;
        font-size: 14px;
        height: 1.2rem;
        line-height: 1.2rem;
        cursor: pointer;
      
    }
    .sub-menu-list >li:last-child span{
        border-bottom-color: transparent;
    }
    .svg-clip-path{
        position: absolute;
        top:0;
        left: 0;
        bottom: 0;
        width: 100%;
    }

    .polygon-skew-path{
        
        height: 35%;
        width: 30%;
        border: 1px solid transparent;
        border-right-color: #FEA000;
        transform: skewX(-30deg);
        -webkit-transform-origin: left bottom;
        transform-origin: left bottom;
        background: transparent;
        position: absolute;
        top: -1px;
        left: -33%;
        z-index: 3

    }

    
   
</style>

