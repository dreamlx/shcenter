<template>
    <div>
        <div style="overflow:hidden;background: #f5f7f9;padding-bottom:10px;padding-left:15px;">
            <!-- <Breadcrumb>
                <BreadcrumbItem to="/">赛事新闻</BreadcrumbItem>
                <BreadcrumbItem>新闻编辑</BreadcrumbItem>
            </Breadcrumb> -->
            <a  style="color: #777;">赛事新闻</a>&nbsp;/
            <a  style="color: #777;">新闻编辑</a>
        </div>
        <div style="padding:20px;">
            <Form   ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <FormItem  label="标题（中）" prop="title">
                        <Input type="text" placeholder=""  v-model="formValidate.title"></Input>
                    </FormItem>
                     <FormItem  label="标题（英）"  prop="title_en">
                        <Input type="text" placeholder=""  v-model="formValidate.title_en"></Input>
                    </FormItem>
              
                    <FormItem  label="封面">
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
                                action="//upload-z2.qiniup.com">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #FEA000"></Icon>
                                    <p>点击或者拖拽这里上传封面</p>
                                </div>
                            </Upload>
                        </div>
                    </FormItem>
                    <FormItem  label="正文（中）">
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
                    <FormItem  label="正文（英）">
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
                    <FormItem  label="来源" prop="source">
                        <div>
                            <CheckboxGroup v-model="formValidate.source" @on-change="checkAllGroupChange">
                                <Checkbox label="原创">原创</Checkbox>
                                <Checkbox label="其他">其他</Checkbox>
                            </CheckboxGroup>
                        </div>
                    </FormItem>
                    <FormItem  label="" prop="source_other" v-if="formValidate.source.indexOf('其他')>-1" style="margin-top:-24px;">
                        <div>
                             <Input placeholder="请输入来源"  v-model="formValidate.source_other"></Input>
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
                    source: ['原创'],
                    source_other:'',
                    banner_src:'',
                    banner_name:''
                },
                ruleValidate: {
                    title: [
                    { required: true, message: '请输入中文标题', trigger: 'blur' }
                    ],
                    title_en: [
                    { required: true, message: '请输入英文标题', trigger: 'blur' }
                    ],
                    source_other: [
                    { required: true, message: '请输入其他来源', trigger: 'blur' }
                    ],
                    source: [
                    { required: true,type: 'array', min: 1, message: '请选择来源', trigger: 'change' }
                    ]
                },
                submiting: false,
                defaultFileList: [],
                visible:false,
                uploadList:[]
            };
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
            nid(){
                return this.$route.query['id'];
            }
        },
        watch:{
           
        },
        created(){
            this.getUptoken();
        },
        mounted() {
            if(this.nid){
                this.getNews();
            }
            this.uploadList = this.$refs.bannerUpload.fileList;
        },
        methods: {
            onEditorBlur(quill) {
                //console.log('editor blur!', quill)
            },
            onEditorFocus(quill) {
                //console.log('editor focus!', quill)
            },
            onEditorReady(quill) {
               // console.log('editor ready!', quill)
            },
            onEditorChange({ quill, html, text }) {
               // console.log('editor change!', quill, html, text)
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
                this.formValidate.banner_src =  file.url;
                this.formValidate.banner_name = file.name;
               
            },
            getNews(){
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
                        '/shcenter/api/sport/news/find',{params: {id: this.nid}}
                )
                .then(response => {
                    let res = response.data;
                    this.formValidate.title = res.news.title;
                    this.formValidate.title_en = res.news.title_en;
                    this.formValidate.content = res.news.content;
                    this.formValidate.content_en = res.news.content_en;
                    this.formValidate.banner_src = res.news.banner_src;
                    this.formValidate.banner_name = res.news.banner_name;
                    if(res.news.source != '原创'){
                        this.formValidate.source = ['其他'];
                        this.formValidate.source_other = res.news.source;
                    }
                    if(this.formValidate.banner_src){
                        this.defaultFileList.push({
                            name: this.formValidate.banner_name,
                            url: this.formValidate.banner_src
                        });
                    }

                    this.$Spin.hide();
                })
                .catch(() => {
                    this.$Spin.hide();
                });
            },
            checkAllGroupChange(data){
                if(data.length > 0 ){
                    this.formValidate.source = [data[data.length - 1]];
                }
            },
            getUptoken(){
                this.$http.get('/shcenter/api/qiniu/uptoken', {})
                .then(function(res){
                    this.uptoken =  res.data.uptoken;
                    this.domain = res.data.domain;
                    this.uploadParams = {token: res.data.uptoken};
                });
            },
            handleSubmit(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        if(!this.nid) {
                            if(this.uploadList.length == 0){
                                this.$Message.error('请上传banner');
                                return;
                            }
                            this.doCreate();
                        }
                        if(this.nid) {
                            this.doUpdate();
                        }
                    }
                });
            },
            doCreate(){
                this.submiting = true;
                let params =  Object.assign({},this.formValidate);
                params.source = params.source_other ||  params.source[0];
                this.$http.post('/shcenter/api/sport/news/add',params)
                   .then(response => {
                       this.submiting = false;
                       this.$router.push('/sport');
                   })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status == 403){
                        this.$Message.error('无操作权限!');
                    }
                });
            },
            doUpdate(){
                this.submiting = true;
                let params = Object.assign({id:this.nid},this.formValidate);
                params.source =  this.formValidate.source_other || this.formValidate.source[0];
                this.$http.post('/shcenter/api/sport/news/update',params)
                   .then(response => {
                       this.submiting = false;
                       this.$Message.info('更新成功');

                   })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status === 403){
                        this.$Message.error('无操作权限!');
                    }
                });
            },
        },
};
</script>
<style>
    .quill-editor {
       height: 400px;
       margin-bottom: 20px;
    }
</style>