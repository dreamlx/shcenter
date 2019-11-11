<template>
   <sign-layout>
    <div  slot="box-body">
       <div class="register-block"  v-if="!hasRegistered">
            <div class="nav-wrapper">
                <c-tab :tabs="navs" :activeTabIndex="1"  @tabClick="onTabClick"></c-tab>
                <br>
                <div class="channel-list" >
                    <c-tab :tabs="channels"  :skew='false'  @tabClick="onChannelClick"></c-tab>
                </div>
            </div>
            <div class="form-wrapper login-form" v-if="currentChannel == 'phone'">
                <div class="caption">{{$t('请填写注册信息')}}</div>
                 <Alert type="error" show-icon v-if="showAlertMsg">{{alertMsg}}</Alert>
                <Form ref="pformValidate" :model="pformValidate" :rules="rules" >
                    <FormItem prop="phone">
                        <Input type="text" v-model="pformValidate.phone" :placeholder='$t("手机号")' />
                    </FormItem>
                    <FormItem prop="captcha">
                        <Input type="text" v-model="pformValidate.captcha"  :placeholder='$t("验证码")'  style="width:4.5rem" />
                        <Button type="primary"  style="width:3.25rem;margin-left:.25rem;border-radius:0" @click.native="sendSMS($event)" :disabled ="!SMSEnable">{{$t("发送验证码")}}</Button>
                    </FormItem>
                     <FormItem prop="password">
                        <Input type="password" v-model="pformValidate.password"    :placeholder='$t("设置密码")' />
                    </FormItem>
                    <FormItem prop="passwdCheck">
                        <Input type="password" v-model="pformValidate.passwdCheck"  :placeholder='$t("确认密码")' />
                    </FormItem>
                     <FormItem prop="protocol">
                        <RadioGroup v-model="pformValidate.protocol">
                            <Radio  label ="1" ><span class="protocol">{{$t('我已阅读并同意')}}<a @click="protocolVisible = true ">{{$t('《用户注册协议》')}}</a></span></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem>
                        <c-button @click="handleRegister">
                            <span>{{$t('注册')}}</span>
                        </c-button>
                      <!--   <a class="button" @click="handleRegister()"><span>注册</span></a> -->
                    </FormItem>
                </Form>
            </div>
            <div class="form-wrapper login-form"  v-if="currentChannel == 'email'">
                <div class="caption">{{$t('请填写注册信息')}}</div>
                <Alert type="error" show-icon v-if="showAlertMsg">{{alertMsg}}</Alert>
                <Form ref="eformValidate" :model="eformValidate" :rules="rules" >
                    <FormItem prop="email">
                        <Input type="text" v-model="eformValidate.email"  :placeholder='$t("邮箱")' />
                    </FormItem>
                    <FormItem prop="captcha">
                        <Input type="text" v-model="eformValidate.captcha"  :placeholder='$t("验证码")'  style="width:4.5rem" />
                         <Button type="primary"  style="width:3.25rem;margin-left:.25rem;border-radius:0" @click.native="sendSMS($event)" :disabled ="!SMSEnable">{{$t("发送验证码")}}</Button>
                    </FormItem>
                     <FormItem prop="password">
                        <Input type="password" v-model="eformValidate.password"  :placeholder='$t("设置密码")' />
                    </FormItem>
                    <FormItem prop="passwdCheck">
                        <Input type="password" v-model="eformValidate.passwdCheck"   :placeholder='$t("确认密码")' />
                    </FormItem>
                    <FormItem prop="protocol">
                        <RadioGroup v-model="eformValidate.protocol">
                             <Radio  label ="1" ><span class="protocol">{{$t('我已阅读并同意')}}<a @click="protocolVisible = true ">{{$t('《用户注册协议》')}}</a></span></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem>
                    <!--     <a class="button"  @click="handleRegister()" disable><span>注册</span></a> -->
                        <c-button @click="handleRegister">
                            <span>{{$t('注册')}}</span>
                        </c-button>
                    </FormItem>
                </Form>
            </div>

            <Modal title="" v-model="protocolVisible">
                <div style="text-align:center;font-size:14px;">《上海中心垂马网用户注册协议》</div>
                <div style="margin:20px;"> 
                   1.总则
                   <br/><br/>
