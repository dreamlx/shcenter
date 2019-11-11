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
            <!-- <Breadcrumb>
                <BreadcrumbItem to="/">赛事新闻</BreadcrumbItem>
                <BreadcrumbItem>新闻编辑</BreadcrumbItem>
            </Breadcrumb> -->
            <!-- <a  style="color: #777;">报名管理</a>&nbsp;/
            <a  style="color: #777;">查看报名</a> -->
        </div>
        <div class="form-box" style="padding:10px;">
           <Form ref="formInline" inline label-position="top">
                <FormItem  label="姓名">
                    <Input type="text" placeholder="" v-model="formInline.name">
                    </Input>
                </FormItem>
                 <FormItem  label="手机号">
                    <Input type="text" placeholder="" v-model="formInline.mobile">
                    </Input>
                </FormItem>
                <FormItem label="性别" >
                        <Select   style="width:200px"  v-model="formInline.gender" clearable>
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                </FormItem>
                <FormItem label="状态" >
                        <Select   style="width:200px"  v-model="formInline.valid" clearable>
                          <Option v-for="item in validTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                </FormItem>
                <FormItem label="注册日期">
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
                   <!--    <Button type="primary"    @click="createNews">创建</Button> -->
                </FormItem>
         </Form>
        </div>
        <Table  :columns="columns7" :data="userList"></Table>
        <div style="margin: 10px 0 10px;overflow: hidden" v-if="total_count>pageSize">
             <div style="float: right; display:inline-block" >
                <Page :total="total_count" :current="1"  ref='page' @on-change="changePage"></Page>
            </div>
        </div>


         <Modal v-model="modal3" width="360">
           <!--  <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <Icon type="ios-information-circle" />
                <span>确认停用</span>
            </p> -->
            <div style="text-align:center">
                <p>确认停用?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="doDel">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import '../lib/util';

export default {
    data() {
        return {
            formInline:{
                create_start:'',
                create_end  :'',
                mobile: '',
                name: '',

            },
            currentView:'',
            validTypeList:[
                {
                    value: '0',
                    label: '停用'
                },
                {
                    value: '1',
                    label: '正常'
                }
            ],
            querying:false,

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
                    key: 'name'
                },
                {
                    title: '手机号码',
                    key: 'phone'
                },
                {
                    title: '邮箱',
                    key: 'email'
                },
                {
                    title: '性别',
                    key: 'gender'
                },
                {
                    title: '注册日期',
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
                },
                {
                    title: '状态',
                    key: 'title_en'
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
                                            this.showDetail(params.index);
                                        }
                                    }
                                },
                                '查看'
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
                                        }
                                    }
                                },
                                '停用'
                            ),
                        ]);
                    }
                }
            ],
            userList: [],
            pageSize: 10,
            pageIndex: 1,
            total_count: 0,
            modal3: false,
            modal_loading: false
        };
    },
    computed: {
        ...mapState({
            account: state => state.account
        })
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
                
            let  params = {pageIndex: this.pageIndex,pageSize: this.pageSize};
            if(this.formInline.name){
                params['name'] = this.formInline.name;
            }

            if(this.formInline.mobile){
                params['phone'] = this.formInline.mobile;
            }

            if(this.formInline.created_start){
                params['created_start'] = this.formInline.created_start.format('yyyy-MM-dd');
            }

            if(this.formInline.created_end){
                params['created_end'] = this.formInline.created_end.format('yyyy-MM-dd');
            }

            this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/user/list',{params :params }
                )
                .then(response => {
                    let res = response.data;
                    this.querying = false;
                    this.userList =  res.list;
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
            this.getList();
        },
        handleSubmit() {
            this.querying = true;
            this.pageIndex = 1;
            this.getList();
            this.$refs.page && (this.$refs.page.currentPage = 1);
            
        },
        createNews(){
            this.$router.push('enrollment/create');
        },
        doDel(){
            this.modal3 = false;
        }
    }
};
</script>
