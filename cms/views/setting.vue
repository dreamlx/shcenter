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
            <TabPane label="系统用户">
           <!--  <div class="caption">停车场列表</div> -->
            <div>
                  <div class="form-box">
                       <Form ref="formInline" inline label-position="top">
                     
                             <FormItem  label="查询" class="ivu-form-btn-item">
                                  <Button type="primary" @click="toCreatSpace">创建</Button>
                            </FormItem>
                     </Form>
                 </div>
                  <Table  :columns="columns7" :data="list" ></Table>
                  <div style="margin: 10px 0 10px;overflow: hidden;" v-if="list.length>0">
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
            <span>创建系统用户</span>
        </p>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  label-position="top">
                    <FormItem label="用户名（必填）">
                       <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                    </FormItem>
                    <FormItem label="密码（必填）">
                       <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                     </FormItem>
                     <FormItem label="确认密码（必填）">
                        <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                     </FormItem>
                     <FormItem label="角色（必填）">
                         <Select   style="width:100%">
                            <Option  value="角色1">角色1</Option>
                            <Option  value="角色2">角色2</Option>
                        </Select>
                    </FormItem>
            </Form>
             <div slot="footer">
                <Button type="error" :loading="submiting" @click="toSubmit" >
                    <span v-if="!submiting">提交</span>
                    <span v-else>Loading...</span>
                </Button>
                 <Button type="ghost" style="margin-left: 8px" @click="modal2=false"  >取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import '@/lib/util';
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
                        title: '序号',
                        key: 'id'
                    },
                    {
                        title: '用户名',
                        key: 'city',
    
                    },
                    {
                        title: '角色',
                        key: 'city',
    
                    },
                    {
                        title: '更新时间',
                        key: 'title',
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
           // this.getList()
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
