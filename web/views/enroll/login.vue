<template>
    <sign-layout>
       <div slot="box-body">
            <div class="nav-wrapper">
               <!--  <ul class="nav-list">
                    <li v-for="(n,index) in  navs" :class="[{active: currentView == n.key }]" @click="navClick(index)"><a class="c-menu-skew"><span>{{$t(n.label)}}</span></a></li>
                </ul> -->
                <c-tab :tabs="navs" @tabClick="onTabClick"></c-tab>
            </div>
            <div class="form-wrapper login-form">
                <Alert type="error" show-icon v-if="showAlertMsg">{{alertMsg}}</Alert>
                <Form ref="formValidate" :model="formValidate" :rules="rules" >
                    <FormItem prop="account">
                        <Input type="text" v-model="formValidate.account" :placeholder='$t("手机号/邮箱")' prefix="ios-person-outline"></Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formValidate.password"  :placeholder='$t("密码")'  prefix="ios-lock-outline">
                        </Input>
                    </FormItem>
                     <FormItem prop="captcha">
                        <Input :type='captchaVisibile ? "text" : "password"'  v-model="formValidate.captcha"  :placeholder='$t("验证码")'  style="width:4.5rem" >
                            <span slot="prefix" @click="setCaptchaVisibility">
                                <Icon :type='!captchaVisibile ? "ios-eye-outline" : "ios-eye" '/>
                            </span>
                        </Input>
                        <Button type="primary"  style="width:3.25rem;margin-left:.25rem;border-radius:0" @click.native="sendSMS($event)" :disabled ="!SMSEnable">{{$t("发送验证码")}}</Button>
                    </FormItem>
                    <FormItem>
                    <a class="forget" @click="handleForgetPwd">忘记密码</a>
                     <!--    <a class="button" @click="handleLogin()"><span>登录</span></a> -->
                        <c-button @click="handleLogin">
                            <span>{{$t('登录')}}</span>
                        </c-button>
                    </FormItem>
                </Form>
            </div>
       </div>
    </sign-layout>
</template>
<script>
    import CButton from '@/components/c-button';
    import CTab from '@/components/c-tab';
    import Util from '@/lib/util';
    import Bus from '@/lib/bus';
    import SignLayout from './sign-layout';
    export default {
        components: {
            CButton,
            CTab,
            SignLayout
        },
        data() {
            const validateAccount = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请输入账号')));
                } 

                if(!/^1[345678]\d{9}$/.test(value) &&  !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){ 
                    return callback(new Error(this.$t('账号格式有误')));
                } 
                callback();
            };

            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请输入密码')));
                } 
                callback();
            };

            const validateCaptcha = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请输入验证码')));
                } 
                callback();
            };

            return {
                currentView:'login',
                showAlertMsg: false,
                alertMsg: '',
                captchaVisibile: false,
                navs:[{
                    label:'登录',
                    key:'login'
                },{
                    label:'注册',
                    key:'register'
                }],
                formValidate: {
                    account: '',
                    password: '',
                    captcha: ''
                },
                rules: {
                    account: [
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    password: [
                       // { required: true, message: '请输入密码.', trigger: 'blur' },
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    captcha: [
                        //{ required: true, message: '请输入验证码', trigger: 'blur' },
                        { validator: validateCaptcha, trigger: 'blur' }
                    ],
                },
                SMSEnable: true
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
            // navClick(index){
            //     this.currentView = this.navs[index].key
            //     this.$router.push('/' + this.navs[index].key);
            // },
            onTabClick(index){
                this.currentView = this.navs[index].key;
                this.$router.push('/' + this.navs[index].key);
            },
            sendSMS(e){
                let self = this;
                this.$refs.formValidate.validateField('account',(error)=>{
                    if(!error){
                        this.SMSEnable = false;
                        this.$http.post(this.$root.$options.baseURI + '/shcenter/api/sms/send', {account:this.formValidate.account});
                        let  time = 60;
                        (function countdown(){
                            if(!time){
                                e.target.innerHTML = self.$t('发送验证码');
                                self.SMSEnable = true;
                                return;
                            }
                            e.target.innerHTML = time + self.$t('秒');
                            time--;
                            setTimeout(countdown,1000);
                        })();

                    }
                });
                return false;
            },
            setCaptchaVisibility(){
                this.captchaVisibile = !this.captchaVisibile;
            },
            handleForgetPwd(){
                this.$router.push('/password/reset');
            },
            handleLogin: Util.debounce(function(){
                this.$refs.formValidate.validate( async(valid) => {
                    if (valid) {
                        let params = Object.assign({},this.formValidate);
                        this.submiting = true;
                        const { status = 200, body: data } =  await this.$http.post('/shcenter/api/login',params);
                        if(status !== 200 ){
                            this.$Message.error('操作异常!');
                            return;
                        }
                        if(data.code != 0){
                            this.showAlertMsg = true ;    
                            this.alertMsg = data.msg;
                            return;                             
                        }

                        Bus.$emit('LoginSuccess', this.formValidate.account);
                        this.$localStorage.set('account',this.formValidate.account);
                        this.$localStorage.set('token',data.token);
                        let from = this.$route.query.from || this.$router.lastRoute.path;
                        if(from == '/register' || from == '/login' ){
                            from = '/enroll';
                        }
                        if( from == '/password/change' || from == '/password/reset'){
                            from = '/';
                        }
                        this.$router.push(from);  
                    } 
                });
            },300)
        }
    };
</script>

<style scoped>
    .nav-wrapper{
        text-align: center;
    }
    .form-wrapper{
        width: 8.1rem;
        margin:1.125rem  auto;
    }

    .ivu-icon{
        font-size: 20px;
    }
    .forget{
        color: #BFBFBF;
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        position: relative;
        display: inline-block;
        margin-bottom: .4rem;
    }
    .forget:after{
        content: "";
        display: block;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: #BFBFBF;
        position: absolute;
    }

</style>

