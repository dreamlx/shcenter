<template>
    <div>
        <div style="overflow:hidden;background: #f5f7f9;padding-bottom:10px;padding-left:15px;">
            <!-- <Breadcrumb>
                <BreadcrumbItem to="/">赛事新闻</BreadcrumbItem>
                <BreadcrumbItem>新闻编辑</BreadcrumbItem>
            </Breadcrumb> -->
            <a  style="color: #777;">招商信息</a>&nbsp;/
            <a  style="color: #777;">编辑</a>
        </div>
        <div style="padding:20px;">
            <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" >
                    <FormItem  label="标题（中）" prop="title">
                        <Input type="text" placeholder=""  v-model="formValidate.title">
                        </Input>
                    </FormItem>
                     <FormItem  label="标题（英）" prop="title_en">
                        <Input type="text" placeholder="" v-model="formValidate.title_en">
                        </Input>
                    </FormItem>
              
                    <FormItem  label="Banner">
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
                                    <p>点击或者拖拽这里上传Banner</p>
                                </div>
                            </Upload>
                        </div>
                    </FormItem>
                    <FormItem  label="招商简介（中）">
                        <div class="ivu-input-wrapper ivu-input-type">
                            <quill-editor v-model="formValidate.content"
                                        ref="myQuillEditor"
                                        :options="editorOption"
                                        @blur="onEditorBlur($event)"
                                        @focus="onEditorFocus($event)"
                                        @ready="onEditorReady($event)"
                                        >
                             </quill-editor>
                        </div>
                    </FormItem>
                    <FormItem  label="招商简介（英）">
                        <div class="ivu-input-wrapper ivu-input-type">
                            <quill-editor v-model="formValidate.content_en"
                                        ref="myQuillEditor"
                                        :options="editorOption"
                                        @blur="onEditorBlur($event)"
                                        @focus="onEditorFocus($event)"
                                        @ready="onEditorReady($event)"
                                        
                                        style="min-height:400px;"

                                        >
                             </quill-editor>
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

    import {quillEditor, Quill} from 'vue-quill-editor';
    import {container, ImageExtend, QuillWatch} from '../lib/quill-image-extend-module';
    Quill.register('modules/ImageExtend', ImageExtend);
  
    export default {
        data () {
            return {
                uploadParams:{},
                editorOption: {
                    modules: {
                        ImageExtend: {
                            loading: true,
                            name: 'file',
                            action: '//upload-z2.qiniup.com/' ,
                            response: (res) => {
                                return 'http://' + this.domain + '/' + res.key;
                            },
                            change: (xhr, formData) => {
                                formData.append('token', this.uptoken);
                            } // 可选
                        },
                        toolbar: {
                            container: container,
                            handlers: {
                                'image': function () {
                                    QuillWatch.emit(this.quill.id);
                                }
                            }
                        }
                    }
                },
                formValidate: {
                    title: '',
                    title_en: '',
                    content: '',
                    content_en: '',
                    banner:'',
                    date:'2018'
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '请输入中文标题', trigger: 'blur' }
                    ],
                    title_en: [
                        { required: true, message: '请输入英文标题', trigger: 'blur' }
                    ]
                },
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
                },
                imgName:'',
                visible:false,
                uploadList:[],
                defaultFileList:[],
                submiting:false
            };
        },
        computed: {
            investmentId(){
                return this.$route.query['id'];
            }
        },
        mounted() {
            this.getUptoken();
            this.uploadList = this.$refs.bannerUpload.fileList;
            if(this.investmentId){
                this.getDetail();
            }
        },
        methods: {
            getUptoken(){
                this.$http.get('/shcenter/api/qiniu/uptoken', {})
                .then(function(res){
                    this.uptoken =  res.data.uptoken;
                    this.domain = res.data.domain;
                    this.uploadParams = {token: res.data.uptoken};
                });
            },
            getDetail(){
                this.spinLoadingText = 'Loading';
                this.$Spin.show(this.spinConfig);
                this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/sport/investment/find',{params: {id: this.investmentId}}
                )
                .then(response => {
                    let res = response.data;
                    this.formValidate.title = res.investment.title;
                    this.formValidate.title_en = res.investment.title_en;
                    this.formValidate.banner = res.investment.banner;
                    this.formValidate.content = res.investment.content;
                    this.formValidate.content_en = res.investment.content_en;
               
                    if(this.formValidate.banner){
                        this.defaultFileList.push({
                            name: '已传banner',
                            url: this.formValidate.banner
                        });
                    }
                    this.$Spin.hide();
                })
                .catch(() => {
                    this.$Spin.hide();
                });
            },
            onEditorBlur(quill) {
                //console.log('editor blur!', quill)
            },
            onEditorFocus(quill) {
               // console.log('editor focus!', quill)
            },
            onEditorReady(quill) {
               // console.log('editor ready!', quill)
            },
            onEditorChange({ quill, html, text }) {
                //console.log('editor change!', quill, html, text)
                //this.content = html
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
                this.formValidate.banner =  file.url;
            },
            handleSubmit(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        if(!this.investmentId) {
                            // if(this.uploadList.length == 0){
                            //     this.$Message.error('请上传banner');
                            //     return;
                            // }
                            this.doCreate();
                        }
                        if(this.investmentId) {
                            this.doUpdate();
                        }
                    }
                });
            },
            doCreate(){
                this.submiting = true;
                let params =  Object.assign({},this.formValidate);
                this.$http.post('/shcenter/api/sport/investment/add',params)
                   .then(response => {
                       this.submiting = false;
                       this.$router.push({path:'/sport',query:{tab:'investment'}});
                   })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status == 403){
                        this.$Message.error('无操作权限!');
                    }
                });
            },
            doUpdate(){
                let params = Object.assign({id:this.investmentId},this.formValidate);
                this.submiting = true;
                this.$http.post('/shcenter/api/sport/investment/update',params)
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