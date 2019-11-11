<template>
	<div>
	   <Form  ref="formValidate" :model="formValidate"  :rules="rules"  label-position="left" class="enroll-from">
	   		<FormItem  :label='$t("队名")'  class="c-label" prop="team_name" v-if="isHost">
                <c-input v-model="formValidate.team_name" placeholder="" class="c-input"></c-input>
            </FormItem>
            <FormItem  :label='$t("队长姓名")'  class="c-label" prop="captain" v-if="isHost">
                <c-input v-model="formValidate.captain" placeholder="" class="c-input"></c-input>
            </FormItem>
            <FormItem :label='$t("姓名")' class="c-label" prop="athlete_name" v-if="!isHost">
                <c-input v-model="formValidate.athlete_name" placeholder="" class="c-input"></c-input>
            </FormItem>
            <FormItem :label='$t("证件")' class="c-label" prop="identity_type">
                <select v-model="formValidate.identity_type" style="width:100%" placeholder="" class="ivu-select">
                    <Option value="0">{{$t('身份证')}}</Option>
                    <Option value="1">{{$t('护照')}}</Option>
                    <Option value="2">{{$t('台胞证')}}</Option>
                    <Option value="3">{{$t('港澳通行证')}}</Option>
                </select>
            </FormItem>
            <FormItem :label='$t("证件")' class="c-label" prop="identity_number">
                <c-input v-model="formValidate.identity_number" placeholder="" class="c-input"></c-input>
            </FormItem>
            <FormItem :label='$t("性别")' class="c-label" prop="gender">
                 <select v-model="formValidate.gender" style="width:100%" placeholder="" class="ivu-select">
                    <Option value="male">{{$t('男')}}</Option>
                    <Option value="female">{{$t('女')}}</Option>
                </select>
                <!-- <c-radio-group v-model="formValidate.gender">
                    <c-radio label="male">{{$t("男")}}</c-radio>
                    <c-radio label="female">{{$t("女")}}</c-radio>
                </c-radio-group> -->
            </FormItem>
            <FormItem   :label='$t("生日")'  class="c-label" prop="birth">
                   <c-input v-model="formValidate.birth" placeholder="" class="c-input" type='date'></c-input>
            </FormItem>
            <FormItem   :label='$t("手机号码")' class="c-label" prop="phone">
                 <c-input v-model="formValidate.phone" placeholder="" class="c-input"></c-input>
            </FormItem>
            <FormItem  :label='$t("紧急联系人")'  class="c-label" prop="emergency_contact_name" >
                 <c-input v-model="formValidate.emergency_contact_name" placeholder="" class="c-input"></c-input>
            </FormItem>
             <FormItem   :label='$t("紧急联系人电话")'  class="c-label" prop="emergency_contact_phone">
                 <c-input v-model="formValidate.emergency_contact_phone" placeholder="" class="c-input"></c-input>
            </FormItem>
             <FormItem  :label='$t("衣服尺寸")' c class="c-label" prop="dress_size">
                <select v-model="formValidate.dress_size" style="width:100%" placeholder="" class="ivu-select">
                     <Option v-for="item in dress_size_list" :value="item.value" :key="item.value">{{ item.label}}</Option>
                </select>
            </FormItem>
            <FormItem  :label='$t("上传完赛证明")' class="c-label" v-if="needsUpload" prop="certificate_url" >
                <div class="upload-placeholder">
                    <c-input v-model="formValidate.certificate_url" placeholder="" class="c-input">
                            <div slot="append" icon="ios-search">
                               <button type="button" class="ivu-btn ivu-btn-default ivu-btn-icon-only"><!----> <i class="ivu-icon ivu-icon-ios-cloud-upload-outline"></i> <!----></button>
                            </div>
                    </c-input>
                    <input type="file"  class="upload-fileholder needsclick"  @change='handleUpload($event)'/>
                </div>
            </FormItem>
        </Form>
	</div>
