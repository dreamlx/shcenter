<style scoped>
.caption {
    background: #f5f7f9;
    color: #333;
    line-height: 30px;
}
.user-list-box .form-box {
    padding: 15px;
    padding-top: 0
}
</style>
<template>
    <div>
      <div style="overflow:hidden;background: #f5f7f9;padding-bottom:10px;padding-left:15px;">
            <router-link  to="/tournament?tab=enrollment"><span style="color: #777;">报名管理</span>&nbsp;/</router-link>
            <a  style="color: #777;">查看报名</a>
        </div>
        <div class="form-box" style="padding:10px;">
           <Form ref="formInline" inline label-position="top">
                <FormItem  label="姓名/队名">
                    <Input type="text" placeholder="" v-model="formInline.name"></Input>
                </FormItem>
                 <FormItem  label="手机号">
                    <Input type="text" placeholder="" v-model="formInline.phone">
                    </Input>
                </FormItem>
                 <FormItem label="支付状态" >
                        <Select   style="width:200px"  v-model="formInline.pay_status" clearable>
                          <Option v-for="item in paymentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                </FormItem>
                <FormItem label="审核状态" >
                        <Select   style="width:200px"  v-model="formInline.status" clearable>
                          <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                </FormItem>
                <FormItem label="报名日期">
                    <Row>
                        <Col span="11">
                            <DatePicker type="date" placeholder="请选择日期" v-model="formInline.created_start" ></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <DatePicker type="date" placeholder="请选择日期"  v-model="formInline.created_end"></DatePicker>
                        </Col>
                    </Row>
                </FormItem>
                 <FormItem  label="查询" class="ivu-form-btn-item">
                      <Button type="primary"  :loading="querying"  @click="handleSubmit('formInline')">
                        <span v-if="!querying">查询</span>
                        <span v-else>查询中...</span>
                      </Button>
                      <Button type="primary"  icon="ios-cloud-download-outline"   @click="exportExcel">
                        <span v-if="!downdloading">导出</span>
                        <span v-else>下载中...</span>
                      </Button> 
                </FormItem>
         </Form>
        </div>
        <Table  :columns="columns7" :data="enroll_list"></Table>
        <div style="margin: 10px 0 10px;overflow: hidden" v-if="total_count>pageSize">
             <div style="float: right; display:inline-block" >
                <Page :total="total_count" :current="1"  ref='page' @on-change="changePage"></Page>
            </div>
        </div>


         <Modal v-model="modal3" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>不通过确认</span>
            </p>
            <div style="text-align:center">
                <p>确认不通过?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="doApprove('3')">确认</Button>
            </div>
        </Modal>

          <Modal v-model="modal4" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>通过确认</span>
            </p>
            <div style="text-align:center">
                <p>确认通过?</p>
            </div>
            <div slot="footer">
                <Button  type="primary"  size="large" long :loading="modal_loading" @click="doApprove('2')">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import '@/lib/util';
