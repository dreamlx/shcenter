<template>
    <div>
        <div class="m-channel-tabs" v-if="channel ==''">
            <!-- <c-button :disable='channel != "individual" ' @click="onTabClick('individual')" class="c-button"> 
                <span>个人全程赛</span>
            </c-button> -->
            <!-- <span class="separator"></span> -->
            <!-- <c-button :disable='channel != "individual1"' @click="onTabClick('individual1')" class="c-button"> <span>个人登高体验活动</span></c-button> -->
            <!-- <c-button :disable='channel != "individual2" '  class="c-button"> 
                <span>团队组</span>
            </c-button> -->
            <div class="tab" :class='["tab active",{"actived": channel == "individual"}]' @click="onTabClick('individual')">
                <div class="title">个人全程赛</div>
                <div class="body">报名费 180元 </div>
            </div>

             <div class="tab" :class='["tab active",{"actived": channel == "individual1"}]' @click="onTabClick('individual1')">
                <div class="title">个人登高体验活动</div>
                <div class="body">报名费 160元 </div>
            </div>
            <div class="tab" style="display:block">
                <div class="title">团体接力赛</div>
                <div class="body team"> 团体接力赛（报名请致电组委会）<br/>
                    如果需要报名，请致电组委会<br/>
                    021-68826560 5人一组 报名<br/>
                    团体接力赛需要提交6名选手信息<br/>
                    5名为正式选手，1名替补选手
                </div>
            </div>
            <!-- <div  class="team">团体接力赛（报名请致电组委会）<br/>
                            如果需要报名，请致电组委会<br/>
                            021-68826560 5人一组 报名<br/>
                            团体接力赛需要提交6名选手信息<br/>
                            5名为正式选手，1名替补选手
                         </div> -->
        </div>
        
        <div v-if='channel == "individual" || channel == "individual1"' style="margin-top: 30px;">
            <enroll-form :isHost='false' :needsUpload='channel == "individual"' :key='1' 
                @onFileUploading="handleFileUploading" 
                @onFileUploadComplete="handleFileUploadComplete">
            </enroll-form>
        </div>
        <div v-if='channel == "team"'  >
            <enroll-form :isHost='true' :needsUpload='false' :key='2'></enroll-form>
            <div class="caption">{{$t('队员')}}&nbsp;1</div>
            <enroll-form :key='3'></enroll-form>
            <div class="caption">{{$t('队员')}}&nbsp;2</div>
            <enroll-form :key='4'></enroll-form>
            <div class="caption">{{$t('队员')}}&nbsp;3</div>
            <enroll-form :key='5'></enroll-form>
            <div class="caption">{{$t('队员')}}&nbsp;4</div>
            <enroll-form :key='6'></enroll-form>
        </div>
        <div style="text-align: center;" class="c-button-wrapper" v-if="channel !=''" >
            <c-button class="c-button" @click="handleClick"> <span>{{$t('提交报名')}}</span></c-button>
        </div>
        <c-loading :show='loading'></c-loading>
        <c-alert v-model="showAlertMsg" :buttonText='"确定"'>{{alertMsg}}</c-alert>
    </div>
</template>
<script>
    import Emitter from '../../lib/emitter';
    import Util from '../../lib/util';
    import EnrollForm from './enroll-form';
    export default {
        name: 'enrollComponent',
        components: {
            EnrollForm
        },
        mixins: [Emitter],
        data() {
            return {
                channel: '',
                loading: false,
                showAlertMsg: false,
                alertMsg: ''
            };
        },
        computed: {
          
        },
        watch:{
            channel(){
                this.broadcast('enrollFormComponent', 'reset');
            }
        },
        created() {
            this.getResult();
        },
        mounted(){
            this.$on('afterValidate',(params)=>{
                if(!params.valid){
                    this.isFormValid = false;
                }
                this.athletes.push(params);
                this.handleSubmit();
            });
        },
        methods: {
            handleClick(){
                this.isFormValid = true;
                this.athletes = [];
                this.broadcast('enrollFormComponent', 'validate');
            },
            onTabClick(channel){
                this.channel = channel;
            },
            handleFileUploading(){
                this.loading = true;
            },
            handleFileUploadComplete(){
                this.loading = false;
            },
            getResult(){
                this.loading = true;
                this.$http.post('/shcenter/api/enroll/result',{token: this.$localStorage.get('token')})
                .then(function(res){
                    let d = res.data.enroll_info;
                    this.loading = false;
                    // if(d.list.length > 0){
                    //     this.$router.push('/enroll/query');
                    // }
                })
                .catch((response)=>{
                    if(response.status == 403){
                        this.loading = false;
                    }
                });
            },
            handleSubmit: Util.debounce(function(){
                if(!this.isFormValid){
                    return;
                }
                this.loading = true;
                this.$http.post('/shcenter/api/enroll',{athletes: this.athletes, groupIndex: this.channel === 'individual' ? 1 : 3, token: this.$localStorage.get('token')})
                .then(function(res){
                    this.loading = false;
                    if(res.data.code != 0){
                        this.showAlertMsg = true ;    
                        this.alertMsg = res.data.msg ;                      
                    }
                    if(res.data.code == 0 ){
                        this.$router.push('/enroll/query');
                    }
                })
                .catch((response)=>{
                    this.loading = false;
                });
            },300)

        }
    };
</script>

<style scoped>
    .m-channel-tabs{
        text-align: center;
        padding: 20px 0;
    }
    .m-channel-tabs .separator{
        padding: 0 1px;
    }
    .c-button-wrapper .c-button{
        width: 100%;
    }
    .c-button-wrapper{
        margin:  0px 70px;
    }
    .c-button span{
       font-size: 40px;
    }
    
    .tab {
        margin: 80px 80px 40px;;
        display: flex
    }
    .tab .title {
        font-size: 40px;
        font-weight: bold;
        background: #b6b6b5;
        color: #fff;
        text-align: center;
        line-height: 200px;
        flex: 1

    } 

    .tab .body {
        border: 1px solid #b6b6b5;
        line-height: 200px;
        color: #b6b6b5;
        /* color: #FEA000; */
        font-size: 40px;
         flex: 1
    }
    .tab.active .title {
        background: #FEA000;
    }
    .tab.active .body {
        border-color: #FEA000;
        color: #FEA000
    }

    .tab .team {
        line-height: 50px;
        padding: 20px;
    }
    .caption{
        font-size: 40px;
        font-weight: bold;
        color: #FEA000;
        position: relative;
        padding-left: 40px;
        line-height: 40px;
        
    }
    .caption:before{
        content: "";
        display: block;
        width: 6px;
        background: #FEA000;
        position: absolute;
        left:20px;
        top:0px;
        bottom: 2px;
    }
    
</style>

