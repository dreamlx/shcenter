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
                <FormItem  label="赛事名称">
                    <Input type="text" placeholder="" v-model="formInline.title"></Input>
                </FormItem>
                <FormItem label="创建日期">
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
                      <Button type="primary"  :disabled='createDisable'  @click="createRace">创建赛事</Button>
                </FormItem>
         </Form>
        </div>
        <Table  :columns="columns7" :data="gameList"></Table>
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
import '@/lib/util';

export default {
    data() {
        return {
            formInline:{
                created_start:'',
                created_end  :'',
                title: '',

            },
            currentView:'',
            userTypeList:[
                {
                    value: '普通',
                    label: '普通'
                },
                {
                    value: '业主',
                    label: '业主'
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
                    title: '标题（中）',
                    key: 'title'
                },
                {
                    title: '标题（英）',
                    key: 'title_en'
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
                                            this.$router.push({path:'/enrollment/list',query: {rid: this.gameList[params.index].id}});
                                        }
                                    }
                                },
                                '查看报名'
                            )
                        ]);
                    }
                }
            ],
            gameList: [],
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
            if(this.formInline.title){
                params['title'] = this.formInline.name;
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
                        '/shcenter/api/sport/enrollment/list',{params :params }
                )
                .then(response => {
                    let res = response.data;
                    this.querying = false;
                    this.gameList =  res.list;
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
        createRace(){
            this.$router.push('enrollment/create');
        },
        doDel(){
            this.modal_loading = true;
            this.$http
            .get(
                this.$root.$options.baseURI +
                    '/shcenter/api/sport/enrollment/delete',{params : {id: this.gameList[this.currentRowIndex].id} }
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
