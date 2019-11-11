<template>
    <div>
       <div class="form-wrapper register-form" v-if="!hasRegistered"  >
            <div class="caption">{{$t('请填写注册信息')}}</div>
            <Form ref="formValidate" :model="formValidate" :rules="rules" >
                <FormItem prop="account">
                    <c-input type="text" v-model="formValidate.account" :placeholder='$t("手机号码")'  ></c-input>
                </FormItem>
                
                <FormItem prop="captcha">
                    <c-input :type='captchaVisibile ? "text" : "password"'  v-model="formValidate.captcha"  :placeholder='$t("验证码")'  class="ca-input" ></c-input>
                    <button  type="button" class="mvu-btn"  :disabled ="!SMSEnable"  @click="sendSMS($event)">{{$t("发送验证码")}}</button>
                </FormItem>

                <FormItem prop="password">
                    <c-input type="password" v-model="formValidate.password"  :placeholder='$t("密码")'  ></c-input>
                </FormItem>
                <FormItem prop="passwdCheck">
                    <c-input type="password" v-model="formValidate.passwdCheck"  :placeholder='$t("确认密码")'></c-input>
                </FormItem>
                <FormItem prop="protocol" style="display:none">
                    <c-radio-group v-model="formValidate.protocol">
                        <c-radio  label ="1" ><span class="protocol">{{$t('我已阅读并同意')}}<a @click="protocolVisible = true ">{{$t('《用户注册协议》')}}</a></span></c-radio>
                    </c-radio-group>
                </FormItem>
            </Form>
            <div style="text-align: center;" class="c-button-wrapper">
                <c-button class="c-button" @click="handleClick"> <span>{{$t('注册')}}</span></c-button>
           </div>
        </div>

        <div class="register-success-block" v-if="hasRegistered">
            <div class="form-wrapper login-form">
                <div class="caption">{{$t('注册成功')}}</div>
                <c-mascot message='注册成功'></c-mascot>
                <c-button @click="toLogin" class="c-button">
                    <span>{{$t('立刻登录报名')}}</span>
                </c-button>
            </div>
       </div>
        <c-loading :show='loading'></c-loading>
        <c-alert v-model="showAlertMsg" :buttonText='"确定"'>{{alertMsg}}</c-alert>
    </div>
</template>
<script>
    import Bus from '../../lib/bus';
    export default {
        components: {
        },
        data() {

            const validateAccount = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请填写手机号')));
                } 

                if(!/^1[345678]\d{9}$/.test(value)){ 
                    return callback(new Error(this.$t('手机号码格式有误')));
                } 
                callback();
            };

            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请输入密码')));
                } 
                callback();
            };

            const validatePassCheck = (rule, value, callback) => {
                let password = this.formValidate.password;
                if (value === '') {
                    callback(new Error(this.$t('请输入确认密码')));
                } else if (value !== password) {
                    callback(new Error(this.$t('密码输入不一致')));
                } else {
                    callback();
                }
            };

            const validateCaptcha = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请输入验证码')));
                } 
                callback();
              
            };

            const validateProtocol = (rule, value, callback) => {
                if (value === 0) {
                    return callback(new Error(this.$t('请同意用户注册协议')));
                } 
                callback();
            };
            return {

                captchaVisibile: false,
                SMSEnable: true,
                loading: false,
                alertMsg: '',
                showAlertMsg: false,
                protocolVisible: false,
                formValidate: {
                    account: '',
                    password: '',
                    passwdCheck: '',
                    captcha: '',
                    protocol: 1
                },
                rules: {
                    account: [
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    captcha: [
                        { validator: validateCaptcha, trigger: 'blur' }
                    ],
                    protocol: [
                       { validator: validateProtocol, trigger: 'change' }
                    ]
                },
                hasRegistered: false
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
            sendSMS(e){
                let self = this;
                this.$refs.formValidate.validateField('account',(error)=>{
                    if(!error){
                        this.$http.post(this.$root.$options.baseURI + '/shcenter/api/sms/send', {phone:self.formValidate.account});
                        this.SMSEnable = false;
                        let  time = 60;
                        (function countdown(){
                            if(!self){
                                return;
                            }
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
               // 
            },
            handleClick(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        let params = Object.assign({phone: this.formValidate.account },this.formValidate);
                        params['channel'] = 'phone';
                        this.loading = true;
                        this.$http.post('/shcenter/api/register/create',params)
                        .then(function(res){
                            this.loading = false;
                            if(res.data.code != 0){
                                this.showAlertMsg = true ;    
                                this.alertMsg = res.data.msg;
                                return;                      
                            }
                            if(res.data.code == 0){
                                this.hasRegistered = true;
                            }
                        })
                        .catch((response)=>{
                            this.loading = false;
                            if(response.status == 403){
                                this.showAlertMsg = true ;  
                                this.alertMsg = '无操作权限';
                                //this.$Message.error('无操作权限!');
                            }
                        });
                    } 
                });
            },
            toLogin(){
                this.$router.push('/login');
            }
           
        }
    };
</script>

<style scoped>
    .form-wrapper{
        margin: 90px 40px;
    }
  
    .ca-input{
        width: 530px;
    }
    .c-button-wrapper{
        margin: 0px 40px;
    }
    .c-button-wrapper .c-button{
        width: 100%;
    }
    .c-button span{
       font-size: 40px;
    }

    .mvu-btn {
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        font-size: 40px;
        text-align: center;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        user-select: none;
        width: 386px;
        height: 100px;
        border-radius: 4px;
        background: #FF9F00;
        color: #fff;
        float: right;
    }

    .caption{
        font-size: 45px;
        font-weight: bold;
        color: #FEA000;
        position: relative;
        padding-left: 60px;
        margin-bottom: 70px;
        line-height: 64px;
        height: 64px;
    }
    .caption:before{
        content: "";
        display: block;
        width: 20px;
        height: 64px;
        background: #FEA000;
        position: absolute;
        left:0
    }
    .protocol{
        font-size: 40px;
    }
    
    .mvu-btn[disabled] {
        color: #c5c8ce;
        background-color: #f7f7f7;
        border-color: #dcdee2;
    }

</style>

