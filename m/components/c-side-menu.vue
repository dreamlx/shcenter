<template>
    <transition  name="transition-drop">
        <div class="menu-wrapper" v-show="currentVisible">
            <ul class="menu-list" >
                <li  v-for="(menu,index) in  menuList"  :class="[{active: index == 0 }]" @click="onMenuItemClick(index)">
                    <a >{{$t(menu.label)}}</a>
                </li>
            </ul>
             <div class="menu-footer">
                <span><button class="m-btn" @click="toLogin">{{$t('登录')}}</button></span><span><button class="m-btn" @click="toRegister">{{$t('注册')}}</button></span>
              </div>
        </div>
    </transition>
</template>
<script>
    export default {
        props:{
            visible: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                currentVisible: this.visible,
                menuList:[
                    {label: '首页' },
                    {label: '本届赛事' },
                    {label: '图片与视频' },
                    {label: '比赛报名' },
                    {label: '成绩查询' },
                    {label: '赞助商' },
                ],
            };
        },
       
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                      
                        [`${prefixCls}-loading`]: this.loading != null && this.loading,
                     
                    }
                ];
            }
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
        mounted () {
           
        },
        methods: {
            onMenuItemClick(index){
                let router = this.$router.options.routes.find(r=>{ return r.name == this.menuList[index].label; });
                console.log(3333);
                if(router){
                    this.$router.push(router.path);
                }
            },
            toLogin(){
                this.$router.push('/login');
            },
            toRegister(){
                this.$router.push('/register');
            },
        }
    };
</script>

<style  scoped>
    .menu-wrapper{
        width: 555px;
        background-color: rgba(0,0,0,.4);
        position: absolute;
        right: 0;
        transition: max-height .3s ease-in;
    }

    .menu-list{
        list-style: none;
        z-index: 999
    }
   
    .menu-list>li{
        padding: 0 40px
    }
    .menu-list>li a{
        color: #fff;
        display: block;
        text-align: center;
        height: 80px;
        line-height: 80px;
        font-size: 40px;
    }
    .menu-list>li.active a{
        border: 1px solid #fff;

    }

    .menu-footer{
        display: flex;
    }
    .menu-footer>span{
        border-right: 1px solid #fff;
    }

    .m-btn{
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        background: #FF9F00;
        color: #fff;
        -webkit-appearance: none;
        height: 96px;
        box-sizing: border-box;
        border: none;
        width: 279px;
        font-size: 40px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .5s  ease-in-out;;
     
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
       opacity: 0
    }
   
   
</style>

