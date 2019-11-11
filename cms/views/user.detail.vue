<style >
    .caption{
        background: #f5f7f9;
        color: #333;
        line-height: 30px;
        padding-left: 15px;
    }
    .user-list-box .form-box{
        margin-top: 15px;
    }
    .form-box .uid{
        margin: 10px 0;
        font-size: 18px;
    }
    .licence_plate_form .ivu-form-item-label{
        float: left;
    }
</style>
<template>
    <div class="user-list-box">
        <Tabs type="card"  :animated="false">
            <TabPane label="用户详情">
            <div>
                  <div class="form-box" style="width:600px;margin-left:20px;">
                       <h3 class="uid">用户ID：{{uid}}</h3>
                       <Form ref="formInline"  label-position="top">
                            <FormItem  label="手机号(必填)">
                                <Input type="text" placeholder="" v-model="formInline.mobile">
                                </Input>
                            </FormItem>
                            <FormItem  label="姓名">
                                <Input type="text" placeholder="" v-model="formInline.name">
                                </Input>
                            </FormItem>
                             <FormItem  label="性别">
                                <Select  style="width:200px" v-model="formInline.gender">
                                        <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="注册时间">
                                <DatePicker type="datetime" placeholder="" v-model="formInline.created_at" disabled></DatePicker>
                            </FormItem>
                            <FormItem  label="积分">
                                <Input type="text" placeholder="" v-model="formInline.points">
                                </Input>
                            </FormItem>
                             <FormItem  label="余额">
                                <Input type="text" placeholder="" v-model="formInline.balance">
                                </Input>
                            </FormItem>
                            <FormItem   v-for="(l,index) in formInline.licence_plates" :key="index" :label="'车牌'+(index+1)">
                                <Form inline  label-position="left"  class="licence_plate_form">
                                    <FormItem label="">
                                        <Input type="text" placeholder="" size="small" style="width:180px" v-model='l.number'>
                                            <span slot="prepend">车牌号</span>
                                        </Input>
                                    </FormItem>
                                    <FormItem label=""> 
                                        <Input type="text" placeholder="" size="small" style="width:180px"  v-model='l.energy_type'>
                                              <span slot="prepend">车牌类型</span>
                                        </Input>
                                    </FormItem>
                                    <FormItem label="">
                                        <Input type="text" placeholder="" size="small" style="width:180px">
                                             <span slot="prepend">汽车类型</span>
                                             <!-- <Select  style="width:80px" slot="append" size="small">
                                                    <Option v-for="item in userTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select> -->
                                        </Input>
                                    </FormItem>
                                </Form>
                            </FormItem>
                            <FormItem  label="用户类型">
                                <Select  style="width:200px" v-model="formInline.kind">
                                        <Option v-for="item in userTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            
                             <FormItem  label="查询" class="ivu-form-btn-item">
                                  <Button type="error"  :loading="updating"  @click="handleSubmit('formInline')" :disabled='loading'> 
                                        <span v-if="!updating">更新</span>
                                        <span v-else>更新中...</span>
                                      </Button>
                            </FormItem>
                     </Form>
                 </div>
            </div>
        </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import '../lib/util';
    export default {
        data() {
            return {
                uid: '',
                formInline:{
                    created_at:'',
                    mobile: '',
                    name: '',
                    points:0,
                    balance:'',
                    gender:'',
                    licence_plates:[],
                    kind:''

                },
                updating:false,
                loading:true,
                genderList:[
                    {
                        value: 'male',
                        label: '男'
                    },
                    {
                        value: 'female',
                        label: '女'
                    },
                ],
                userTypeList:[
                    {
                        value: '普通',
                        label: '普通'
                    },
                    {
                        value: '业主',
                        label: '业主'
                    }
                ]
            };
        },
        computed: {
            ...mapState({
                account: state => state.account
            })
        },
        watch: {
          
        },
        created(){
            this.uid = this.$route.query['uid'];
            this.getUserInfo();
        },
        mounted(){
         
        },
        methods: {
            getUserInfo(){
                let  params = {user_token: this.account.token};
                this.$http.get(
                    this.$root.$options.baseURI +
                        '/api/v1/admin/users/' + this.uid,{params:params}
                )
                .then(response => {
                    this.querying = false;
                    let  user = response.data.user;
                    Object.keys(this.formInline).forEach(key=>{
                        this.formInline[key] = user[key];
                    });
                    this.formInline.created_at = new Date(user.created_at);
                    this.formInline.name = this.formInline.name || user.email;
                    this.loading = false;

                    this.formInline.licence_plates.forEach((l,index)=>{
                        let licence_plate = {number: l.number,energy_type: l.energy_type} ;
                        this.formInline['licence_plate_' + index] = licence_plate;
                    });

                    //this.userList = this.formatUserList(response.data || []);
                    //this.$Spin.hide();
                })
                .catch(() => {
                    //this.querying=false;
                    //his.$Spin.hide();
                });
            },
            handleSubmit(){
                this.updating = true;
                let  params = {user_token: this.account.token};
                if(this.formInline.name){
                    params['name'] = this.formInline.name;
                }
                if(this.formInline.mobile){
                    params['mobile'] = this.formInline.mobile;
                }
                if(this.formInline.gender){
                    params['gender'] = this.formInline.gender;
                }
                if(this.formInline.gender){
                    params['gender'] = this.formInline.gender;
                }
                if(this.formInline.kind){
                    params['kind'] = this.formInline.kind;
                }
                if(this.formInline.balance){
                    params['balance'] = this.formInline.balance;
                }
                this.$http.put(
                    this.$root.$options.baseURI +
                        '/api/v1/admin/users/' + this.uid,params 
                )
                .then(response => {
                    this.updating = false;
                    
                })
                .catch(() => {
                    this.updating = false;
                   
                });


            }
        }
    };
</script>
