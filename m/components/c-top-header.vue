<template>
    <div>
        <div class="header">
            <span class="account-box" v-if="account">
                <span class="account">{{account}}</span>&nbsp;&nbsp;<a @click="toLogout">{{$t('退出登录')}}</a>
            </span>
            <div class="lang-list" style="display:none">
                <span :class="['lang',{'active' : lang == 'zh'}]"  @click="lang2Zh">中文</span><span class="separator" >|</span><span :class="['lang',{'active' : lang == 'en'}]" @click="lang2En">En</span>
            </div>
            <div class="vux-header-right"  @click="onMenuClick">
                <span class="menu-list-icon">
                    <svg type="navicon" size="35" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-navicon" style="fill: rgb(255, 255, 255);">
                        <path d="M96 241h320v32H96zm0-96h320v32H96zm0 192h320v32H96z"></path>
                    </svg>
                </span>
            </div>
        </div>
        <slot name="side-nav"></slot>
    </div>
</template>
<script>
import Bus from '../lib/bus';
export default {
    data() {
        return {
            account: ''
        };
    },
    computed:{
        lang(){
            return this.$i18n.locale;
        }
    },
    watch:{
       
    },
    created() {
     
    },
    mounted(){
        this.account = this.$localStorage.get('account');
        Bus.$on('LoginSuccess', (account) => {
            this.account = account;
        });
        Bus.$on('LoginExpired', () => {
            this.account = '';
            this.$localStorage.remove('account');
            this.$localStorage.remove('token');
            this.$router.push('/login');

        });
    },
    methods: {
        lang2Zh(){
            this.$i18n.locale = 'zh';
        },
        lang2En(){
            this.$i18n.locale = 'en' ;
        },
        onMenuClick(event){
            this.$emit('onMenuClick', event);
        },
        toLogout(){
            this.account = '';
            this.$localStorage.remove('account');
            this.$localStorage.remove('token');
            this.$router.push('/');
        }
    }
};
</script>

<style  scoped>
    .header{
        background-color: #FF9F00;
        position: relative;
        height: 120px;
        overflow: hidden;
    }
    .account-box{
        display: inline-block;
        margin-top: 30px;
        height: 60px; 
        font-size: 40px;
        line-height: 60px;
        padding-left: 35px;
        color: #fff;
    }
    .account-box .account{
        font-size: 40px;
        color: #fff
    }
    .header .vux-header-right {
        position: absolute;
        top: 13px;
        display: block;
        font-size: 14px;
        color: #ccc;
        right: 36px;
        color: #fff

    }
    .lang-list{
        float: right;
        margin-right: 144px;
        margin-top: 30px;
        height: 60px; 
        font-size: 40px;
        line-height: 60px;
    }
    .lang-list .separator{
        color: #fff;
        padding: 0 28px;
    }
    .lang-list .lang{
        display: inline-block;
        width: 166px;
        height: 60px;
        color: #fff;
        text-align: center;
    }
    .lang-list .active{
        background: #fff;
        border-radius: 30px;
        color: #FF9F00;
    }
    .menu-list-icon svg{
        height: 94px;
        width: 94px;
        border: 2px solid #fff;
        border-radius: 10px;
    }

</style>

