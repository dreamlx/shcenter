<template>  
    <div class="form-wrapper">
        <Form ref="formValidate" :model="formValidate" :rules="rules" >
            <FormItem prop="name">
                <Input type="text" v-model="formValidate.name" :placeholder='"账号"' prefix="ios-person-outline"></Input>
            </FormItem>
            <FormItem prop="role">
               <Select v-model="formValidate.role" size="small" :placeholder='"角色"' style="width:100%">
                    <Option value="1">编辑</Option>
                    <Option value="2">审核</Option>
                </Select>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formValidate.password"  :placeholder='"密码"'  prefix="ios-lock-outline">
                </Input>
            </FormItem>
                <FormItem prop="confirmpassword">
                <Input type="password" v-model="formValidate.confirmpassword"  :placeholder='"确认密码"'  prefix="ios-lock-outline">
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" :loading='submiting' @click="handleSubmit">创建</Button>
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
                    return callback(new Error('请输入密码'));
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
                if (value !== this.formValidate.password ) {
                    return callback(new Error('两次输入密码不一致'));
                } 
                callback();
            };

            return {
                submiting: false,
                formValidate: {
                    name: '',
                    role: '',
                    password: '',
                    confirmpassword: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    role: [
                        { required: true, message: '请选择用户角色', trigger: 'change' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
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
                        this.submiting = true;
                        const { confirmpassword , ...params } = this.formValidate;
                        this.$http.post('/shcenter/api/admin/user/create',params)
                        .then(function(res){
                            this.submiting = false;
                            if(res.data.code != 0){
                                this.$Message.error(res.data.msg);
                                this.alertMsg = this.$t(res.data.msg);
                                return;                      
                            }
                            this.$refs.formValidate.resetFields();
                            this.$Message.success('用户创建成功');
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

