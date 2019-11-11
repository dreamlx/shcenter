<template>
    <div v-if="!loading">
        <div v-if="!hasEnrolled">
           <!--  <div class="nav-wrapper">
                <ul class="nav-list">
                    <li v-for="(n,index) in  navs" :class="[{active: currentView == n.key }]" @click="navClick(index)"><a class="c-menu-skew"><span>{{$t(n.label)}}</span></a></li>
                </ul>
            </div> -->
            <div class="race-list" v-if="!hasSelectd">
                <div class="race">
                    <div>
                        <div class="name">
                            外企德科·2019上海中心国际垂直马拉松赛
                        </div>
                         <div class="date">
                            赛事报名时间：10.16-11.11
                        </div>
                    </div>
                    <div>
                        <c-button  class="c-button"  @click="handleRaceSelectd" >
                            <span>{{$t('立即报名')}}</span>
                         </c-button>
                    </div>
                </div>
            </div>
            <div class="form-wrapper" v-if="hasSelectd">
                <div  class="group-list">
                     <div  @click="setGroup(0)" :class="['group',{active: groupIndex == 0 }]">
                         <div>{{$t('个人全程赛')}}</div>
                         <div>{{$t('报名费')}}180元&nbsp;&nbsp;<br/>{{$t('限个人报名')}}</div>
                     </div>
                    <div  @click="setGroup(2)" :class="['group',{active: groupIndex == 2 }]">
                         <div>{{$t('个人登高体验活动')}}</div>
                         <div>{{$t('报名费')}}160元&nbsp;&nbsp;<br/>{{$t('限个人报名')}}</div>
                     </div>
                     <div   :class="['group disable',{active: groupIndex == 1 }]">
                         <div>{{$t('团队组')}}</div>
                         <div>团体接力赛（报名请致电组委会）<br/>
                            如果需要报名，请致电组委会<br/>
                            021-68826560 5人一组 报名<br/>
                            团体接力赛需要提交6名选手信息<br/>
                            5名为正式选手，1名替补选手
                         </div>
                     </div>
                    </div>

                    <div style="width:15rem;margin:20px auto;">
                        <div v-if=" groupIndex == 0 || groupIndex == 2">
                            <sign-form :isHost='false'  :needsUpload='groupIndex == 0'></sign-form>
                        </div>
                        <div v-if=" groupIndex == 1"  >
                            <sign-form :isHost='true' :needsUpload='false'></sign-form>
                            <div class="caption">{{$t('队员')}}&nbsp;1</div>
                            <sign-form></sign-form>
                            <div class="caption">{{$t('队员')}}&nbsp;2</div>
                            <sign-form></sign-form>
                            <div class="caption">{{$t('队员')}}&nbsp;3</div>
                            <sign-form></sign-form>
                            <div class="caption">{{$t('队员')}}&nbsp;4</div>
                            <sign-form></sign-form>
                           
                        </div>
                         <div style="text-align:center">
                              <c-button  @click="handleValidate">
                                <span>{{$t('提交报名')}}</span>
                            </c-button>
                        </div>
                    </div>
            </div>
        </div>
        <div class="enroll-success-block" v-if="hasEnrolled">
            <div class="form-wrapper " >
                <c-mascot message='恭喜你，提交成功，等待抽签...'></c-mascot>
                <c-button  @click="toResult()">
                    <span>{{$t('前往报名查询')}}</span>
                </c-button>
            </div>
       </div>
    </div>
</template>
<script>
    import CButton from '@/components/c-button';
    import CMascot from '@/components/c-mascot';
    import Util from '@/lib/util';
    import Emitter from '@/lib/emitter';
    import SignForm from './sign-form';
    export default {
        componentName: 'signComponent',
        components: {
            CButton,
            CMascot,
            SignForm
        },
        mixins: [Emitter],
        data() {
            return {
                currentView:'sign',
                loading: true,
                groupIndex: 0,
                hasEnrolled: false,
                hasSelectd: false,
                navs:[{
                    label:'案情详情',
                    key:'detail'
                },{
                    label:'报名',
                    key:'sign'
                }],
                isFormValid: true
            };
        },
        computed: {
           
        },
        watch:{
            groupIndex(){
                this.broadcast('signFormComponent', 'reset');
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
            getResult(){
                this.$http.post('/shcenter/api/enroll/result',{token: this.$localStorage.get('token')})
                .then(function(res){
                    this.loading = false;
                    if(res.data.enroll_info.list.length > 0){
                        this.hasEnrolled = true;
                    }
                })
                .catch((response)=>{
                    if(response.status == 403){
                        this.$Message.error('无操作权限!');
                    }
                });
            },
            setGroup(index){
                this.groupIndex = index;
            },
            navClick(index){
                this.currentView = this.navs[index].key;
            },
            toResult(){
                this.$router.push('/enroll/query');
            },
            handleRaceSelectd() {
                this.hasSelectd = true;
            },
            handleValidate(){
                this.isFormValid = true;
                this.athletes = [];
                this.broadcast('signFormComponent', 'validate');
            },
            handleSubmit: Util.debounce(function(){
                if(!this.isFormValid){
                    return;
                }
                this.$http.post('/shcenter/api/enroll',{athletes: this.athletes, groupIndex:this.groupIndex == 0 ? 1 : 3 ,  token: this.$localStorage.get('token')})
                .then(function(res){
                    if(res.data.code != 0){
                        this.showAlertMsg = true ;    
                        this.alertMsg = res.data.msg ;                      
                    }
                    if(res.data.code == 0){
                        this.hasEnrolled = true;
                    }
                })
                .catch((response)=>{
                    this.submiting = false;
                    if(response.status == 403){
                        this.$Message.error('无操作权限!');
                    }
                });
            },300)
        }
    };
</script>

<style scoped>
   
    .nav-wrapper{
        text-align: center;
    }
    .form-wrapper{
        margin:  auto;
        margin-top: .625rem;
    }
    .group-list{
        text-align: center;
        display: flex;
        justify-content: center;
    }
  
    .group-list .group{
        width: 6rem;
        margin-bottom: 20px;
        cursor: pointer;
        margin-right: 10px;
    }
    .group-list .group>div:first-child{
        height: 1.15rem;
        line-height: 1.15rem;
        text-align: center;
        background-color: #B1B1B1;
        font-size: 16px;
        color: #fff
    }
    .group-list .group>div:last-child{
      
        line-height:  16px;
        padding: 10px 0; 
        text-align: center;
        font-size: 14px;
        color: #B1B1B1;
        border: 1px solid #B1B1B1;

    }
    .group-list .active >div:first-child{
        background-color: #FEA000;
        font-size: 16px;
        color: #fff
    }
     .group-list .active >div:last-child{
        border: 1px solid #FEA000;
        color: #FEA000
    }
    .group.disable {
        cursor:not-allowed;
    }

    .caption{
        font-size: 15px;
        font-weight: bold;
        color: #FEA000;
        position: relative;
        padding-left: 20px;
        margin-bottom: .6rem
    }
    .caption:before{
        content: "";
        display: block;
        width: 6px;
        height: 20px;
        background: #FEA000;
        position: absolute;
        left:0
    }

    .enroll-success-block{
        width: 8.1rem;
        margin: .8rem auto;
    }

    .race {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10vw;
    }
    .race .name {
        color: #FF9600;
        font-size: 22px;
    }
    .race  .c-button {
        width: 3.9rem;
    }

</style>

