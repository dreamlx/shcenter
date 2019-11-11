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
        <div class="form-box">
           <Form ref="formInline" inline label-position="top">
                <FormItem  label="活动标题">
                    <Input type="text" placeholder="" v-model="formInline.title"></Input>
                </FormItem>
                <FormItem label="发布日期">
                    <Row>
                        <Col span="11">
                            <DatePicker type="date" placeholder="请选择日期" v-model="formInline.create_start" ></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <DatePicker type="date" placeholder="请选择日期"  v-model="formInline.create_end"></DatePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="是否原创" >
                        <Select   style="width:200px"  v-model="formInline.source">
                            <Option v-for="item in sourceTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                </FormItem>
                <!-- <FormItem label="首页轮播" >
                        <Select   style="width:200px"  v-model="formInline.showType">
                            <Option v-for="item in showTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                </FormItem> -->
                 <FormItem  label="查询" class="ivu-form-btn-item">
                      <Button type="primary"  :loading="querying"  @click="handleSubmit('formInline')">
                        <span v-if="!querying">查询</span>
                        <span v-else>查询中...</span>
                      </Button>
                      <Button type="primary"  :disabled='createDisable'   @click="createNews()">创建</Button>
                </FormItem>
         </Form>
        </div>
        <Table  :columns="columns7" :data="newsList"></Table>
        <div style="margin: 10px 0 10px;overflow: hidden" v-if="total_count>pageSize">
             <div style="float: right; display:inline-block" >
                <Page :total="total_count" :current="1"  ref='page' @on-change="changePage"></Page>
            </div>
        </div>


         <Modal v-model="modal3" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>确认删除?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="doDel">删除</Button>
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
                create_start: '',
                create_end  :'',
                source: '',
                title: '',
                showType: ''

            },
            currentView:'',
            sourceTypeList:[
                {
                    value: '原创',
                    label: '原创'
                },
                {
                    value: '其他',
                    label: '其他'
                }
            ],
            showTypeList:[
                {
                    value: '是',
                    label: '是'
                },
                {
                    value: '否',
                    label: '否'
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
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '更新日期',
                    key: 'updated_at',
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
                    title: '来源',
                    key: 'source'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 250,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('router-link', 
                                {
                                    attrs: {
                                        'to': {
                                            path: '/news/preview',
                                            query: {
                                                id: params.row.id,
                                            }
                                        },
                                        'target': '_blank',
                                        'class': 'ivu-btn ivu-btn-primary ivu-btn-small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                },
                                [h('span', {}, ['预览'])]
                            ),
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: this.editDisable
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
                                '编辑'
                            ),
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: this.createDisable
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal3 = true;
                                            this.currentRowIndex = params.index;
                                        }
                                    }
                                },
                                '删除'
                            )
                        ]);
                    }
                }
            ],
            newsList: [],
            pageSize: 10,
            pageIndex: 1,
            total_count: 0,
            modal3: false,
            modal_loading: false
        };
    },
    computed: {
        ...mapState({
            account: state => state.account,
            createDisable: state => state.account.role !== 'admin',
            editDisable: state => state.account.role == 'reviewer',
        }),
    },
    watch: {},
    created() {
        this.getList();
    },
    mounted() {
    },
    methods: {
        showDetail(index){
            this.$router.push({path:'/news/update',query: {id: this.newsList[index].id}});
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
                
            let  params = {user_token: this.account.token,pageIndex: this.pageIndex,pageSize: this.pageSize};
            if(this.formInline.title){
                params['title'] = this.formInline.title;
            }

            if(this.formInline.source){
                params['source'] = this.formInline.source;
            }

            if(this.formInline.create_start){
                params['publish_begin_date'] = this.formInline.create_start.format('yyyy-MM-dd');
            }

            if(this.formInline.create_end){
                params['publish_end_date'] = this.formInline.create_end.format('yyyy-MM-dd');
            }

            this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/sport/news/list',{params :params }
                )
                .then(response => {
                    let res = response.data;
                    this.querying = false;
                    this.newsList = res.list;
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
            this.$router.push('news/create');
        },
        doDel(){
            this.modal_loading = true;
            this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/sport/news/delete',{params : {id: this.newsList[this.currentRowIndex].id} }
                )
                .then(response => {
                    let res = response.data;
                    this.modal_loading = false;
                    this.modal3 = false;
                    this.getList();
                })
                .catch(() => {
                    this.modal_loading = false;
                });

        }
    }
};
</script>
