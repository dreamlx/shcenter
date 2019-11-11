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
        <!--  <Tabs type="card"  :animated="false">
            <TabPane label="车位列表"> -->
           <!--  <div class="caption">停车场列表</div> -->
            <div>
                  <div class="form-box">
                       <Form ref="formInline" inline label-position="top">
                            <FormItem  label="赛事名称">
                                 <Select
                                    v-model="formInline.parking_lot"
                                    label="w"
                                    filterable
                                    remote
                                    :remote-method="handleSearch1"
                                    placeholder="请输入停车场名称选择"
                                    :loading="searching"
                                    style="width:200px"
                                    >
                                   <Option v-for="(option, index) in query_parking_lots " :value="option.id" :key="index" :label="option.title">
                                          <span>{{option.title}}</span>
                                          <span style="display:block;white-space:normal">{{option.address}}</span>
                                    </Option>   
                                </Select>
                            </FormItem>
                            <FormItem  label="组别">
                                 <Select
                                    v-model="formInline.parking_zone"
                                    :placeholder="formInline.parking_lot && query_parking_zones.length==0 ? '没有相应组别' : '请选择赛事' "
                                    not-found-text = '没有相应组别'
                                    style="width:200px"
                                    :disabled='formInline.parking_lot.length==0'
                                    >
                                   <Option v-for="(option, index) in query_parking_zones " :value="option.id" :key="index" :label="option.title">
                                          <span>{{option.title}}</span>
                                          <span style="display:block;white-space:normal">{{option.address}}</span>
                                    </Option>   
                                </Select>
                            </FormItem>
                             <FormItem  label="姓名">
                                <Input type="text" placeholder="" v-model="formInline.code" style="width:200px">
                                </Input>
                            </FormItem>
                          <!--   <FormItem label="创建日期">
                                <Row>
                                    <Col span="11">
                                        <DatePicker type="date" placeholder="请选择日期" v-model="formInline.create_start" ></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center">-</Col>
                                    <Col span="11">
                                        <DatePicker type="date" placeholder="请选择日期"  v-model="formInline.create_end" ></DatePicker>
                                    </Col>
                                </Row>
                            </FormItem> -->
                            
                            <FormItem  label="手机号">
                                <Input type="text" placeholder="" v-model="formInline.city" style="width:200px">
                                </Input>
                            </FormItem>
                            <FormItem  label="邮箱">
                                <Input type="text" placeholder="" v-model="formInline.address" style="width:200px">
                                </Input>
                            </FormItem>
                            <!--  <FormItem  label="业主姓名">
                                <Input type="text" placeholder="" v-model="formInline.owner_name" style="width:200px">
                                </Input>
                            </FormItem> -->
                             <FormItem  label="查询" class="ivu-form-btn-item">
                                  <Button type="primary"  :loading="querying"  @click="handleSubmit('formInline')">
                                            <span v-if="!querying">查询</span>
                                            <span v-else>查询中...</span>
                                 </Button>
                                 
                                  <Button type="info" @click="handleSubmit('formInline')">批量导入</Button>
                            </FormItem>
                     </Form>
                 </div>
                  <Table  :columns="columns7" :data="list"></Table>
                  <div style="margin: 10px 0 10px;overflow: hidden;" v-if="total_count>pageSize">
                         <div style="float: right; display:inline-block" >
                            <Page :total="total_count" :current="1"  ref='page' @on-change="changePage" :pageSize="pageSize"></Page>
                        </div>
                 </div>
            </div>
       


        <Modal v-model="modal2" width="600"   class="case-info">
            <p slot="header" style="color:#2d8cf0;">
                <Icon type="information-circled"></Icon>
                <template v-if="listIndex==-1">
                    <span>创建车位</span>
                </template>
                 <template v-if="listIndex > 1">
                    <span>创建车位</span>
                </template>
            </p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  label-position="top">
                <FormItem label="停车场（必填）" prop="parking_lot">
                     <Select
                        v-model="formValidate.parking_lot"
                        filterable
                        remote
                        :remote-method="handleSearch2"
                        placeholder="请输入停车场名称选择"
                        :loading="searching"
                        style="width:100%"
                        ref="parking_lot_selector"
                        >
                       <Option v-for="(option, index) in form_parking_lots " :value="option.id.toString()" :key="index" :label="option.title">
                              <span>{{option.title}}</span>
                              <span style="display:block;white-space:normal">{{option.address}}</span>
                        </Option>   
                    </Select>
                </FormItem>
                <FormItem label="区域（必填）" prop="parking_zone_id">
                    <Select
                        v-model="formValidate.parking_zone_id"
                        :placeholder="formValidate.parking_lot && form_parking_zones.length==0 ? '没有相应停车区域' : '请选择停车区域' "
                        not-found-text = '没有相应停车区域'
                        style="width:100%"
                        :disabled='formValidate.parking_lot.length==0'

                        >
                       <Option v-for="(option, index) in form_parking_zones " :value="option.id.toString()" :key="index" :label="option.title">
                              <span>{{option.title}}</span>
                        </Option>   
                    </Select>
                 </FormItem>
                 <FormItem label="编号（必填，不能重复）" prop="code">
                    <Input type="text" placeholder="" v-model="formValidate.code"  >
                            </Input>
                 </FormItem>
                 <FormItem label="业主手机号（必填）" prop="owner_mobile">
                    <Input type="text" placeholder="" v-model="formValidate.owner_mobile"  >
                            </Input>
                </FormItem>
            </Form>
            <div slot="footer">
                 <Button type="error" :loading="submiting" @click="toSubmit" >
                    <span v-if="!submiting">保存</span>
                    <span v-else>Loading...</span>
                </Button>
                 <Button type="ghost" style="margin-left: 8px" @click="onModalCancel">取消</Button>
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
                <Button type="error" size="large" long :loading="modal_loading" @click="doDel">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import util from '../lib/util';
    export default {
        components: {
            
        },
        data() {
            return {
                modal2:false,
                modal3: false,
                searching:false,
                modal_loading: false,
                formValidate: {
                    parking_lot:'',
                    parking_zone_id:'',
                    code:'',
                    owner_mobile: ''
                },
            
                ruleValidate: {
                    parking_lot: [
                        { required: true, message: '请选择停车场', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请填写编号', trigger: 'blur' }
                    ],
                    owner_mobile: [
                        { required: true, message: '请填写业主手机号', trigger: 'blur' }
                    ],
                    parking_zone_id: [
                        { required: true, message: '请选择停车区域', trigger: 'blur' }
                    ]
                },
                submiting:false,
                formInline:{
                    create_start:'',
                    create_end  :'',
                    title: '',
                    city: '',
                    address: '',
                    title:'',
                    parking_lot:''
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
                        key: 'id',
                        render: (h, params) => {
                            let index =  params.index + this.pageSize * (this.pageIndex - 1) + 1;
                            return h('div', [
                                h('span',index)
                            ]);
                        }
                    },
                    {
                        title: '姓名',
                        key: 'owner_name',
    
                    },
                    {
                        title: '手机号',
                        key: 'owner_mobile',
                
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                
                    },
                    {
                        title: '性别',
                        key: 'parking_zone_code',
                
                    },
                    {
                        title: '参赛号',
                        key: 'parking_zone_code',
                
                    },
                    {
                        title: '成绩',
                        key: 'parking_zone_code',
                
                    },
                    {
                        title: '排名',
                        key: 'id',
                        render: (h, params) => {
                            let index =  params.index + this.pageSize * (this.pageIndex - 1) + 1;
                            return h('div', [
                                h('span',index)
                            ]);
                        }
                    },
                    {
                        title: '赛事名称',
                        key: ''
                    },
                    {
                        title: '创建日期',
                        key: 'created_at',
                        render: (h, params) => {
                            let v = params.row[params.column.key];
                            if (v) {
                                let d = new Date(v);
                                return h('div', [
                                    h('span',!isNaN(d)
                                    ? d.format('yyyy-MM-dd ')
                                    : '' )
                                ]);
                               
                            }
                        }
                    }
                ],
                list:[],
                listIndex:-1,
                total_count:0,
                pageSize:10,
                pageIndex:1,
                querying:false,
                query_parking_lots:[],
                query_parking_zones:[],
                form_parking_lots:[],
                form_parking_zones:[],

            };
        },
        computed: {
            ...mapState({
                account: state => state.account
            })
        },
        watch: {
            'formInline.parking_lot':function(val){

                if(!val){
                    this.formInline.parking_zone = '';
                }
                if(val){
                    this.searchParkingRegion(val,'query_parking_zones');
                }
            },
            'formValidate.parking_lot':function(val){
                if(!val){
                    this.formValidate.parking_zone_id = '';
                }
                if(val){
                    this.searchParkingRegion(val,'form_parking_zones');
                }
            }
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
                let params = { per: this.pageSize , page: this.pageIndex, user_token: this.user_token};
                if(this.formInline.parking_lot){
                    params.parking_lot_id = this.formInline.parking_lot;
                }
                if(this.formInline.parking_zone){
                    let parking_zone = this.query_parking_zones.find((item)=>{ return item.id == this.formInline.parking_zone;});
                    params.group = parking_zone  ?  parking_zone.title || '' : '';
                    console.log(parking_zone.title);
                }
                if(this.formInline.address){
                    params.address = this.formInline.address;
                }
                if(this.formInline.city){
                    params.city = this.formInline.city;
                }
                if(this.formInline.create_start){
                    params['create_start'] = this.formInline.create_start.format('yyyy-MM-dd');
                }

                if(this.formInline.create_end){
                    params['create_end'] = this.formInline.create_end.format('yyyy-MM-dd');
                }

                if(this.formInline.owner_name){
                    params['owner_name'] = this.formInline.owner_name;
                }
                if(this.formInline.code){
                    params['code'] = this.formInline.code;
                }
                this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/api/v1/admin/parking_spaces',{params:params}
                    )
                    .then(response => {

                        let list = [];
                        response.data.data.forEach(d => {
                            list.push(d);
                        });
                        this.list = list;
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
                this.listIndex = -1; 
                this.$refs.formValidate.resetFields();
            },
            toSubmit(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        
                        let api = '/api/v1/admin/parking_spaces',requestMethod = 'post';
                        if(this.listIndex > -1){
                            api = '/api/v1/admin/parking_zones/' + this.list[this.listIndex].id;
                            requestMethod = 'put';
                        }
                        this.submiting = true;
                        let  params = {user_token: this.account.token,parking_lot_id: this.formValidate.parking_lot,parking_zone_id: this.formValidate.parking_zone_id,code : this.formValidate.code,owner_mobile: this.formValidate.owner_mobile};
                        
                        this.$http[requestMethod](this.$root.$options.baseURI + api,params)
                        .then(response => {
                            this.modal2 = false;
                            this.submiting = false;
                            this.pageIndex = 1;
                            this.getList();
                            this.$refs.page && (this.$refs.page.currentPage = 1);
                        })
                        .catch(() => {
                            this.submiting = false;
                               
                        });
                    }
                });
            },
            toModify(index){
                this.modal2 = true;
                this.listIndex = index;
                this.$refs.formValidate.resetFields();
                let item =  this.list[index];
               
                this.formValidate.code = item.code;
                this.formValidate.owner_mobile = item.owner_mobile;

                this.searchParkingLot(item.parking_lot_title,'form_parking_lots');
            },
            handleSearch1:util.debounce(function (query) {
                if(query){
                    this.searchParkingLot(query,'query_parking_lots');
                }else{
                    this.formInline.parking_lot = '';
                    this.formInline.parking_zone = '';
                }
            },300),
            handleSearch2:util.debounce(function (query) {
                if(query){
                    this.searchParkingLot(query,'form_parking_lots');
                }else{
                    this.formValidate.parking_lot = '';
                    this.formValidate.parking_zone_id = '';
                }
            },300),
            searchParkingRegion(parking_lot,listName){
                let params = {per: 100000};
                this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/api/v1/admin/parking_zones?parking_lot_id=' + parking_lot + '&t=' + (+new Date),{params:params}
                    )
                    .then(response => {

                        let list = [];
                        response.data.data.forEach(d => {
                            list.push(d);
                        });
                        this[listName] = list;
                        
                    })
                    .catch(() => {
                       
                    });
            },
            searchParkingLot(title,listName){
                let params = {per: 100000,title : title};
                this.searching = true;
                this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/api/v1/admin/parking_lots?t=' + (+new Date),{params:params}
                    )
                    .then(response => {
                        let list = [];
                        response.data.data.forEach(d => {
                            list.push(d);
                        });
                        this[listName] = list;
                        this.searching = false;
                    })
                    .catch(() => {
                        this.searching = false;
                    });
            },
            onModalCancel(){
                this.modal2 = false;
            },
            changePage(pageIndex){
                this.pageIndex = pageIndex;
                this.getList();
            },
            doDel(){
                this.modal_loading = true;
                let  params = {},id = this.list[this.listIndex].id;
                this.$http.delete(this.$root.$options.baseURI + '/api/v1/admin/parking_spaces/' + id, params)
                 .then(function(res){
                     this.modal_loading = false;
                     this.modal3 = false;
                     this.pageIndex = 1;
                     this.getList();
                     this.$refs.page && (this.$refs.page.currentPage = 1); 

                 });
            }
        }
    };
</script>
