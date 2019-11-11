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
    .v-btn{
      display: inline-block;
      
      color: #c0c0c0;
      line-height: 60px;
      border-radius: 5px;
      padding: 0 20px!important;
      border:  1px solid #c0c0c0;
      position: relative;
      font-size: 20px;
      width: 100px;
      text-align: center;
    }
    
    .v-btn input{
      position:absolute;
      width:100%;
      width: 100%;
      left: 0;
      height: 32px;
      opacity: 0;
    }
    .pic-list{
        list-style: none;
        padding: 0;
        margin: 0

    }
    .pic-list>li{
        display: inline-block;
        width: 100px;
        vertical-align: top;
        margin-left: 10px;
        position: relative;
    }
    .pic-list>li:first-child{
        margin-left: 0
    }
    .pic-list>li img{ width: 100% }
    .pic-list>li .icon-del{
        position: absolute;
        top:0;
        right: 5px;
        font-size: 20px;
        color: #c0c0c0;
    }
</style>
<template>
    <div class="parking-list-box">
        <div class="form-box" style="display:none">
           <Form ref="formInline" inline label-position="top">
                <FormItem  label="标题">
                    <Input type="text" placeholder="" v-model="formInline.title">
                    </Input>
                </FormItem>
                <FormItem label="发布日期">
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
                <FormItem label="显示状态" >
                        <Select   style="width:200px"  v-model="formInline.valid" clearable>
                            <Option v-for="item in validTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                </FormItem>
                <FormItem  label="查询" class="ivu-form-btn-item">
                      <Button type="primary"  :loading="querying"  @click="handleSubmit('formInline')">
                        <span v-if="!querying">查询</span>
                        <span v-else>查询中...</span>
                      </Button>
                      <Button type="primary"    @click="createKV">创建</Button>
                </FormItem>
         </Form>
        </div>
        <Table  :columns="columns7" :data="kvList" ></Table>
       <!--  <div style="margin: 10px 0 10px;overflow: hidden;" v-if="list.length>0">
            <div style="float: right; display:inline-block" >
                    <Page :total="100" :current="1"  ref='page' @on-change="changePage"></Page>
            </div>
         </div> -->

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

        <Modal title="View Image" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
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
                modal3:false,
                modal_loading:false,
                
                submiting:false,
                formInline:{
                    created_start:'',
                    created_end  :'',
                    title: '',
                    valid: ''
                   
                },
                validTypeList:[
                    {
                        value: '1',
                        label: '显示'
                    },
                    {
                        value: '0',
                        label: '不显示'
                    }
                ],
                columns7: [
                    {
                        title: '序号',
                        key: 'id'
                    },
                    {
                        title: '名称',
                        key: 'type',
                        render:(h,params)=>{
                            return h('div',{}, params.row.type == 1 ? '网站kv' : '手机kv' );
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
                                                this.visible = true;
                                                this.imgName = this.kvList[params.index].src;
                                            }
                                        }
                                    },
                                    '预览'
                                ),
                                h('Button', {
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
                                            this.$router.push({path:'/kv/update',query: {id: this.kvList[params.index].id}});
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                kvList: [],
                pageSize:10,
                pageIndex:1,
                querying:false,
                picList:[],
                visible:false,
                imgName: ''
            };
        },
        computed: {
            ...mapState({
                account: state => state.account,
                editDisable: state => state.account.role == 'reviewer',
            })
        },
        watch: {
          
        },
        mounted(){
            this.getList();
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
                let params = { };
                if(this.formInline.title){
                    params['title'] = this.formInline.title;
                }

                if(this.formInline.valid){
                    params['valid'] = this.formInline.valid;
                }

                if(this.formInline.created_start){
                    params['created_start'] = this.formInline.created_start.format('yyyy-MM-dd');
                }

                if(this.formInline.created_end){
                    params['created_end'] = this.formInline.created_end.format('yyyy-MM-dd');
                }
                this.$http
                    .post(
                        this.$root.$options.baseURI +
                            '/shcenter/api/sport/kv/list',{...params}
                    )
                    .then(response => {

                        let bannerList = [];
                        this.kvList = response.data.list;
                        //this.parking_lots = list;
                        this.$Spin.hide();
                        this.querying = false;
                    })
                    .catch(() => {
                        this.$Spin.hide();
                        this.querying = false;
                    });
            },
            showDetail(index){
              
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
            toDelete(index){
                this.modal3 = true;
                this.current_banner_id = this.bannerList[index].id;
            },
            doDel(){
                this.modal_loading = true;
                let  params = {};
                this.$http.post('/shcenter/api/sport/banner/delete', {id: this.current_banner_id})
                 .then(function(res){
                     this.modal_loading = false;
                     this.modal3 = false;
                     this.bannerList = this.bannerList.filter((item)=>{ return item.id != this.current_banner_id;});
                 });
            },
            createKV(){
                this.$router.push('kv/create');
            }
        }
    };
</script>