import download from  '@/lib/download';
export default {
    data() {
        return {
            formInline:{
                created_start:'',
                created_end  :'',
                phone: '',
                name: '',
                status: '',
                pay_status: ''

            },
            currentView:'',
            paymentList:[
                {
                    value: '未支付',
                    label: '未支付'
                },
                {
                    value: '已支付',
                    label: '已支付'
                }
            ],
            statusList:[
                {
                    value: '审核中',
                    label: '审核中'
                },
                {
                    value: '审核通过',
                    label: '审核通过'
                }
            ],
            querying:false,
            downdloading: false,
            columns7: [
                {
                    title: '序号',
                    key: 'id',
                    render: (h, params) => {
                        return h('div', [
                            h('span', (params.index + 1) + (this.pageIndex - 1) * this.pageSize)
                        ]);
                    }
                },
                {
                    title: '账号',
                    key: 'enroller',
                    render: (h, params) => {
                        let v = params.row[params.column.key];
                        return h('div', [
                            h('span', v   ?  v.name  || v.phone : '')
                        ]);
                    }
                },
                {
                    title: '类型',
                    key: 'group_type',
                    render: (h, params) => {
                        let v = params.row[params.column.key];
                        return h('div', [
                            h('span', v > 1  ? '团队' : '个人')
                        ]);
                    }
                },
                {
                    title: '姓名/队名',
                    key: 'athlete_name',
                    render: (h, params) => {
                        let v = params.row[params.column.key] || params.row.team_name;
                        return h('div', [
                            h('span', v )
                        ]);
                    }
                },
                {
                    title: '报名日期',
                    key: 'created_at',
                    render: (h, params) => {
                        let v = params.row[params.column.key];
                        if(v){
                            let d = new Date(v);
                            return h('div', [
                                h('span',!isNaN(d)
                                ? d.format('yyyy-MM-dd')
                                : '' )
                            ]);
                        }
                    }
                },{
                    title: '支付状态',
                    key: 'pay_status',
                    render: (h, params) => {
                        let v = params.row[params.column.key] || params.row.pay_status;
                        return h('div', [
                            h('span', v )
                        ]);
                    }
                },{
                    title: '审核状态',
                    key: 'approve_status',
                    render: (h, params) => {
                        let v = params.row[params.column.key] || params.row.pay_status;
                        return h('div', [
                            h('span', v )
                        ]);
                    }
                },{
                    title: '操作',
                    key: 'action',
                    width: 320,
                    align: 'left',
                    render: (h, params) => {
                        let buttons = [
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
                                            this.$router.push({path: '/enrollment/detail',query:{id: this.enroll_list[params.index].id}});
                                        }
                                    }
                                },
                                '报名详情'
                            )
                        ];
                        if(params.row.pay_status == '未支付'){
                            buttons.push(
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
                                                this.modal4 = true;
                                                this.current_enroll_index = params.index;
                                            }
                                        }
                                    },
                                    '审核通过'
                                )
                            );
                            buttons.push(
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
                                                this.current_enroll_index = params.index;
                                            }
                                        }
                                    },
                                    '审核不通过'
                                )
                            );
                        }

                        return h('div',buttons);
                    }
                }
            ],
            enroll_list: [],
            pageSize: 10,
            pageIndex: 1,
            total_count: 0,
            modal3: false,
            modal4: false,
            modal_loading: false,
            current_enroll_index: 0,

        };
    },
    computed: {
        ...mapState({
            account: state => state.account
        }),
        rid(){
            return this.$route.query['rid'];
        }
    },
    watch: {},
    created() {
        this.getList();
    },
    mounted() {
    },
    methods: {
        showDetail(index){
            this.$router.push({path:'/enrollment/update',query: {id: this.gameList[index].id}});
        },
        getList() {
            !this.querying  &&  this.$Spin.show({
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
                
            let  params = {pageIndex: this.pageIndex,pageSize: this.pageSize, rid: this.rid || ''};
            if(this.formInline.name){
                params['name'] = this.formInline.name;
            }

            if(this.formInline.phone){
                params['phone'] = this.formInline.mobile;
            }

            if(this.formInline.created_start){
                params['created_start'] = this.formInline.created_start.format('yyyy-MM-dd');
            }

            if(this.formInline.created_end){
                params['created_end'] = this.formInline.created_end.format('yyyy-MM-dd');
            }

            if(this.formInline.status){
                params['approve_status'] = this.formInline.status;
            }

            if(this.formInline.pay_status){
                params['pay_status'] = this.formInline.pay_status;
            }

            this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/enroll/list',{params :params }
                )
                .then(response => {
                    let res = response.data;
                    this.querying = false;
                    this.enroll_list =  res.list;
                    this.total_count = res.total;
                    this.$Spin.hide();
                })
                .catch(() => {
                    this.querying = false;
                    this.$Spin.hide();
                });
        },
        
        changePage(pageIndex){
            this.pageIndex = pageIndex;
            this.getUserList();
        },
        handleSubmit() {
            this.querying = true;
            this.pageIndex = 1;
            this.getList();
            this.$refs.page && (this.$refs.page.currentPage = 1);
            
        },
        exportExcel(){
            let  params = { rid: this.rid || ''};

            if(this.formInline.name){
                params['name'] = this.formInline.name;
            }

            if(this.formInline.phone){
                params['phone'] = this.formInline.mobile;
            }

            if(this.formInline.created_start){
                params['created_start'] = this.formInline.created_start.format('yyyy-MM-dd');
            }

            if(this.formInline.created_end){
                params['created_end'] = this.formInline.created_end.format('yyyy-MM-dd');
            }

            if(this.formInline.status){
                params['approve_status'] = this.formInline.status;
            }

            if(this.formInline.pay_status){
                params['pay_status'] = this.formInline.pay_status;
            }
            this.downdloading = true;
            this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/enroll/export',  {params :params,responseType: 'blob'}
                )
                .then(response => {
                    this.downdloading = false;
                    let blob = response.data;
                    download(blob,'报名列表.xls' );
                 
                })
                .catch(() => {
                    this.downdloading = false;
                });
        },
        doApprove(status){
            this.modal_loading = true;
            this.$http
                .post(
                    this.$root.$options.baseURI +
                        '/shcenter/api/enroll/approve',{id: this.enroll_list[this.current_enroll_index].id,status:status}
                )
                .then(response => {
                    this.modal3 = false ;
                    this.modal4 = false;
                    this.modal_loading = false;
                    this.getList();

                })
                .catch(() => {
                    this.modal_loading = false;
                });
        }
    }
};
</script>