1.1上马网（以下简称“网站”）所提供的各项服务的所有权和运营权均归上海国际马拉松赛组织委员会（以下简称“组委会”）所有。
<br/>
1.2用户在使用本网站的服务之前，应当仔细阅读本协议，并同意遵守本协议中的所有条款和条件。用户一旦注册成功，则本协议构成对用户和网站有约束力的法律文件。
<br/>
1.3组委会有权对本协议条款进行修改，用户在使用网站时应当及时关注，用户同意网站不承担通知义务，修改后的协议一旦公布即有效代替原协议。
                </div>
            </Modal>
       </div>
       <div class="register-success-block" v-if="hasRegistered">
            <div class="form-wrapper login-form">
                <div class="caption">{{$t('注册成功')}}</div>
                <c-mascot message='请尽快完善资料，完成报名'></c-mascot>
                <c-button @click="toLogin">
                    <span>{{$t('立刻登录报名')}}</span>
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
    export default {
        components: {
            CButton,
            CTab,
            CMascot,
            SignLayout
        },
        data() {
            const validatePassCheck = (rule, value, callback) => {
                let password = this.currentChannel == 'phone' ? this.pformValidate.password : this.eformValidate.password;
                if (value === '') {
                    callback(new Error(this.$t('请输入确认密码')));
                } else if (value !== password) {
                    callback(new Error(this.$t('密码输入不一致')));
                } else {
                    callback();
                }
            };
           
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请填写手机号')));
                    return ;
                } 
                if(!(/^1[345678]\d{9}$/.test(value))){ 
                    callback(new Error(this.$t('手机号码格式有误')));
                    return ;
                } 
                callback();
            };

            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请输入密码')));
                } 
                if(!/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/.test(value)) {
                    return callback(new Error(this.$t('密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 30位')));
                } 
                callback();
            };

            const validateEmail = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error(this.$t('请填写邮箱')));
                }
                if( !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){ 
                    return callback(new Error(this.$t('邮箱格式有误')));
                }  
                callback();
              
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
                currentView:'register',
                SMSEnable: true,
                showAlertMsg: false,
                alertMsg: '',
                submiting: false,
                navs:[{
                    label:'登录',
                    key:'login'
                },{
                    label:'注册',
                    key:'register'
                }],
                currentChannel:'phone',
                channels:[{
                    label:'手机注册',
                    key:'phone'
                },{
                    label:'邮箱注册',
                    key:'email'
                }],
                pformValidate: {
                    phone: '',
                    captcha: '',
                    password: '',
                    passwdCheck: '',
                    protocol: 0
                },
                eformValidate: {
                    email: '',
                    captcha: '',
                    password: '',
                    passwdCheck: '',
                    protocol: 0
                },
                rules: {
                    phone: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    email: [
                       { validator: validateEmail, trigger: 'blur' }
                    ],
                    captcha: [
                        { validator: validateCaptcha, trigger: 'blur' }
                    ],
                    protocol: [
                       { validator: validateProtocol, trigger: 'change' }
                    ],
                    
                },
                protocolVisible: false,
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
            // navClick(index){
            //     this.currentView = this.navs[index].key
            //     this.$router.push('/' + this.navs[index].key);
            // },
            onTabClick(index){
                this.currentView = this.navs[index].key;
                this.$router.push('/' + this.navs[index].key);
            },
            onChannelClick(index){
                this.currentChannel = this.channels[index].key;
                let name = this.currentChannel != 'phone' ? 'pformValidate' : 'eformValidate';
                this.$refs[name].resetFields();
                this.showAlertMsg = false;
                this.alertMsg = '';
            },
            channelClick(index){
                this.currentChannel = this.channels[index].key;
                let name = this.currentChannel != 'phone' ? 'pformValidate' : 'eformValidate';
                this.$refs[name].resetFields();
                this.showAlertMsg = false;
                this.alertMsg = '';
            },
            sendSMS(e){
                let self = this;
                const validateField =  this.currentChannel == 'phone' ? 'phone' : 'email';
                const form = this.currentChannel === 'phone' ? 'pformValidate' : 'eformValidate';
                this.$refs[form].validateField(validateField, error => {
                    if(!error){
                        this.$http.post(this.$root.$options.baseURI + '/shcenter/api/sms/send', {
                            account: this[form][validateField]
                        });
                        this.SMSEnable = false;
                        let time = 60;
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
            },
            refreshCaptcha(){
                this.$refs.captcha.src = this.$refs.captcha.dataset.src + '?t=' + ( +new Date);
            },
            handleRegister: Util.debounce(function() {
                const form = this.currentChannel === 'phone' ? 'pformValidate' : 'eformValidate';
                this.$refs[form].validate(async(valid) => {
                    if (valid) {
                        let params = Object.assign({channel: this.currentChannel},this[form]);
                        this.submiting = true;
                        const { status = 200, body: data } = await this.$http.post('/shcenter/api/register/create',params);
                        if(status === 403){
                            this.$Message.error('操作异常');
                            return;
                        }
                        if(data.code != 0){
                            this.showAlertMsg = true ;    
                            this.alertMsg = data.msg;                      
                        }
                        if(data.code == 0){
                            this.hasRegistered = true;
                        }
                    } 
                });
            },300),
            toLogin(){
                this.$router.push('/login');
            },

        }
    };
</script>

<style scoped>
    .nav-wrapper{
        text-align: center;
    }
    
    .channel-list{
        margin-top: .8rem
    }

    .form-wrapper{
        width: 8.1rem;
        margin:.8rem  auto;
    }

    .captcha-img {
        width:3.25rem;
        margin-left:.25rem;
        border-radius:0;
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        height: 32px;
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
    .protocol{
        font-size: 14px;
        font-weight: bold;
        color: #BEBEBE
    }
    .protocol a{
        color: #FEA000;
    }

</style>

