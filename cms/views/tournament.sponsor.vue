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
                <FormItem  label="赞助商名">
                    <Input type="text" placeholder="" v-model="formInline.mobile">
                    </Input>
                </FormItem>
                <FormItem label="创建日期">
                    <Row>
                        <Col span="11">
                            <DatePicker type="date" placeholder="请选择开始日期" v-model="formInline.create_start" ></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <DatePicker type="date" placeholder="请选择结束日期"  v-model="formInline.create_end"></DatePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="类型" >
                        <Select   style="width:200px">
                            <Option v-for="item in sponsorTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                </FormItem>
                 <FormItem  label="查询" class="ivu-form-btn-item">
                      <Button type="primary"  :loading="querying"  @click="handleSubmit('formInline')">
                        <span v-if="!querying">查询</span>
                        <span v-else>查询中...</span>
                      </Button>
                      <Button type="primary"  :disabled='createDisable'   @click="createNews">创建</Button>
                </FormItem>
         </Form>
        </div>
        <Table  :columns="columns7" :data="sponsorList"></Table>
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
                create_start:'',
                create_end  :'',
                mobile: '',
                name: '',

            },
            currentView:'',
            sponsorTypeList:[
                {
                    value: '合作品牌',
                    label: '合作伙伴'
                },
                {
                    value: '荣誉赞助品牌',
                    label: '国际授权单位'
                },
                {
                    value: '独家冠名',
                    label: '组织架构'
                }
            ],
            querying:false,

            columns7: [
                {
                    title: '序号',
                    key: 'id'
                },
                {
                    title: '名称',
                    key: 'name'
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
                    title: '链接',
                    key: 'link'
                },
                {
                    title: '类型',
                    key: 'type',
                    render: (h, params) => {
                        let v = params.row[params.column.key],
                            sponsor = this.sponsorTypeList.find((sponsor)=>{ return sponsor.value == v; });
                        return h('div', [
                            h('span', sponsor ?  sponsor.label : '')
                        ]);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 250,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            // h(
                            //     "Button",
                            //     {
                            //         props: {
                            //             type: "primary",
                            //             size: "small"
                            //         },
                            //         style: {
                            //             marginRight: "5px"
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.showDetail(params.index);
                            //             }
                            //         }
                            //     },
                            //     "预览"
                            // ),
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
            sponsorList: [],
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
        })
    },
    watch: {},
    created() {
        this.getSponsorList();
    },
    mounted() {
    },
    methods: {
        showDetail(index){
            this.$router.push({path:'/sponsor/update',query: {id: this.sponsorList[index].id}});
        },
        getSponsorList() {
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
                
            let  params = {user_token: this.account.token,page: this.pageIndex,per: this.pageSize};
            if(this.formInline.name){
                params['name'] = this.formInline.name;
            }

            if(this.formInline.mobile){
                params['mobile'] = this.formInline.mobile;
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
                        '/shcenter/api/sport/sponsor/list',{params :params }
                )
                .then(response => {
                    let res = response.data;
                    this.querying = false;
                    this.sponsorList = res.sponsors;
                    this.total_count = res.total_count;
                    this.$Spin.hide();
                })
                .catch(() => {
                    this.querying = false;
                    this.$Spin.hide();
                });
        },
       
        changePage(pageIndex){
            this.pageIndex = pageIndex;
            this.getSponsorList();
        },
        handleSubmit() {
            this.querying = true;
            this.pageIndex = 1;
            this.getSponsorList();
            this.$refs.page && (this.$refs.page.currentPage = 1);
            
        },
        createNews(){
            this.$router.push('sponsor/create');
        },
        doDel(){
            this.modal_loading = true;
            this.$http
            .get(
                this.$root.$options.baseURI +
                    '/shcenter/api/sport/sponsor/delete',{params : {id: this.sponsorList[this.currentRowIndex].id} }
            )
            .then(response => {
                let res = response.data;
                this.modal_loading = false;
                this.modal3 = false;
                this.getSponsorList();
            })
            .catch(() => {
                this.modal_loading = false;
            });

        }
    }
};
</script>
