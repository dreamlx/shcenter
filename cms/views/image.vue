<template>
    <div>
        <div style="overflow:hidden;background: #f5f7f9;padding-bottom:10px;padding-left:15px;">
            <!-- <Breadcrumb>
                <BreadcrumbItem to="/">赛事新闻</BreadcrumbItem>
                <BreadcrumbItem>新闻编辑</BreadcrumbItem>
            </Breadcrumb> -->
            <a  style="color: #777;">图片</a>&nbsp;/
            <a  style="color: #777;">编辑</a>
        </div>
        <div style="padding:20px;">
            <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <FormItem  label="标题" prop="title">
                        <Input type="text" placeholder="" v-model="formValidate.title"> </Input>
                    </FormItem>
                    <FormItem  label="图片">
                        <div class="ivu-input-wrapper ivu-input-type">
                            <Upload
                                ref="bannerUpload"
                                type="drag"
                                name="file"
                                :data="uploadParams"
                                :default-file-list="defaultFileList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :on-preview ="handleView"
                                action="http://upload-z2.qiniup.com">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #FEA000"></Icon>
                                    <p>点击或者拖拽这里上传图片</p>
                                </div>
                            </Upload>
                        </div>
                    </FormItem>
                    <FormItem  label="介绍（中）">
                        <Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="介绍..."  v-model="formValidate.brief"></Input>
                    </FormItem> 
                    <FormItem  label="介绍（英）">
                        <Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="intro..." v-model="formValidate.brief_en"></Input>
                    </FormItem> 
                    <FormItem  label="年份" prop="date">
                        <Select v-model="formValidate.date">
                            <Option v-for="item in dateList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>      
                    <FormItem  label="是否显示">
                        <div>
                             <RadioGroup v-model="formValidate.valid">
                                <Radio label="1" value='1'>是</Radio>
                                <Radio label="0" value='0'>否</Radio>
                            </RadioGroup>
                        </div>
                    </FormItem>

                    <FormItem  label="" class="ivu-form-btn-item">
                        <div style="width:100px;">
                            <Button type="primary"  :loading="submiting"  @click="handleSubmit('formInline')" long> 
                                <span v-if="!submiting">提交</span>
                                <span v-else>提交...</span>
                              </Button>
                        </div>
                    </FormItem>

             </Form>
        </div>
        <Modal title="View Image" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>  

    export default {
        data () {
            const getDateList = ()=>{
                var d = new Date, start = 2017, end = d.getFullYear() + 2, dateList = [];
                for(let i = start; i < end; i++){
                    dateList.push(i.toString());
                }
                return dateList;
            };
            return {
                uploadParams:{},
                formValidate: {
                    title: '',
                    brief: '',
                    brief_en: '',
                    src:'',
                    valid:'1',
                    date: (new Date).getFullYear().toString()
                },
                ruleValidate: {
                    title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    date: [
                    { required: true, message: '请选择年份', trigger: 'change' }
                    ]
                },
                dateList:getDateList(),
                submiting: false,
                defaultFileList: [],
                imgName:'',
                visible:false,
                uploadList:[],
                spinLoadingText: 'Loading',
                spinConfig:{
                    render: h => {
                        return h('div', [
                            h('Icon', {
                                class: 'demo-spin-icon-load',
                                props: {
                                    type: 'load-c',
                                    size: 18
                                }
                            }),
                            h('div', this.spinLoadingText)
                        ]);
                    }
                }
            };
        },
        computed: {
            pid(){
                return this.$route.query['id'];
            }
        },
        created(){
            
        },
        mounted() {
            this.getUptoken();
            this.uploadList = this.$refs.bannerUpload.fileList;
            if(this.pid){
                this.getDetail();
            }
        },
        methods: {
            getDetail(){
                this.spinLoadingText = 'Loading';
                this.$Spin.show(this.spinConfig);
                this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/sport/image/find',{params: {id: this.pid}}
                )
                .then(response => {
                    let res = response.data;
                    this.formValidate.title = res.image.title;
                    this.formValidate.brief = res.image.brief;
                    this.formValidate.brief_en = res.image.brief_en;
                    this.formValidate.src = res.image.src;
                    this.formValidate.date = res.image.date;
                    this.formValidate.valid = res.image.valid +　'';
                   
                    if(this.formValidate.src){
                        this.defaultFileList.push({
                            name: '查看图片',
                            url: this.formValidate.src
                        });
                    }
                    this.$Spin.hide();
                })
                .catch(() => {
                    this.$Spin.hide();
                });
            },
            getUptoken(){
                this.$http.get('/shcenter/api/qiniu/uptoken', {})
                .then(function(res){
                    this.uptoken =  res.data.uptoken;
                    this.domain = res.data.domain;
                    this.uploadParams = {token: res.data.uptoken};
                });
            },
            handleView (file) {
                this.imgName = file.url;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.bannerUpload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.url = 'http://' + this.domain + '/' + res.key;
                if(this.$refs.bannerUpload.fileList.length > 1){
                    this.$refs.bannerUpload.fileList.splice(0, 1);
                }
                this.formValidate.src =  file.url;
            },
            handleSubmit(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        if(!this.pid) {
                            if(this.uploadList.length == 0){
                                this.$Message.error('请上传banner');
                                return;
                            }
                            this.doCreate();
                        }
                        if(this.pid) {
                            this.doUpdate();
                        }
                    }
                });
            },
            doCreate(){
                //let params =  Ob
                this.submiting = true;
                this.$http.post('/shcenter/api/sport/image/add',this.formValidate )
                .then(function(res){
                    this.submiting = false;
                    this.$router.push({path:'/sport',query:{tab:'images'}});
                })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status == 403){
                        this.$Message.error('无操作权限!');
                    }
                });
            },
            doUpdate(){
                //let params =  Ob
                let params = Object.assign({id:this.pid},this.formValidate);
                this.submiting = true;
                this.$http.post('/shcenter/api/sport/image/update',params)
                .then(function(res){
                    this.submiting = false;
                    this.$Message.info('更新成功');
                })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status == 403){
                        this.$Message.error('无操作权限!');
                    }
                });
            }
        },
};
</script>
<style>
    .quill-editor {
       height: 400px;
       margin-bottom: 20px;
    }
</style>