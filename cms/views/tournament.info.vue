<template>
    <div>
        <div style="overflow:hidden;background: #f5f7f9;padding-bottom:10px;padding-left:15px;">
            <!-- <Breadcrumb>
                <BreadcrumbItem to="/">赛事新闻</BreadcrumbItem>
                <BreadcrumbItem>新闻编辑</BreadcrumbItem>
            </Breadcrumb> -->
            <a  style="color: #777;">赛事信息</a>&nbsp;/
            <a  style="color: #777;">编辑</a>
        </div>
        <div style="padding:20px;">
            <Form r ref="formValidate" :model="formValidate" :rules="ruleValidate"  >
                    <FormItem  label="标题（中）" prop="title">
                        <Input type="text" placeholder="" v-model="formValidate.title"></Input>
                    </FormItem>
                     <FormItem  label="标题（英）"  prop="title_en">
                        <Input type="text" placeholder="" v-model="formValidate.title_en"></Input>
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
        <div>
            
        </div>
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
                    content_en: ''
                },
                ruleValidate: {
                    title: [
                    { required: true, message: '请输入中文标题', trigger: 'blur' }
                    ],
                    title_en: [
                    { required: true, message: '请输入英文标题', trigger: 'blur' }
                    ],
                },
                submiting: false,
                defaultFileList: [],
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
                },
            };
        },
        computed: {
            infoId(){
                return this.$route.query['id'];
            }
        },
        created(){
            this.getUptoken();
        },
        mounted() {
            if(this.infoId){
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
                        '/shcenter/api/race/info/find',{params: {id: this.infoId}}
                )
                .then(response => {
                    let res = response.data;
                    this.formValidate.title = res.result.title;
                    this.formValidate.title_en = res.result.title_en;
                    this.formValidate.content = res.result.content;
                    this.formValidate.content_en = res.result.content_en;
                    this.$Spin.hide();
                })
                .catch(() => {
                    this.$Spin.hide();
                });
            },
            onEditorBlur(quill) {
               
            },
            onEditorFocus(quill) {
              
            },
            onEditorReady(quill) {
               
            },
            onEditorChange({ quill, html, text }) {
              
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
                        if(!this.infoId) {
                            this.doCreate();
                        }
                        if(this.infoId) {
                            this.doUpdate();
                        }
                    }
                });
            },
            doCreate(){
                this.submiting = true;
                let params =  Object.assign({},this.formValidate);
                this.$http.post('/shcenter/api/race/info/add',params)
                   .then(response => {
                       this.submiting = false;
                       this.$router.push('/tournament');
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
                let params = Object.assign({id:this.infoId},this.formValidate);
                this.$http.post('/shcenter/api/race/info/update',params)
                   .then(response => {
                       this.submiting = false;
                       this.$Message.info('更新成功');

                   })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status == 403){
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