<template>
    <div class="top-bar">
        <span>{{$t('欢迎访问上海中心国际垂直马拉松赛官网')}}</span>
        <span class="login" v-if="!account"><a @click="toLogin">{{$t('登录')}}</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a @click="toRegister">{{$t('注册')}}</a></span>
        <span class="login" v-if="account"><span class="account">{{account}}</span>&nbsp;&nbsp;<a @click="toChangePassword">{{$t('修改密码')}}</a>&nbsp;&nbsp;&nbsp;<a @click="toLogout">{{$t('退出登录')}}</a></span>
        <span class="lang">
            <a class="social-icon wx">
                <div class="qrcode"></div>
            </a>
            <a class="social-icon tik"></a>
            <a class="social-icon weibo"></a>
            <!-- <a @click="lang2Zh">{{$t('中文')}}</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a @click="lang2En">{{$t('EN')}}</a> -->
         </span>
    </div>
</template>
<script>
import Bus from '@/lib/bus';
export default {
    data() {
        return {
            account: ''
        };
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
        toLogin(){
            this.$router.push('/login');
        },
        toRegister(){
            this.$router.push('/register');
        },
        toLogout(){
            this.account = '';
            this.$localStorage.remove('account');
            this.$localStorage.remove('token');
            this.$router.push('/');
        },
        toChangePassword() {
            this.$router.push('/password/change');
        },
        lang2Zh(){
            this.$i18n.locale = 'zh';
        },
        lang2En(){
            this.$i18n.locale = 'en' ;
        }
    }
};
</script>

<style  scoped>
    .top-bar{
        height: 1rem;
        padding-left: 1.75rem;
        color: #f98019;
        line-height: 1rem;
        font-size: 15px;
        position: relative;
    }
    .top-bar a{
       color: #f98019;
    }
    .top-bar .login{
       padding-left: 25px;
    }
    .top-bar .lang{
        position: absolute;
        right:  1.75rem;
        display: flex;
        top: 0;
        align-items: center
    }
    .social-icon{
        display: inline-block;
        width: 1.95vw;
        height: 1.95vw;
        background-image: url('../assets/social-contact.png');
        background-repeat: no-repeat; 
        margin-right: 5px;
        position:relative;
    }
    .tik {
        background-position: 52%;
    }
    .weibo {
        background-position: 103%;
    }
    .qrcode {
        width: 7.03vw;
        height: 7.03vw;
        border: 1px solid #f98019;
        position: absolute;
        top:100%;
        z-index: 999;
        display: none
    }
    .social-icon:hover .qrcode{
        display: block;
    }
    .lang {
        display: none
    }

</style>

