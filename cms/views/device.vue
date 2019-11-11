<style scoped>
    .caption{
       /* background: #f5f7f9;*/
        color: #333;
        line-height: 30px;
        padding-left: 15px;
    }
    .parking-list-box .form-box{
        padding: 15px;
        padding-top: 0
    }
</style>
<template>
    <div class="parking-list-box">
         <Tabs type="card"  :animated="false">
            <TabPane label="车位列表">
           <!--  <div class="caption">停车场列表</div> -->
            <div>
                  <div class="form-box">
                       <Form ref="formInline" inline label-position="top">
                            <FormItem  label="设备编号">
                                <Input type="text" placeholder="" v-model="formInline.title">
                                </Input>
                            </FormItem>
                            <FormItem  label="停车场">
                                <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                            </FormItem>
                             <FormItem  label="停车区域">
                                <Input type="text" placeholder="" v-model="formInline.address">
                                </Input>
                            </FormItem>
                            <FormItem label="更新时间">
                                <Row>
                                    <Col span="11">
                                        <DatePicker type="date" placeholder="请选择日期" v-model="formInline.create_start" ></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center">-</Col>
                                    <Col span="11">
                                        <DatePicker type="date" placeholder="请选择日期"  v-model="formInline.create_end" ></DatePicker>
                                    </Col>
                                </Row>
                            </FormItem>
                            <br>
                            <FormItem  label="设备类型">
                                 <Select   style="width:140px">
                                    <Option  value="类型1">类型1</Option>
                                    <Option  value="类型2">类型2</Option>
                                </Select>
                            </FormItem>
                            <FormItem  label="IP地址">
                                <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                            </FormItem>
                             <FormItem  label="故障状态">
                                <Select   style="width:140px">
                                    <Option  value="故障1">故障1</Option>
                                    <Option  value="故障2">故障2</Option>
                                </Select>
                            </FormItem>
                             <FormItem  label="查询" class="ivu-form-btn-item">
                                  <Button type="primary"  :loading="querying"  @click="handleSubmit('formInline')">
                                            <span v-if="!querying">查询</span>
                                            <span v-else>查询中...</span>
                                 </Button>
                                  <Button type="success" @click="toCreatSpace">创建</Button>
                                  <Button type="info" >批量导入</Button>
                            </FormItem>
                     </Form>
                 </div>
                  <Table  :columns="columns7" :data="list"></Table>
                  <div style="margin: 10px 0 10px;overflow: hidden;" v-if='list.length>0'>
                         <div style="float: right; display:inline-block" >
                            <Page :total="100" :current="1"  ref='page' @on-change="changePage"></Page>
                        </div>
                 </div>
            </div>
            </TabPane>
        </Tabs>


        <Modal v-model="modal2" width="600"   class="case-info">
        <p slot="header" style="color:#2d8cf0;">
            <Icon type="information-circled"></Icon>
            <span>创建设备</span>
        </p>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  label-position="top">
                    <FormItem label="设备编号（必填）">
                       <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                    </FormItem>
                    <FormItem label="设备名称（必填）">
                       <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                     </FormItem>
                     <FormItem label="停车场（必填）">
                        <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                     </FormItem>
                     <FormItem label="设备类型（必填）">
                        <Select   style="width:100%">
                            <Option  value="类型1">类型1</Option>
                            <Option  value="类型2">类型2</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="区域（必填）">
                        <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                    </FormItem>
                    <FormItem label="IP地址（必填）">
                        <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                    </FormItem>
            </Form>
             <div slot="footer">
                <Button type="error" :loading="submiting" @click="toSubmit" >
                    <span v-if="!submiting">提交</span>
                    <span v-else>Loading...</span>
                </Button>
                 <Button type="ghost" style="margin-left: 8px" @click="modal2=false">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import '../lib/util';
    export default {
        components: {
            
        },
        data() {
            return {
                modal2:false,
                formValidate: {
                    comment: '',
                },
            
                ruleValidate: {
                    comment: [
                        { required: true, message: '请填写处理反馈', trigger: 'blur' }
                    ]
                },
                submiting:false,
                formInline:{
                    create_start:'',
                    create_end  :'',
                    title: '',
                    city: '',
                    address: '',
                    title:''
                },
                userTypeList:[
                    {
                        value: '类型1',
                        label: '类型1'
                    },
                    {
                        value: '类型2',
                        label: '类型2'
                    },
                    {
                        value: '类型3',
                        label: '类型3'
                    },
                    {
                        value: '类型4',
                        label: '类型4'
                    }
                ],
                columns7: [
                    {
                        title: '设备编号',
                        key: 'id'
                    },
                    {
                        title: '设备类型',
                        key: 'city',
    
                    },
                    {
                        title: '设备名称',
                        key: 'title',
                
                    },
                    {
                        title: '停车场',
                        key: 'title',
                
                    },
                    {
                        title: '区域',
                        key: 'title',
                
                    },
                    {
                        title: '更新时间',
                        key: 'title',
                
                    },
                    {
                        title: 'IP地址',
                        key: 'address'
                    },
                    {
                        title: '设备状态',
                        key: ''
                    },
                    {
                        title: '是否有车',
                        key: ''
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.showDetail(params.index);
                                        }
                                    }
                                }, '查看详情')
                            ]);
                        }
                    }
                ],
                list: [],
                pageSize:10,
                pageIndex:1,
                querying:false,
            };
        },
        computed: {
            ...mapState({
                account: state => state.account
            })
        },
        watch: {
          
        },
        mounted(){
            //this.getList()
        },
        methods: {
            getList() {
                !this.querying  && this.$Spin.show({
                    render: h => {
                        return h('div', [
                            h('Icon', {
                                class: 'demo-spin-icon-load',
                                props: {
                                    type: 'load-c',
                                    size: 18
                                }
                            }),
                            h('div', 'Loading')
                        ]);
                    }
                });
                let params = { per: this.pageSize , page: this.pageIndex, user_token: this.user_token,parking_lot_id:1};
                if(this.formInline.title){
                    params.title = this.formInline.title;
                }
                if(this.formInline.address){
                    params.address = this.formInline.address;
                }
                if(this.formInline.city){
                    params.titlec = this.formInline.city;
                }
                if(this.formInline.create_start){
                    params['create_start'] = this.formInline.create_start.format('yyyy-MM-dd');
                }

                if(this.formInline.create_end){
                    params['create_end'] = this.formInline.create_end.format('yyyy-MM-dd');
                }
                this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/api/v1/admin/parking_spaces',{params:params}
                    )
                    .then(response => {

                        let list = [];
                        response.data.forEach(d => {
                            list.push(d.parking_lot);
                        });
                        this.parking_lots = list;
                        this.$Spin.hide();
                        this.querying = false;
                    })
                    .catch(() => {
                        this.$Spin.hide();
                        this.querying = false;
                    });
            },
            showDetail(index){
                this.$router.push('/parking/detail?pid=' + this.parking_lots[index].id);
            },
            changePage(pageIndex){
                this.pageIndex = pageIndex;
                this.getList();
            },
            handleSubmit(){
                this.querying = true;
                this.pageIndex = 1;
                this.getList();
                this.$refs.page && (this.$refs.page.currentPage = 1);
            },
            toCreatSpace(){
                this.modal2 = true;
            },
            toSubmit(){

            }
        }
    };
</script>
