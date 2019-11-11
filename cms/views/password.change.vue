<template>  
    <div class="form-wrapper">
        <Form ref="formValidate" :model="formValidate" :rules="rules" >
            <FormItem prop="password">
                <Input type="password" v-model="formValidate.password" :placeholder='"当前密码"' prefix="ios-lock-outline"></Input>
            </FormItem>
            <FormItem prop="newpassword">
                <Input type="password" v-model="formValidate.newpassword"  :placeholder='"密码"'  prefix="ios-lock-outline">
                </Input>
            </FormItem>
                <FormItem prop="confirmpassword">
                <Input type="password" v-model="formValidate.confirmpassword"  :placeholder='"确认密码"'  prefix="ios-lock-outline">
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading='submiting' @click="handleSubmit">确认修改密码</Button>
            </FormItem>
        </Form>
    </div>
      
</template>
<script>
    export default {
        components: {
         
        },
        data() {
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入当前密码'));
                } 
                callback();
            };
            const validateNewPassword = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入密码'));
                } 
                if (value === this.formValidate.password) {
                    return callback(new Error(('新密码与原密码一样')));
                } 
                if(!/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/.test(value)) {
                    return callback(new Error('密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 30位'));
                } 
                callback();
            };
         
            const validateConfirmPassword = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入确认密码'));
                } 
                if (value !== this.formValidate.newpassword ) {
                    return callback(new Error('两次输入密码不一致'));
                } 
                callback();
            };

            return {
                currentView:'login',
                submiting: false,
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
            handleSubmit(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        // let params = Object.assign({},this.formValidate);
                        this.submiting = true;
                        const params = { password: this.formValidate.newpassword, oldPassword: this.formValidate.password };
                        this.$http.post('/shcenter/api/admin/password/change',params)
                        .then(function(res){
                            this.submiting = false;
                            if(res.data.code != 0){
                                this.$Message.error(res.data.msg);
                                this.alertMsg = this.$t(res.data.msg);
                                return;                      
                            }
                            this.$refs.formValidate.resetFields();
                            this.$Message.success('密码修改成功');
                        })
                        .catch((response)=>{
                            this.submiting = false;
                        });
                    } 
                });
            }
        }
    };
</script>

<style scoped>
    .form-wrapper{
        width: 300px;
        margin:  auto;
        padding-top: 20px;
    }
</style>

