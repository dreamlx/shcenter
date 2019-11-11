<template>
    <div>
        <div style="overflow:hidden;background: #f5f7f9;padding-bottom:10px;padding-left:15px;">
            <a  style="color: #777;">banner</a>&nbsp;/
            <a  style="color: #777;">编辑</a>
        </div>
        <div style="padding:20px;">
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" >
                    <FormItem  label="标题" prop="title">
                        <Input type="text" placeholder="" v-model="formValidate.title"></Input>
                    </FormItem>
                    <FormItem  label="banner图片">
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
                                action="//upload-z2.qiniup.com/">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #FEA000"></Icon>
                                    <p>点击或者拖拽这里上传banner</p>
                                </div>
                            </Upload>
                        </div>
                    </FormItem>
                    <FormItem  label="链接">
                        <Input type="text" placeholder="" v-model="formValidate.link"></Input>
                    </FormItem>      
                    <FormItem  label="是否显示">
                        <div>
                            <RadioGroup v-model="formValidate.valid" >
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
            return {
                show: '是',
                submiting: false,
                uploadParams:{},
                uploadHeaders:{'content-type': 'multipart/form-data'},
                formValidate:{
                    valid:'1',
                    link: '',
                    title:'',
                    src:'',
                    name:''
                },
                ruleValidate: {
                    title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                },
                defaultFileList: [],
                imgName:'',
                visible:false,
                uploadList:[]
            };
        },
        computed: {
            bid(){
                return this.$route.query['id'];
            }
        },
        mounted() {
            if(this.bid){
                this.getBanner();
            }
            this.uploadList = this.$refs.bannerUpload.fileList;
            this.$http.get('/shcenter/api/qiniu/uptoken', {})
            .then(function(res){
                this.uploadParams = {token: res.data.uptoken};
                this.domain = res.data.domain;
            });
        },
        methods: {
            getBanner(){
                this.$Spin.show({
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
                this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/sport/banner/find',{params: {id: this.bid}}
                )
                .then(response => {
                    let res = response.data;
                    this.formValidate.title = res.banner.title;
                    this.formValidate.name = res.banner.name;
                    this.formValidate.link = res.banner.link;
                    this.formValidate.src = res.banner.src;
                    if(this.formValidate.src){
                        this.defaultFileList.push({
                            name: this.formValidate.name,
                            url: this.formValidate.src
                        });
                    }
                    this.$Spin.hide();
                })
                .catch(() => {
                    this.$Spin.hide();
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
                this.formValidate.name = file.name;
            },
            handleSubmit(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        if(!this.bid) {
                            if(this.uploadList.length == 0){
                                this.$Message.error('请上传banner');
                                return;
                            }
                            this.doCreate();
                        }
                        if(this.bid) {
                            this.doUpdate();
                        }
                    }
                });
            },
            doCreate(){
                //let params =  Ob
                this.submiting = true;
                this.$http.post('/shcenter/api/sport/banner/add',this.formValidate )
                .then(function(res){
                    this.submiting = false;
                    this.$Message.info('创建成功');
                    this.$router.push('/?tab=banners');
                })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status === 403){
                        this.$Message.error('无操作权限!');
                    }
                });
            },
            doUpdate(){
                //let params =  Ob
                let params = Object.assign({id:this.bid},this.formValidate);
                this.submiting = true;
                this.$http.post('/shcenter/api/sport/banner/update',params)
                .then(function(res){
                    this.submiting = false;
                    this.$Message.info('更新成功');
                })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status === 403){
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
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>