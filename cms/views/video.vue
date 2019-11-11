    <template>
    <div>
        <div style="overflow:hidden;background: #f5f7f9;padding-bottom:10px;padding-left:15px;">
            <!-- <Breadcrumb>
                <BreadcrumbItem to="/">赛事新闻</BreadcrumbItem>
                <BreadcrumbItem>新闻编辑</BreadcrumbItem>
            </Breadcrumb> -->
            <a  style="color: #777;">视频</a>&nbsp;/
            <a  style="color: #777;">编辑</a>
        </div>
        <div style="padding:20px;">
            <Form ref="formValidate"  :rules="ruleValidate" :model="formValidate" >
                    <FormItem  label="标题"  prop="title">
                        <Input type="text" placeholder="" v-model="formValidate.title"> </Input>
                    </FormItem>
                    <FormItem  label="视频">
                        <div class="ivu-input-wrapper ivu-input-type">
                            <Upload
                                ref="videoUpload"
                                type="drag"
                                name="file"
                                :data="uploadParams"
                                :default-file-list="defaultFileList"
                                :on-success="handleSuccess"
                                :format="['mp4']"
                                :on-preview ="handleView"
                                action="//upload-z2.qiniup.com/">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #FEA000"></Icon>
                                    <p>点击或者拖拽这里上传视频</p>
                                </div>
                            </Upload>
                        </div>
                    </FormItem>
                    <FormItem  label="介绍">
                        <Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="介绍..." v-model="formValidate.brief"></Input>
                    </FormItem> 
                    <FormItem  label="年份" prop="date">
                        <Select v-model="formValidate.date">
                            <Option v-for="item in dateList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>  
                     <FormItem  label="首页显示">
                        <div>
                            <RadioGroup v-model="formValidate.top">
                                <Radio label="1" value='1'>是</Radio>
                                <Radio label="0" value='0'>否</Radio>
                            </RadioGroup>
                        </div>
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
         <Modal title="View Video" v-model="visible">
            <video :src="videoName"  :poster="formValidate.poster" controls width="100%"> 
                <source type="video/mp4" :src="videoName">
            </video>
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
                  defaultFileList:[],
                  uploadParams:{},
                  formValidate: {
                      name: '',
                      src: '',
                      valid:'1',
                      top:0,
                      brief: '',
                      poster:'',
                      date: (new Date).getFullYear().toString()
                  },
                  ruleValidate: {
                      name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                      ],
                      date: [
                        { required: true, message: '请选择年份', trigger: 'change' }
                      ]
                  },
                  dateList:getDateList(),
                  visible:false,
                  videoName:'',
                  submiting: false,
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
              vid(){
                  return this.$route.query['id'];
              }
          },
          mounted() {
              this.getUptoken();
              this.uploadList = this.$refs.videoUpload.fileList;
              if(this.vid){
                  this.getVideo();
              }
          },
          methods: {
              getUptoken(){
                  this.$http.get('/shcenter/api/qiniu/uptoken?uptype=video', {})
                .then(function(res){
                    this.uptoken =  res.data.uptoken;
                    this.domain = res.data.domain;
                    this.uploadParams = {token: res.data.uptoken};
                });
              },
              getVideo(){
                  this.spinLoadingText = 'Loading';
                  this.$Spin.show(this.spinConfig);
                  this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/sport/video/find',{params: {id: this.vid}}
                )
                .then(response => {
                    let res = response.data;
                    this.formValidate.title = res.video.title;
                    this.formValidate.brief = res.video.brief;
                    this.formValidate.src = res.video.src;
                    this.formValidate.poster = res.video.poster;
                    this.formValidate.date = res.video.date;
                    this.formValidate.valid = res.video.valid +　'';
                    this.formValidate.top = res.video.top  +　'';
                    if(this.formValidate.src){
                        this.defaultFileList.push({
                            name: '已传视频',
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
                  this.videoName = file.url;
                  this.visible = true;
              },
              handleRemove (file) {
                  const fileList = this.$refs.videoUpload.fileList;
                  this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);

              },
              handleSuccess (res, file) {

                  file.url = 'http://' + this.domain + '/' + res.key;
             
                  if(this.$refs.videoUpload.fileList.length > 1){
                      this.$refs.videoUpload.fileList.splice(0, 1);
                  }
                  this.spinLoadingText = '上传处理中';
                  this.$Spin.show(this.spinConfig);
                  this.getVideoStatus(res.persistentId).then((response)=>{
                      this.formValidate.src =  'http://' + this.domain + '/' + response.src;
                      this.formValidate.poster = 'http://' + this.domain + '/' + response.poster;
                      this.$refs.videoUpload.fileList[0].url =  this.formValidate.src;
                      this.$Spin.hide();

                  });
              },
              getVideoStatus(persistentId){    
                  let self = this;
                  return new Promise((resolve,reject)=>{
                      let polling = (persistentId)=>{
                          self.$http.get('/shcenter/api/qiniu/prefop?persistentId=' + persistentId)
                        .then(function(response) {
                            let res = response.data || {};
                            if(res.code == 0  || res.code == 4){
                                resolve({'src':res.items[0].key,'poster':res.items[1].key});
                            }
                            if(res.code == 3){
                                self.$Message.error('上传失败!');
                                reject(0);
                            }
                            if(res.code == 2 || res.code == 1){
                                setTimeout(()=>{polling(persistentId);},1000);
                            }
                        }).catch(function(error) {
                            self.$Message.error('上传失败!');
                            reject(error);
                        });
                      };
                      polling(persistentId);
                  });
              },
              handleSubmit(){
                  this.$refs.formValidate.validate((valid) => {
                      if (valid) {
                          if(!this.vid) {
                              if(this.uploadList.length == 0){
                                  this.$Message.error('请上传视频');
                                  return;
                              }
                              this.doCreate();
                          }
                          if(this.vid) {
                              this.doUpdate();
                          }
                      }
                  });
              },
              doCreate(){
                  this.submiting = true;
                  let params =  Object.assign({},this.formValidate);
                  this.$http.post('/shcenter/api/sport/video/add',params)
                   .then(response => {
                       this.submiting = false;
                       this.$router.push({path:'/sport',query:{tab:'videoes'}});
                   })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status == 403){
                        this.$Message.error('无操作权限!');
                    }
                });
              },
              doUpdate(){
                  let params = Object.assign({id:this.vid},this.formValidate);
                  this.submiting = true;
                  this.$http.post('/shcenter/api/sport/video/update',params)
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
    .quill-editor {
       height: 400px;
       margin-bottom: 20px;
    }
</style>