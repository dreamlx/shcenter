<template>
    <div>
       <div class="form-wrapper" >
            <Form ref="formValidate" :model="formValidate" :rules="rules" >
                <FormItem prop="account">
                    <c-input type="text" v-model="formValidate.account" :placeholder='$t("手机号")' prefix="ios-person-outline"></c-input>
                </FormItem>
                <FormItem prop="password">
                    <c-input type="password" v-model="formValidate.password"  :placeholder='$t("密码")'  prefix="ios-lock-outline"></c-input>
                </FormItem>
                <FormItem prop="captcha">
                    <c-input :type='captchaVisibile ? "text" : "password"'  v-model="formValidate.captcha"  :placeholder='$t("验证码")'  class="ca-input" >
                        <span slot="prefix" @click="setCaptchaVisibility">
                            <i :class="['ivu-icon', {'ivu-icon-ios-eye-outline ' : !captchaVisibile },{'ivu-icon-ios-eye ' : captchaVisibile }]" ></i>
                        </span>
                    </c-input>
                     <button  type="button" class="mvu-btn"  :disabled ="!SMSEnable"  @click="sendSMS($event)">{{$t("发送验证码")}}</button>
                </FormItem>
            </Form>
            <a class="forget" @click="handleForgetPwd">忘记密码</a>
            <div style="text-align: center;" class="c-button-wrapper">
                <c-button class="c-button" @click="handleClick"> <span >{{$t('登录')}}</span></c-button>
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
                SMSEnable: true,
                captchaVisibile: false,
                loading: false,
                alertMsg: '',
                showAlertMsg: false,
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
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    captcha: [
                        { validator: validateCaptcha, trigger: 'blur' }
                    ],
                },
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
            handleClick(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        let params = Object.assign({},this.formValidate);
                        this.loading = true;
                        this.$http.post('/shcenter/api/login',params)
                        .then(function(res){
                            this.loading = false;
                            if(res.data.code != 0){
                                this.showAlertMsg = true ;    
                                this.alertMsg = this.$t(res.data.msg);
                                return;                      
                            }
                            Bus.$emit('LoginSuccess', this.formValidate.account);
                            this.$localStorage.set('account',this.formValidate.account);
                            this.$localStorage.set('token',res.data.token);
                            let from = this.$route.query.from || this.$router.lastRoute.path;
                            if(from == '/register'){
                                from = '/enroll';
                            }
                            this.$router.push(from);
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
            setCaptchaVisibility(){
                this.captchaVisibile = !this.captchaVisibile;
            },
            sendSMS(e){
                let self = this;
                this.$refs.formValidate.validateField('account',(error)=>{
                    if(!error){
                        this.SMSEnable = false;
                        this.$http.post(this.$root.$options.baseURI + '/shcenter/api/sms/send', {account:this.formValidate.account});
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
            },
            handleForgetPwd(){

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
        font-size: 40px;
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

    }

    .mvu-btn[disabled] {
        color: #c5c8ce;
        background-color: #f7f7f7;
        border-color: #dcdee2;
    }


</style>

