<template>
    <div >
        <div v-if='!loading'>
            <div v-if="athletes.length == 0">
               <c-mascot message='Oops,您还未提交报名' :mascotType='2'></c-mascot>
               <div style=" text-align: center;">
                   <c-button @click="toRegister" class="c-button" >
                        <span>{{$t('立刻前往报名')}}</span>
                    </c-button>
                </div>
            </div>
            <div  v-if="athletes.length>0" class="result">
                <div class="mas-wrapper"  v-if="approve_status == '审核中'">
                    <c-mascot message='恭喜你 提交成功 等待抽签' ></c-mascot>
                </div>
                <table cellspacing="0" cellpadding="0">
                    <thead>
                        <tr><th colspan="2">确认报名信息</th></tr>
                    </thead>
                    <tr>
                        <td>姓名</td><td>{{athletes[0].athlete_name}}</td>
                    </tr>
                    <tr>
                        <td>证件号码</td><td>{{athletes[0].identity_number}}</td>
                    </tr>
                    <tr>
                        <td>电话</td><td>{{athletes[0].phone}}</td>
                    </tr>
                    <tr>
                        <td>报名组别</td>
                        <td>
                            <span v-if='group_type ==1 '>个人全程赛</span>
                            <span v-if='group_type ==3'>个人登高体验活动</span>
                            <span v-if='group_type ==2'>团队组</span>
                        </td>
                    </tr>
                    <tr>
                        <td>费用</td><td> {{amount}}</td>
                    </tr>
                     <tr v-if="pay_status">
                        <td>支付状态</td><td>{{pay_status}}</td>
                    </tr>
                </table>
                <div v-if="approve_status == '审核通过' &&  pay_status !='已支付' "  style=" text-align: center;margin-top:20px;">
                    <c-button @click="toPay" class="c-button">
                        <span>{{$t('前往支付')}}</span>
                    </c-button>
                </div>
            </div>
        </div>
       <c-loading :show='loading'></c-loading>
    </div>
</template>
<script>
    export default {
        components: {
           
        },
        data() {
            return {
                athletes:[],
                approve_status: '',
                pay_status: '',
                group_type: '',
                amount: '',
                loading: true
            };
        },
        computed: {
            lang(){
                return this.$i18n.locale;
            }
        },
        watch:{
           
        },
        created() {
          
        },
        mounted(){
            this.getResult();
        },
        methods: {
            getResult(){
                this.$http.post('/shcenter/api/enroll/result',{token: this.$localStorage.get('token')})
                .then(function(res){
                    let d = res.data.enroll_info;
                    this.athletes = d.list;
                    this.approve_status = d.approve_status;
                    this.group_type = d.group_type;
                    this.amount = d.amount;
                    this.pay_status = d.pay_status;
                    this.loading = false;
                })
                .catch((response)=>{
                    if(response.status == 403){
                        this.loading = false;
                    }
                });
            },
            toRegister(){
                this.$router.push('/enroll');
            },
            toPay(){
                window.location.href = 'http://www.shtowermarathon.com/shcenter/unionpay/pay?token=' +  this.$localStorage.get('token');
            }
        }
    };
</script>

<style scoped>
    .result {
        margin: 35px;
    }
    .result table{
        width: 100%;
        border-left: 1px solid  #FEA000;
        border-top: 1px solid  #FEA000;
     
    }
    .result table  td{
        border-right: 1px solid  #FEA000;
        border-bottom:  1px solid  #FEA000;
        text-align: center;
        vertical-align: middle;
        font-size:40px;
        line-height: 2.5
    }

   

    .result table thead th{
        background-color: #FEA000;
        font-size:40px;
        color: #fff;
        line-height: 2.5
    }

    .result .mas-wrapper{
        height: 400px;
        overflow: hidden;
    }

    .c-button span{
       font-size: 40px;
    }



</style>

