<style scoped>
.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
}

.index h1 {
  height: 150px;
}

.index h1 img {
  height: 100%;
}

.index h2 {
  color: #333;
}

.index h2 p {
  margin: 0 0 30px;
  font-size: 20px;
}

.index .ivu-row-flex {
  height: 100%;
}
.index .ivu-input {
  height: 40px;
}

.index .title span {
  display: inline-block;
  vertical-align: bottom;
  margin-left: -5px;
}
.index .title img {
  display: inline-block;
  vertical-align: middle;
  margin-left: -5px;
}
</style>
<style type="text/css">
.index .ivu-input {
  height: 40px;
  font-size: 15px;
}
.index .ivu-btn {
  font-size: 15px;
  width: 100%;
}
.index .ivu-form-item {
  margin-bottom: 18px;
}
.index .ivu-form-item.last-form-item {
  margin-bottom: 12px;
}
.index .ivu-checkbox-wrapper {
  color: #333;
}


</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24" style="width:300px;" >
                  <h2>
                    <p class="title"><span>上海中心垂马网站后台管理系统</span></p>
                  </h2>
                 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" >
                    <FormItem label="" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入姓名">
                              <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                   <FormItem label="" prop="passwd">
                        <Input type="password" v-model="formValidate.passwd"  placeholder="请输入密码">
                           
                             <Icon type="ios-lock-outline" slot="prepend"/>
                        </Input>
                  </FormItem>
                   <FormItem label="" prop="" class="last-form-item">
                         <Checkbox v-model="remeberMe" >记住我</Checkbox>
                  </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" :loading="submiting" size="large">
                            <span v-if="!submiting">登录</span>
                            <span v-else>登录中...</span>
                        </Button>
                      <!--   <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button> -->
                    </FormItem>
                 </Form>
            </Col>
        </Row>
    </div>
</template>
<script>
import types from '@/store/mutation-types';
export default {
    data() {
        return {
            formValidate: {
                name: '',
                passwd: ''
            },
            ruleValidate: {
                name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
                passwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            },
            remeberMe: true,
            submiting: false
        };
    },
    beforeCreate(){
    },
    mounted() {
        window.authenticated = false;
        this.$store.commit(types.ACCOUNT_LOGOUT, {});
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$http
                    .post(
                      this.$root.$options.baseURI + '/shcenter/api/admin/login',
                        {
                            'name': this.formValidate.name,
                            'password': this.formValidate.passwd
                        }
                    )
                    .then(response => {
                        this.submiting = false;
                        let data = response.body;
                        if (!data.token) {
                            this.$Message.error(data.msg || '登录失败请稍后再试');
                        }

                        if (data.token) {
                            let name = this.formValidate.name,
                                token = data.token,
                                role = data.role,
                                remembered = this.remeberMe;

                            this.$store.commit(types.ACCOUNT_LOGIN, {
                                name,
                                role,
                                token,
                                remembered
                            });
                            window.authenticated = true;
                            this.$router.push('/');
                        }
                    })
                    .catch(() => {
                        this.submiting = false;
                        this.$Message.error('登录失败请稍后再试!');
                    });
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
            this.submiting = false;
        }
    }
};
</script>