</template>
<script>
    import Emitter from '../../lib/emitter';
    export default {
        name: 'enrollFormComponent',
        components: {
          
        },
        props:{
        	isHost:{
        		type: Boolean,
        		default: false
        	},
        	needsUpload:{
        		type: Boolean,
        		default: false
        	}
        },
        mixins: [Emitter],
        data() {

            const validateAthleteName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请填写姓名')));
                    return ;
                } 
                callback();
            };

            const validateIdentityType = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请选择证件类型')));
                    return ;
                } 
                callback();
            };

            const validateIdentityNumber = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请填写证件编号')));
                    return ;
                } 
                callback();
            };

            const validateGender = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请选择性别')));
                    return ;
                } 
                callback();
            };

            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请填写手机号')));
                    return ;
                } 
                if(!(/^1[345678]\d{9}$/.test(value))){ 
                    callback(new Error(this.$t('手机号码格式有误')));
                    return ;
                } 
                callback();
            };

            const validateBirth = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请选择生日')));
                    return ;
                } 
                callback();
            };

            const validateDressSize = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请选择衣服尺寸')));
                    return ;
                } 
                callback();
            };

            const validateEmergencyContact = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请填写紧急联系人')));
                    return ;
                } 
                callback();
            };

            const validateEmergencyPhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请填写紧急联系人电话')));
                    return ;
                } 
                callback();
            };

            const validateTeamName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请填写队名')));
                    return ;
                } 
                callback();
            };

            const validateCaptain = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('请填写队长姓名')));
                    return ;
                } 
                callback();
            };

            const validateCertificate  = (rule, value, callback) => {
                if(this.certificate_formated_error){
                    callback(new Error(this.$t('完赛证明文件格式不正确')));
                    return ;
                }
                if (value === '') {
                    callback(new Error(this.$t('请上传完赛证明')));
                    return ;
                } 
                callback();
            };
            const validateIdentity  = (rule, value, callback) => {
                callback();
            };

            return {
                dress_size_list:[
                    {'value': 'S','label':'S','size_number': '155/80A'},
                    {'value': 'M','label':'M','size_number': '160/84A'},
                    {'value': 'L','label':'L','size_number': '165/88A'},
                    {'value': 'XL','label':'XL','size_number': '170/92A'},
                    {'value': 'XXL','label':'XXL','size_number': '175/96A'},
                    {'value': 'XXXL','label':'XXXL','size_number': '180/100A'}
                ],
                formValidate: {
                    athlete_name: '',
                    identity_type: '',
                    identity_number: '',
                    gender: '',
                    birth:'',
                    emergency_contact_name: '',
                    emergency_contact_phone: '',
                    dress_size:'',
                    identity:'',
                    team_name: '',
                    captain:'',
                    phone: '',
                    certificate_url: '',
                },
                certificate_formated_error: false,
                rules: {
                	team_name: [
                		//{ required: true, message: '请填写队名', trigger: 'blur' }
                        {required: true, validator: validateTeamName, trigger: 'blur' }
                	],
                	captain:[
                		//{ required: true, message: '请填写队长姓名', trigger: 'blur' }
                        {required: true, validator: validateCaptain, trigger: 'blur' }
                	],
                    athlete_name: [
                       { required: true,validator: validateAthleteName, trigger: 'blur' }
                    ],
                    identity: [
                		{ required: true, validator: validateIdentity, trigger: 'blur' }
                	],
                    identity_type: [
                        { required: true,validator: validateIdentityType, trigger: 'change' }
                    	// { required: true, message: '请选择证件类型', trigger: 'change' }
                    ],
                    identity_number: [
                    	//{ required: true, message: '请填写证件编号', trigger: 'blur' }
                        { validator: validateIdentityNumber, trigger: 'blur' }
                    ],
                    gender: [
                    	//{ required: true, message: '请勾选性别', trigger: 'change' }
                        {required: true, validator: validateGender, trigger: 'change' }
                    ],
                    phone: [
                    	//{ required: true, message: '请填写手机号码', trigger: 'blur' }
                        {required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    birth: [
                        //{ required: true, type: 'date', message: '请填写生日', trigger: 'change' }
                        {required: true, validator: validateBirth, trigger: 'change' }
                    ],
                    dress_size: [
                    	//{ required: true, message: '请选择衣服尺寸', trigger: 'change' }
                        {required: true, validator: validateDressSize, trigger: 'change' }
                    ],
                    emergency_contact_name: [
                   		//{ required: true, message: '请填写紧急联系人', trigger: 'blur' }
                        {required: true, validator: validateEmergencyContact, trigger: 'blur' }
                    ],
                    emergency_contact_phone: [
                   		//{ required: true, message: '紧急联系人电话', trigger: 'blur' }
                        {required: true, validator: validateEmergencyPhone, trigger: 'blur' }
                    ],
                    certificate_url:[
                        {required: true, validator: validateCertificate, trigger: 'blur' }
                    ],
                },
                uploadParams:{},
                uploading: false
            };
        },
        computed: {
           
        },
        watch:{
            uploading(val){
                if(val){
                    this.$emit('onFileUploading');
                }
                if(!val){
                    this.$emit('onFileUploadComplete');
                }
            }
        },
        created() {
            if(this.needsUpload){
                this.getUptoken();
            }
        },
        mounted(){
            this.$on('validate',()=>{
                this.handleValidate();
            });
            this.$on('reset',()=>{
                this.$refs.formValidate.resetFields();
            });
        },
        updated(){
        
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
            handleValidate(){
                
        	   	this.$refs.formValidate.validate((valid) => {
               
               let params = Object.assign({valid: valid ,is_captain:this.isHost},this.formValidate);
            //    params.birth =  this.formValidate.birth ? this.formValidate.birth.format('yyyy-MM-dd') : '';
        	   		this.dispatch('enrollComponent', 'afterValidate',params);
            	});
            },
            
            handleFormatError(file){
                // this.$Notice.warning({
                //     title: 'The file format is incorrect',
                //     desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                // });
                this.uploading = false;
                this.certificate_formated_error =  true;
                this.$refs.formValidate.validateField('certificate_url',(error)=>{});

            },
            handleUploadSuccess(res){
                this.uploading = false;
                this.certificate_formated_error = false;
                this.formValidate.certificate_url = 'http://' + this.domain + '/' + res.key;
            },
            handleUploadError(){
                this.uploading = false;
            },
            toNotice(){
                this.$router.push('/enroll/notice');
            },
            handleUpload(e){
                let config = {headers: { 'content-type': 'multipart/form-data'}},
                    file = e.target.files[0],
                    self = this;

                this.uploading = true;
                let formData = new FormData();
                formData.append('file',file );
                formData.append('token', this.uptoken);
                this.$http.post('//up-z2.qiniup.com', formData, config)
                    .then((res) =>{
                        this.formValidate.certificate_url = 'http://' + this.domain + '/' + res.key;
                        this.uploading = false;
                    })
                    .catch(function(error) {
                        this.uploading = false;
                    });
                  
            }
        }
    };
</script>
<style  scoped>
	.ivu-icon{
        font-size: 20px;
    }
   
    .size-info{
        cursor: pointer;
        color: #FEA000;
    }
    .size-info-list table{
        width: 100%;
    }
    .size-info-list td, .size-info-lis th{
        text-align: center;
    }
    .upload-placeholder{
        position: relative;
    }
    .upload-placeholder .upload-fileholder{
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        z-index: 2;
    }
</style>