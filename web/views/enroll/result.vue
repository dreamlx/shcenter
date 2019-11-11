<template>
    <div style="padding-left:1.5rem;padding-bottom:40px;" v-if="!loading">
        <div class="tips" v-if="athletes.length>0 && approve_status != '审核不通过'"><i class="iconfont">&#xe696;</i><span>恭喜你，提交成功，等待抽签...</span></div>
        <div style="text-align:center" class="result-wrapper">
            <div class="mascot-wrapper"  v-if="approve_status == '审核中'">
                <c-mascot message='恭喜你，提交成功，等待抽签...' ></c-mascot>
            </div>
             <div class="mascot-wrapper"  v-if="approve_status == '审核不通过'">
                <c-mascot message='Sorry,审核未通过...' :mascotType='3'></c-mascot>
            </div>
            <c-mascot message='Oops,您还未提交报名' :mascotType='2' v-if="athletes.length == 0"></c-mascot>
            <table cellspacing="0" cellpadding="0"  class="result-tbl" v-if="athletes.length>0">
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
                        <span v-if='group_type ==1'>个人全程赛</span>
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
        </div>

         <Modal title="" v-model="qrcodeVisible"  :closable="false"   :mask-closable="false">
                <div style="text-align:center;font-size:14px;">请扫码完成支付</div>
                <div style="margin:20px;"> 
                    <div class="qrcode-wrapper">    
                        <c-qrcode :value="pay_qrcode_url" :options="{ width: 200 ,height: 200}" v-if="pay_qrcode_url"></c-qrcode>
                    </div>
               </div>
               <div slot="footer">
                    <Button type="text" size="large"   @click="qrcodeVisible = false">取消</Button>
                    <Button type="error"   size="large"  :loading="pay_query_loading" @click="getQrPayResult" class="ext-btn">已完支付？</Button>
                </div>
        </Modal>


        <div v-if="approve_status == '审核通过' &&  pay_status !='已支付' ">
            <div class="pay-channel-wrapper">
                <div class="pay-channel-header">请选择第三方支付方式</div>
                <div class="pay-channel-inner">
                    <RadioGroup style="width:100%;    white-space: nowrap;" v-model="pay_channel" >
                        <Radio  label ="1" class="pay-channel-item" ><img src="../../assets/ali-pay-icon.png" class="pay-channel-icon" /></Radio>
                        <Radio  label ="2" class="pay-channel-item"><img src="../../assets/wechat-pay-icon.png" class="pay-channel-icon"/></Radio>
                        <Radio  label ="3" class="pay-channel-item"><img src="../../assets/union-pay-icon.png" class="pay-channel-icon"/></Radio>
                    </RadioGroup>
                </div>
            </div>

            <c-button @click="toPay" :disable='!pay_channel'>
                <span>{{$t('前往支付')}}</span>
            </c-button>
        </div>
        <div  v-if="athletes.length == 0">
           <c-button @click="toRegister">
                <span>{{$t('立刻前往报名')}}</span>
            </c-button>
        </div>
    </div>
