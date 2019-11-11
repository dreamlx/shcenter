<template>
    <sign-layout>
       <div slot="box-body">
            <div class="form-wrapper login-form"  v-if="!hasSubmitted">
                <Alert type="error" show-icon v-if="showAlertMsg">{{alertMsg}}</Alert>
                <div class="caption">密码找回</div>
                <Form ref="formValidate" :model="formValidate" :rules="rules" >
                    <FormItem prop="account">
                        <Input type="text" v-model="formValidate.account" :placeholder='"输入原手机或邮箱"' prefix="ios-person-outline"/>
                    </FormItem>
                     <FormItem prop="captcha">
                        <Input :type='captchaVisibile ? "text" : "password"'  v-model="formValidate.captcha"  :placeholder='$t("验证码")'  style="width:4.5rem" >
                            <span slot="prefix" @click="setCaptchaVisibility">
                                <Icon :type='!captchaVisibile ? "ios-eye-outline" : "ios-eye" '/>
                            </span>
                        </Input>
                        <Button type="primary"  style="width:3.25rem;margin-left:.25rem;border-radius:0" @click.native="sendSMS($event)" :disabled ="!SMSEnable">{{$t("发送验证码")}}</Button>
                    </FormItem>
                    <FormItem prop="newpassword">
                        <Input type="password" v-model="formValidate.newpassword"  :placeholder='"输入新密码"'  prefix="ios-lock-outline" />
                    </FormItem>
                     <FormItem prop="confirmpassword">
                        <Input type="password" v-model="formValidate.confirmpassword"  :placeholder='"确认新密码"'  prefix="ios-lock-outline"/>
                    </FormItem>
                    
                    <FormItem>
                     <!--    <a class="forget">忘记密码</a> -->
                     <!--    <a class="button" @click="handleLogin()"><span>登录</span></a> -->
                        <c-button @click="handleSubmit">
                            <span>确认提交</span>
                        </c-button>
                    </FormItem>
                </Form>
            </div>
            <div class="register-success-block" v-if="hasSubmitted" >
                <div class="form-wrapper login-form">
                    <c-mascot message='恭喜您，密码修改成功！'></c-mascot>
                    <c-button @click="toLogin">
                        <span>立刻登录报名</span>
                    </c-button>
                </div>
        </div>
       </div>
    </sign-layout>
</template>
<script>
    import CButton from '@/components/c-button';
    import CTab from '@/components/c-tab';
    import CMascot from '@/components/c-mascot';
    import SignLayout from './sign-layout';
    import Util from '@/lib/util';
    import Bus from '@/lib/bus';
    export default {
        components: {
            CButton,
            CTab,
            CMascot,
            SignLayout
        },
        data() {
            
            const validateAccount = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请输入原手机或邮箱')));
                } 

                if(!/^1[345678]\d{9}$/.test(value) &&  !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){ 
                    return callback(new Error(this.$t('手机或邮箱格式有误')));
                } 
                callback();
            };

            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请输入当前密码')));
                } 
                callback();
            };

            const validateNewPassword = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请输入密码')));
                } 
                if(!/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/.test(value)) {
                    return callback(new Error(this.$t('密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 30位')));
                } 
                callback();
            };
         

            const validateConfirmPassword = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请输入确认密码')));
                } 
                if (value !== this.formValidate.newpassword ) {
                    return callback(new Error(this.$t('两次输入密码不一致')));
                } 
                callback();
            };

            return {
                showAlertMsg: false,
                alertMsg: '',
                captchaVisibile: false,
                hasSubmitted: false,
                formValidate: {
                    account: '',
                    newpassword: '',
                    password: '',
                    confirmpassword: '',
                    captcha: ''
                },
                rules: {
                    account: [
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    newpassword: [
                       { validator: validateNewPassword, trigger: 'blur' }
                    ],
                    confirmpassword: [
                        //{ required: true, message: '请输入验证码', trigger: 'blur' },
                        { validator: validateConfirmPassword, trigger: 'blur' }
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
            setCaptchaVisibility(){
                this.captchaVisibile = !this.captchaVisibile;
            },
            sendSMS(e){
                let self = this;
                this.$refs.formValidate.validateField('account',(error)=>{
                    if(!error){
                        this.SMSEnable = false;
                        this.$http.post(this.$root.$options.baseURI + '/shcenter/api/sms/send', {accout:this.formValidate.account});
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
            toLogin(){
                this.$router.push('/login');
            },
            handleSubmit: Util.debounce(function(){
                this.$refs.formValidate.validate( async (valid) => {
                    if (valid) {
                        const { newpassword: password, account, captcha } = this.formValidate;
                        const params = { password , account, captcha };
                        const { status = 200, body: data } = await this.$http.post('/shcenter/api/password/reset',params);
                        if(status !== 200 ){
                            this.$Message.error('操作异常!');
                            return;
                        }
                        if(data.code != 0){
                            this.showAlertMsg = true ;    
                            this.alertMsg = data.msg;                      
                        }
                        if(data.code == 0){
                            this.hasSubmitted = true;
                        }
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
        margin:  auto;
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

    .caption{
        font-size: 15px;
        font-weight: bold;
        color: #FEA000;
        position: relative;
        padding-left: 20px;
        margin-bottom: .6rem
    }
    .caption:before{
        content: "";
        display: block;
        width: 6px;
        height: 20px;
        background: #FEA000;
        position: absolute;
        left:0
    }

</style>

