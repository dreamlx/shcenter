<template>
    <div style="overflow-x:hidden;min-height:800px;">
        <c-header></c-header>
        <div style="margin-top:.1rem;">
            <c-nav></c-nav>  
        </div>
        <div class="content">
            <div class="nav">
                <ul class="nav-list">
                    <li v-for="(n,index) in  navs" :class="[{active: currentView == n.key }]" @click="navClick(index)" ><a class="c-menu-skew"><span>{{n.label}}</span></a></li>
                </ul>
                <div class="nav-clip"></div>
            </div>
            <div class="body">
                 <div class="tabs-wrapper">
                    <c-tab :tabs='navs' @tabClick="tabClick" ref="cTab"></c-tab>
                </div>
                <div class="paper">
                    <div class="e-title">2018 上海中心国际垂直马拉松赛</div>
                    <div class="l-title">成绩证书</div>
                    <div class="fr" style="margin-bottom:.5rem">
                        <div><p style="width:1.35rem;text-align:left">祝贺</p></div>
                        <div><p class="name" ></p></div>
                        <div><p style="width:1.35rem;text-align:center">于</p></div>
                        <div><span class="date"></span></div>
                    </div>
                    <div class="fr" style="margin-bottom:.9rem">成功完成赞助商名称 2018 上海中心国际垂直马拉松赛</div>
                    <div class="row">
                        <diV>参赛号码</diV>
                        <div><span></span></div>
                    </div>
                    <div class="row">
                        <diV>净计时成绩</diV>
                        <div><span></span></div>
                    </div>
                    <div class="row">
                        <diV>成绩排名</diV>
                        <div><span></span></div>
                    </div>

                    <div class="signature">
                        领导签名
                    </div>

                    <div class="signature">
                        赞助商
                    </div>

                </div>

            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>
<script>
    import CHeader from '@/components/c-header';
    import CNav from '@/components/c-nav';
    import CTab from '@/components/c-tab';
    let loadingBar, resolveWrapper = function (resolve) {
            let _resolve = resolve;
            loadingBar.start();
            return function () {
                loadingBar.finish();
                return  _resolve.apply(this,[].slice.call(arguments));
            };
    };
    export default {
        components: {
            CHeader,
            CNav,
            CTab
        },
        data() {
            return {
                currentView: '2018',
                navs:[{
                    label:'2018',
                    key:'2018'
                }],
                formItem:{

                }
            };
        },
        computed: {
           
        },
        watch:{
          
        },
        created() {
            loadingBar = this.$Loading;
        },
        mounted(){
            
        },
        methods: {
            navClick(index){
                this.currentView = this.navs[index].key;
                this.$refs.cTab.setActiveTab(index);
            },
            tabClick(index){
                this.currentView = this.navs[index].key;
            }
        }
    };
</script>

<style scoped>
    .content{
        padding: .625rem 2px 0;
        display: flex;
        width: 100%
    }
    .body{
        padding: 0 .25rem;
        flex: 1;

    }
    .nav{
        width: 5.325rem;
        border: 1px solid #FEA000;
        height: 6.1rem;
        position: relative;
        padding-left: .6rem
    }
    .nav>ul{
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

    .tabs-wrapper{
        text-align: center;
    }
    .paper{
        width: 14.625rem;
        background: #F9EFE3;
        text-align: center;
        color:  #FEA000;
        font-size: 16px;
        font-weight: bold;
        margin: .75rem auto;
        padding-bottom: 1rem;
        overflow: hidden;
    }
    .e-title{
        margin-top: .625rem;
        display: inline-block;
        position: relative;
        padding-left: 16px;
    }

    .e-title:before{
        content: "";
        display: block;
        width: 6px;
        height: 20px;
        background: #FEA000;
        position: absolute;
        left:0
    }


    .l-title{
        font-size: 25px;
        font-weight: bold;
        margin: .625rem  auto .75rem;
    }
    .signature{
        width: 11.83rem;
        height: 2.625rem;
        background: #fff;
        margin:20px auto; 
        padding-left: 1.25rem;
        padding-top: 10px;
        text-align: left;
    }
    .row{
        display: flex;
        width: 11.83rem;
        margin: auto;
        margin-bottom: .5rem
    }
    .row>div:first-child{
        padding-left: 1.25rem;
        width: 4.75rem;
        text-align: left;
    }
    .row>div:last-child{
        text-align: right;
        padding-right: 1.3rem;
        flex: 1
    }
    .row>div:last-child >span{
        background: #fff;
        display: block;
        height: 35px;
    }

    .fr{
        width: 11.83rem;
        padding-left: 1.25rem;
        margin: auto;
        text-align: left;
        display: flex;
        align-items: center;
    }
    .fr .name{
        display: inline-block;
        background: #fff;
        height: 35px; 
        width:3.875rem;
    }

    .fr .date{
        display: inline-block;
        background: #fff;
        height: 35px; 
        width:2.55rem;
    }
    .fr >div:last-child{
        text-align: right;
        padding-right: 1.3rem;
        flex: 1
    }

</style>