</template>
<script>
    import CMascot from '@/components/c-mascot';
    import CButton from '@/components/c-button';
    import Bus from '@/lib/bus';
    export default {
        components: {
            CMascot,
            CButton
        },
        data() {
            return {
                pay_channel: '',
                athletes:[],
                approve_status: '',
                pay_status: '',
                group_type: '',
                amount: '',
                loading: true,
                qrcodeVisible : false,
                pay_qrcode_url: '',
                pay_query_loading: false
            };
        },
        computed: {
           
        },
        watch:{
            qrcodeVisible(val){
                if(val){
                    if(this.pay_qrcode_url){
                        this.payPolling();
                    }
                }else{
                    clearTimeout(this.timerId); 
                } 
            },
            pay_qrcode_url(val){
                if(val){
                    this.payPolling();
                }
            }
        },
        created() {
            this.getResult();
        },
        mounted(){
         
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
                        this.$Message.error('无操作权限!');
                    }
                });
            },
            getQRcode(){
                this.$http.post('/shcenter/api/enroll/pay/qrcode',{token: this.$localStorage.get('token')})
                .then(function(res){
                    if(res.data.code == 0){
                        this.pay_qrcode_url = res.data.pay_qrcode_url;
                    }
                })
                .catch((response)=>{
                    if(response.status == 403){
                        this.$Message.error('无操作权限!');
                    }
                });
            },
            payPolling(){
                clearTimeout(this.timerId);
                if(!this.qrcodeVisible || this.pay_status == '已支付'){
                    return;
                }
                this.timerId = setTimeout(()=>{
                    this.getQrPayResult();
                    this.query_loading = false;
                    this.payPolling();
                },6000);
            },
            getQrPayResult(){
                this.query_loading = true;
                this.$http.post('/shcenter/api/enroll/pay/qrcode/result',{token: this.$localStorage.get('token')})
                .then(function(res){
                    this.query_loading = false;
                    if(res.data.code == 0){
                        this.pay_status = '已支付';
                        this.qrcodeVisible = false;
                    } 
                })
                .catch((response)=>{
                    this.query_loading = false;
                });
            },
            toRegister(){
                this.$router.push('/enroll');
            },

            toPay(){
                if(!this.pay_channel){
                    return;
                }
                if(this.pay_channel == '1' || this.pay_channel == '2'){
                    this.pay_query_loading = false;
                    this.qrcodeVisible = true;
                    if(!this.pay_qrcode_url){
                        this.getQRcode();
                    }
                }
                if(this.pay_channel == '3'){
                    this.getQRcode();
                    window.location.href = 'http://www.shtowermarathon.com/shcenter/unionpay/pay?token=' +  this.$localStorage.get('token');
                }
            }
        }
    };
</script>

<style scoped>
    
    .tips{
        color: #FEA000;
        font-size: 16px;
        font-weight: bold;
        font-family: cursive;
        margin-bottom: .7rem
    }
    .tips .iconfont{
        font-size: 30px;
        font-weight: normal;
    }
    .tips span{
        margin-left: 20px;
    }
    .result-wrapper{
        width: 16.25rem;
    }
    .mascot-wrapper{
        height: 135px;
        overflow: hidden;
    }
    .result-tbl{
        width: 100%;
        border-left: 1px solid  #FEA000;
        border-top: 1px solid  #FEA000;
    }
    .result-tbl td{
        border-right: 1px solid  #FEA000;
        border-bottom:  1px solid  #FEA000;
        height: 1.5rem;
        text-align: center;
        vertical-align: center;
        font-size:14px;
    }

    .result-tbl tr td:first-child{
        width: 5.9rem;
    }

    .result-tbl thead th{
        background-color: #FEA000;
        height: 1.5rem;
        font-size:14px;
        color: #fff
    }

    .button { 
        display: inline-block;
        position: relative;
        max-height: 50px;
        margin-top: 1rem;
        margin-left: 4.25rem;
        margin-bottom:40px;
    } 

    .pay-channel-wrapper{
        text-align: center;
        width: 16.25rem;
        border:solid 1px #f98319; 
        margin-top: 20px;
    }
    .pay-channel-item{
        width: 33.3%;
    }
    .pay-channel-header{
        background-color: #f98319;
        height: 1.2rem;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 1.2rem;
    }
    .pay-channel-icon{
        height: 40px;
        display: inline-block;
        vertical-align: middle;
    }
    .pay-channel-inner{
        padding: 20px 0;        
    }

    .qrcode-wrapper{
        width: 200px;
        height: 200px;
        background-color:  rgba(192, 192, 192, 0.18);     
        margin: auto;
        background-image: url(../../assets/loading-spin.svg);
        background-position: 50%;
        background-size: 10%;
        background-repeat: no-repeat;
    }

    .ext-btn{
        background:  #f98319; 
        border: 1px solid transparent;
        outline: 0
    }


</style>

