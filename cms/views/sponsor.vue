<template>
    <div>
        <div style="overflow:hidden;background: #f5f7f9;padding-bottom:10px;padding-left:15px;">
            <a  style="color: #777;">赞助商</a>&nbsp;/
            <a  style="color: #777;">编辑</a>
        </div>
        <div style="padding:20px;">
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate"  >
                    <FormItem  label="名称"  prop="name">
                        <Input type="text" placeholder="" v-model="formValidate.name"></Input>
                    </FormItem>
                    <FormItem  label="LOGO">
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
                                    <p>点击或者拖拽这里上传LOGO</p>
                                </div>
                            </Upload>
                        </div>
                    </FormItem>
                    <FormItem  label="链接" prop="link">
                        <Input type="text" placeholder="" v-model="formValidate.link"></Input>
                    </FormItem>      
                    <FormItem  label="赞助商类型">
                        <div>
                            <RadioGroup v-model="formValidate.type">
                                <Radio label="一级赞助商">一级赞助商</Radio>
                                <Radio label="二级赞助商">二级赞助商</Radio>
                                <Radio label="赞助商">赞助商</Radio>
                                <Radio label="合作品牌">合作伙伴</Radio>
                                <Radio label="荣誉赞助品牌">国际授权单位</Radio>
                                <Radio label="独家冠名">组织架构</Radio>
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
                show: false,
                submiting: false,
                defaultFileList:[],
                uploadParams:{},
                formValidate: {
                    name: '',
                    link: '',
                    type: '一级赞助商',
                    logo: ''
                },
                ruleValidate: {
                    name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    link: [
                    { required: true, message: '请输入链接', trigger: 'blur' }
                    ]
                },
                imgName:'',
                visible:false,
                uploadList:[]
            };
        },
        computed: {
            sid(){
                return this.$route.query['id'];
            }
        },
        mounted() {
            this.getUptoken();
            this.uploadList = this.$refs.bannerUpload.fileList;
            if(this.sid){
                this.getSponsor();
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
            getSponsor(){
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
                        '/shcenter/api/sport/sponsor/find',{params: {id: this.sid}}
                )
                .then(response => {
                    let res = response.data;
                    this.formValidate.type = res.sponsor.type;
                    this.formValidate.name = res.sponsor.name;
                    this.formValidate.link = res.sponsor.link;
                    this.formValidate.logo = res.sponsor.logo;
                    if(this.formValidate.logo){
                        this.defaultFileList.push({
                            name: 'logo',
                            url: this.formValidate.logo
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
                this.formValidate.logo =  file.url;
                //this.formValidate.name = file.name;
                //console.log(file.name)
            },
            handleSubmit(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        if(!this.sid) {
                            if(this.uploadList.length == 0){
                                this.$Message.error('请上传banner');
                                return;
                            }
                            this.doCreate();
                        }
                        if(this.sid) {
                            this.doUpdate();
                        }
                    }
                });
            },
            doCreate(){
                this.submiting = true;
                let params =  Object.assign({},this.formValidate);
                this.$http.post('/shcenter/api/sport/sponsor/add',params)
                   .then(response => {
                       this.submiting = false;
                       this.$router.push({path:'/sport',query:{tab:'sponsors'}});
                   })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status == 403){
                        this.$Message.error('无操作权限!');
                    }
                });
            },
            doUpdate(){
                let params = Object.assign({id:this.sid},this.formValidate);
                this.submiting = true;
                this.$http.post('/shcenter/api/sport/sponsor/update',params)
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
            },
           
        },
};
</script>
<style>
   

</style>