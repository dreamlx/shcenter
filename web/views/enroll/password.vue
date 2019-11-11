<template>
    <sign-layout>
       <div slot="box-body">
           
            <div class="form-wrapper login-form">
                <Alert type="error" show-icon v-if="showAlertMsg">{{alertMsg}}</Alert>

                <Form ref="formValidate" :model="formValidate" :rules="rules" >
                    <FormItem prop="password">
                        <Input type="password" v-model="formValidate.password" :placeholder='$t("当前密码")' prefix="ios-lock-outline"></Input>
                    </FormItem>
                    <FormItem prop="newpassword">
                        <Input type="password" v-model="formValidate.newpassword"  :placeholder='$t("密码")'  prefix="ios-lock-outline">
                        </Input>
                    </FormItem>
                     <FormItem prop="confirmpassword">
                        <Input type="password" v-model="formValidate.confirmpassword"  :placeholder='$t("确认密码")'  prefix="ios-lock-outline">
                        </Input>
                    </FormItem>
                    
                    <FormItem>
                     <!--    <a class="forget">忘记密码</a> -->
                     <!--    <a class="button" @click="handleLogin()"><span>登录</span></a> -->
                        <c-button @click="handleSubmit">
                            <span>{{$t('确认修改密码')}}</span>
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
                if (value === this.formValidate.password) {
                    return callback(new Error(this.$t('新密码与原密码一样')));
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
                    newpassword: '',
                    password: '',
                    confirmpassword: ''
                },
                rules: {
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
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
            // navClick(index){
            //     this.currentView = this.navs[index].key
            //     this.$router.push('/' + this.navs[index].key);
            
            handleSubmit: Util.debounce(function(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        // let params = Object.assign({},this.formValidate);
                        // this.submiting = true;
                        const params = { password: this.formValidate.newpassword, oldPassword: this.formValidate.password };
                        this.$http.post('/shcenter/api/password/change',params)
                        .then(function(res){
                            if(res.data.code != 0){
                                this.showAlertMsg = true ;    
                                this.alertMsg = this.$t(res.data.msg);
                                return;                      
                            }
                            this.showAlertMsg = false;
                            Bus.$emit('LoginExpired', {});
                            this.$router.push('/login');

                        })
                        .catch((response)=>{
                          
                            if(response.status == 403){
                                this.$Message.error('无操作权限!');
                            }
                        });
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

</style>

