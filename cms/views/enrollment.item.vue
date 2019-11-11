<template>
    <div>
        <div style="overflow:hidden;background: #f5f7f9;padding-bottom:10px;padding-left:15px;">
            <a  style="color: #777;">报名管理</a>&nbsp;/
            <a  style="color: #777;">创建赛事</a>
        </div>
        <div style="padding:20px;">
            <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate"   label-position="top">
                <FormItem  label="名称（中）" prop="title">
                    <Input type="text" placeholder=""  v-model="formValidate.title"></Input>
                </FormItem>
                 <FormItem  label="名称（英）" prop="title_en">
                    <Input type="text" placeholder="" v-model="formValidate.title_en"></Input>
                </FormItem>

                 <FormItem label="报名时间">
                    <Row  style="width:500px;">
                        <Col span="11">
                            <FormItem prop="enroll_start_date">
                                <DatePicker type="date" placeholder="报名开始时间" v-model="formValidate.enroll_start_date" style="width:100%;"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="enroll_end_date">
                                <DatePicker type="date" placeholder="报名结束时间" v-model="formValidate.enroll_end_date"  style="width:100%;"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="支付时间">
                    <Row  style="width:500px;">
                        <Col span="11">
                            <FormItem prop="pay_start_date">
                                <DatePicker type="date" placeholder="支付开始时间" v-model="formValidate.pay_start_date"  style="width:100%;"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="pay_end_date">
                                 <DatePicker type="date" placeholder="支付结束时间" v-model="formValidate.pay_end_date"  style="width:100%;"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                 <FormItem  label="个人组别" >
                    <div><Button type="primary" @click="toAddGroup(0)" size="small">添加</Button></div>
                    <div>
                        <Table  :columns="columns7" :data="groupList"></Table>
                    </div>
                </FormItem>
                 <FormItem  label="团队组别" >
                    <div><Button type="primary" @click="toAddGroup(1)" size="small">添加</Button></div>
                    <div>
                        <Table  :columns="columns7" :data="teamGroupList"></Table>
                    </div>
                </FormItem>
                <FormItem  label="" class="ivu-form-btn-item">
                    <div style="width:100px;">
                        <Button type="primary"  :loading="submiting"  @click="handleSubmit('')" long> 
                            <span v-if="!submiting">提交</span>
                            <span v-else>提交...</span>
                          </Button>
                    </div>
                </FormItem>
             </Form>
        </div>

        <Modal :title="groupType == 0 ? '个人组别' : '团队组别'" v-model="visible" width="600">
            <Form ref="groupFormValidate" :model="groupFormValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="名称（中）" prop="title">
                     <Input type="text" placeholder=""  v-model="groupFormValidate.title"></Input>
                </FormItem>
                <FormItem label="名称（英）" prop="title_en">
                   <Input type="text" placeholder=""  v-model="groupFormValidate.title_en"></Input>
                 </FormItem>
                 <FormItem label="报名费" prop="registery_fee">
                    <Input  type="text" placeholder=""  v-model="groupFormValidate.registery_fee" ></Input>
                 </FormItem>
                 <FormItem label="手续费" prop="handling_fee">
                   <Input  type="text" placeholder=""  v-model="groupFormValidate.handling_fee" ></Input>
                </FormItem>
                <FormItem label="年龄">
                    <Row>
                        <Col span="11">
                            <FormItem prop="age_from">
                               <Input type="text" placeholder="起始年龄"  v-model="groupFormValidate.age_from" ></Input>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="age_to">
                                <Input type="text" placeholder="截止年龄"  v-model="groupFormValidate.age_to" ></Input>
                            </FormItem>
                        </Col>
                    </Row>
                 </FormItem>
                <FormItem label="排序"  prop="seq">
                   <Input  type="text" placeholder=""  v-model="groupFormValidate.seq" ></Input>
                </FormItem>
            </Form>
             <div slot="footer">
                <Button type="primary" :loading="submiting" @click="submitGroup">提交
                  <!--   <template v-if="currentGroupRowIndex == -1">创建</template>
                    <template v-else>更新</template> -->
                </Button>
                <Button type="warning" style="margin-left: 8px" @click="onGroupModalHide">取消</Button>
            </div>
        </Modal>

        <Modal v-model="modal3" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>确认删除?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="delGroup">删除</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    import '../lib/util';
    const validateFee = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('error'));
        }

        if (isNaN(value)) {
            return callback(new Error('error'));
        }

        if( typeof +value !== 'number'){
            return callback(new Error('error'));
        }
        callback();
      
    };
    export default {
        data () {
            return {
                uploadParams:{},
                formValidate: {
                    title: '',
                    title_en: '',
                    enroll_start_date: '',
                    enroll_end_date: '',
                    pay_start_date:'',
                    pay_end_date:'',
                 
                },
                groupFormValidate: {
                    title: '',
                    title_en: '',
                    registery_fee: '',
                    handling_fee: '',
                    age_from:'',
                    age_to:'',
                    seq:'1'
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '请输入名称（中）', trigger: 'blur' }
                    ],
                    title_en: [
                        { required: true, message: '请输入名称（英）', trigger: 'blur' }
                    ],
                    registery_fee: [
                        { required: true, message: '请输入报名费', trigger: 'blur',
                            transform:function(value) {
                                return value.toString();
                            }  
                        },
                        { validator: validateFee, trigger: 'blur',message: '报名费格式不正确'}
                    ],
                    handling_fee: [
                        { required: true, message: '请输入手续费', trigger: 'blur',
                            transform:function(value) {
                                return value.toString();
                            }  
                        },
                        { validator: validateFee, message: '手续费格式不正确', trigger: 'blur' }
                    ],
                    age_from: [
                        { required: true, message: '请输入起始年龄', trigger: 'blur',
                            transform:function(value) {
                                return value.toString();
                            }  
                        },
                        { type: 'integer', message: '起始年龄格式不正确', trigger: 'blur',
                            transform:function(value) {
                                return +value;
                            } 
                        }
                    ],
                    age_to: [
                        { required: true, message: '请输入截止年龄', trigger: 'blur', 
                            transform:function(value) {
                                return value.toString();
                            }  
                        },
                        { type: 'integer', message: '截止年龄格式不正确', trigger: 'blur',  
                            transform:function(value) {
                                return +value;
                            } 
                        }
                    ],
                    seq: [
                        { required: true, message: '请输入排序', trigger: 'blur' ,
                            transform:function(value) {
                                return value.toString();
                            }  
                        },
                        { type: 'integer', message: '排序格式不正确', trigger: 'blur',
                            transform:function(value) {
                                return +value;
                            } 
                        }
                    ],
                    enroll_start_date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    enroll_end_date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    pay_start_date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    pay_end_date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                },
                spinLoadingText: 'Loading',
                spinConfig:{
                    render: h => {
                        return h('div', [
                            h('Icon', {
                                class: 'demo-spin-icon-load',
                                props: {
                                    type: 'load-c',
                                    size: 18
                                }
                            }),
                            h('div', this.spinLoadingText)
                        ]);
                    }
                },
                columns7: [
                    {
                        title: '序号',
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('span', (params.index + 1))
                            ]);
                        }
                    },
                    {
                        title: '名称（中）',
                        key: 'title'
                    },
                    {
                        title: '名称（英）',
                        key: 'title_en'
                    },
                    {
                        title: '报名费',
                        key: 'registery_fee'
                    },
                    {
                        title: '手续费',
                        key: 'handling_fee'
                    },
                    {
                        title: '年龄（低）',
                        key: 'age_from'
                    },
                    {
                        title: '年龄（高）',
                        key: 'age_to'
                    },
                    {
                        title: '排序',
                        key: 'seq'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.groupType = params.row.type;
                                                this.currentGroupRowIndex = params.index;
                                                this.showDetail(params.index);
                                            }
                                        }
                                    },
                                    '编辑'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.modal3 = true;
                                                this.groupType = params.row.type;
                                                this.currentGroupRowIndex = params.index;
                                            }
                                        }
                                    },
                                    '删除'
                                )
                            ]);
                        }
                    }
                ],
                groupList:[],
                teamGroupList:[],
                currentGroupRowIndex:-1,
                groupType:0,
                imgName:'',
                visible:false,
                uploadList:[],
                defaultFileList:[],
                submiting:false,
                modal3: false
            };
        },
        computed: {
            rid(){
                return this.$route.query['id'];
            }
        },
        mounted() {
            if(this.rid){
                this.getDetail();
            }
        },
        methods: {
            showDetail(index){
                let groupType = +this.groupType , formData = groupType == 0 ?  this.groupList[index] : this.teamGroupList[index] ;
                Object.keys(this.groupFormValidate).forEach((key)=>{
                    this.groupFormValidate[key] = formData[key];
                });
                this.visible = true;
                // if(groupType == 0){
                //     this.groupList.splice(this.currentGroupRowIndex,1);
                // }
                // if(groupType == 1){
                //     this.teamGroupList.splice(this.currentGroupRowIndex,1);
                // }

            },
            getDetail(){
                this.spinLoadingText = 'Loading';
                this.$Spin.show(this.spinConfig);
                this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/sport/enrollment/find',{params: {id: this.rid}}
                )
                .then(response => {
                    let res = response.data;
                    this.formValidate.title = res.race.title;
                    this.formValidate.title_en = res.race.title_en;
                    this.formValidate.enroll_start_date = res.race.enroll_start_date;
                    this.formValidate.enroll_end_date = res.race.enroll_end_date;

                    this.formValidate.pay_start_date = res.race.pay_start_date;
                    this.formValidate.pay_end_date = res.race.pay_end_date;

                    this.groupList = res.group_list.filter((g)=>{return g.type == 0;});
                    this.teamGroupList = res.group_list.filter((g)=>{return g.type == 1;});
                  
                    this.$Spin.hide();
                })
                .catch(() => {
                    this.$Spin.hide();
                });
            },
            toAddGroup(groupType){
                this.$refs.groupFormValidate.resetFields();
                this.visible = true;
                this.groupType = groupType;
                this.currentGroupRowIndex = -1;
            },
            submitGroup(){
                debugger;
                this.$refs.groupFormValidate.validate((valid) => {
                    if (valid) {
                        let groupType = +this.groupType,groupData = Object.assign({type: groupType},this.groupFormValidate),rowIndex = this.currentGroupRowIndex;
                        if(rowIndex == -1){
                            groupType == 0 ? this.groupList.push(groupData) : this.teamGroupList.push(groupData);
                        }

                        if(rowIndex != -1){
                            groupType == 0 ? this.groupList.splice(rowIndex,1,groupData) : this.teamGroupList.splice(rowIndex,1,groupData);
                        }

                        this.visible = false;
                    }
                });
            },
            delGroup(){
                let groupType = +this.groupType;
                if(groupType == 0){
                    this.groupList.splice(this.currentGroupRowIndex,1);
                }
                if(groupType == 1){
                    this.teamGroupList.splice(this.currentGroupRowIndex,1);
                }
                this.modal3 = false;

            },
            onGroupModalHide(){
                //resetFields();
                this.visible = false;
            },
            handleSubmit(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.doCreate();
                    }
                });
            },
            doCreate(){
                this.submiting = true;
                let params =  Object.assign({id: this.rid },this.formValidate);
                params.enroll_start_date =  this.formValidate.enroll_start_date.format('yyyy-MM-dd');
                params.enroll_end_date =  this.formValidate.enroll_end_date.format('yyyy-MM-dd');
                params.pay_start_date =  this.formValidate.pay_start_date.format('yyyy-MM-dd');
                params.pay_end_date =  this.formValidate.pay_end_date.format('yyyy-MM-dd');
                params.group = [].concat(this.groupList).concat(this.teamGroupList);
                this.$http.post('/shcenter/api/sport/enrollment/init',params)
                   .then(response => {
                       this.submiting = false;
                       this.$router.push({path:'/tournament',query:{tab:'enrollment'}});
                   })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status == 403){
                        this.$Message.error('无操作权限!');
                    }
                });
            }
        },
};
</script>
<style>
    .quill-editor {
       height: 400px;
       margin-bottom: 20px;
    }
</style>