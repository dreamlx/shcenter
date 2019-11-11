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
         <Tabs type="card"  :animated="false">
            <TabPane label="内容列表">
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


        <Modal v-model="modal2" width="600"   class="case-info">
        <p slot="header" style="color:#2d8cf0;">
            <Icon type="information-circled"></Icon>
            <span>创建内容</span>
        </p>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  label-position="top">
                    <FormItem label="类型（必填）">
                       <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                    </FormItem>
                    <FormItem label="显示位置（必填）">
                       <Input type="text" placeholder="" v-model="formInline.city">
                                </Input>
                     </FormItem>
                     
                     <FormItem label="添加图片">
                        <div> 
                             <ul class="pic-list">
                                <li v-for="(pic,index) in picList" :key="index" >
                                  <img :src="pic">
                                  <Icon type="ios-close" class="icon-del"></Icon>
                                </li>
                                <li><a class="v-btn v-btn-1">+<input type="file"  accept="image/*" @change='uploadPic($event)'/></a></li>
                            </ul>
                        </div>
                    </FormItem>
            </Form>
             <div slot="footer">
                <Button type="error" :loading="submiting" @click="toSubmit" >
                    <span v-if="!submiting">提交</span>
                    <span v-else>提交中...</span>
                </Button>
                 <Button type="ghost" style="margin-left: 8px" @click="modal2=false" >取消</Button>
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
                modal3:false,
                modal_loading:false,
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
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '名称',
                        key: 'city',
                        render:(h)=>{
                            return h('div',{},'banner图片文件');
                        }
    
                    },
                    {
                        title: '显示位置',
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
                                           // this.showDetail(params.index);
                                        }
                                    }
                                }, '查看详情'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.toDelete(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                list: [],
                pageSize:10,
                pageIndex:1,
                querying:false,
                picList:[]
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
                // if(this.formInline.title){
                //     params.title = this.formInline.title;
                // }
                // if(this.formInline.address){
                //     params.address = this.formInline.address;
                // }
                // if(this.formInline.city){
                //     params.titlec = this.formInline.city;
                // }
                //  if(this.formInline.create_start){
                //     params["create_start"]= this.formInline.create_start.format('yyyy-MM-dd');
                // }

                // if(this.formInline.create_end){
                //     params["create_end"]= this.formInline.create_end.format('yyyy-MM-dd');
                // }
                this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/api/v1/admin/banners',{params:params}
                    )
                    .then(response => {

                        let list = [];
                        this.list = response.data.data;
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
            uploadPic(e){
                let self = this;
                let config = {headers: { 'content-type': 'multipart/form-data'}};
                let file = e.target.files[0];
                this.$http.get('/api/v1/qiniu/token', {params: {Authorization: this.account.token} })
                     .then(function(res){
                         const config = {
                             headers: { 'content-type': 'multipart/form-data' }
                         };
                         let formData = new FormData();
                         formData.append('file',file );
                         formData.append('token', res.data.uptoken);
                         self.$http.post('http://up-z2.qiniup.com', formData, config)
                        .then(function(response) {
                            self.picList.push('http://' + res.data.domain + '/' + response.data.hash);
                        })
                        .catch(function(error) {
                           
                        });
                     });
            },
            toCreatSpace(){
                this.modal2 = true;
            },
            toDelete(index){
                this.modal3 = true;
                this.current_banner_id = this.list[index].id;
            },
            doDel(){
                this.modal_loading = true;
                let  params = {};
                this.$http.delete('/api/v1/admin/banners/' + this.current_banner_id, params)
                 .then(function(res){
                     this.modal_loading = false;
                     this.modal3 = false;
                     this.list = this.list.filter((item)=>{ return item.id != this.current_banner_id;});
                 });
                
            },
            toSubmit(){
                this.submiting = true;
                let params = {};
                if(this.picList.length){
                    params.banner_url =  this.picList[this.picList.length - 1];
                }
                this.$http.post('/api/v1/admin/banners', params)
                 .then(function(res){
                     this.submiting = false;
                 });

            }
        }
    };
</script>
