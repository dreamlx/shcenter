<template>
   <div class="footer-container">
         <div class="footer">
            <div class="logo"></div>
            <div>
                <div class="company">{{$t('公司信息：上海中心大厦商务运营有限公司')}} </div>
                <div class="addr">{{$t('地址：上海市浦东新区陆家嘴环路479号1006室')}}  
                    <template v-if="isEN">
                        <br/>
                    </template>
                    <template v-else>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </template>
                    {{$t('联系电话：')}}86-21-20656806  86-21-20656802
                </div>
                <div style="text-align:center;margin-top:.5rem">
                    <img src="../assets/beian.png">
                    <div class="beian">沪ICP备18034504号-1</div>
                </div>
            </div>
         </div>
         <div style="width:300px;margin:0 auto; padding:20px 0;">
            <a target="_blank" href="http://www.miibeian.gov.cn/" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
                <img src="../assets/jinghui.png" style="float:left;"/>
                <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">沪公网安备 31011502008132号</p >
            </a>
        </div>

    </div>
</template>
<script>
const prefixCls = 'ivu-btn';
export default {
    computed: {
        isEN(){
            return  this.$i18n.locale == 'en' ;
        }       
    },
};
</script>

<style  scoped>
    .footer-container{
        overflow: hidden;
    }

    .footer{
        height: 6.85rem;
        background: #B6B6B6;
        position: relative;
        padding-top: 1.425rem;
        margin-top: 1.425rem;
    } 
    .footer .logo{
        width: 2.85rem;
        height: 2.85rem;;
        border-radius: 50%;
        background-color: #B6B6B6;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        transform:translateX(-50%);
        top: -1.425rem;
        background-image: url('../assets/footer-logo.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 85%
    }

    .footer .company{
        margin-top: .3rem;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
    }
    .footer .addr{
        text-align: center;
        font-size: 16px;
        color: #fff;
    }

    .footer .beian{
        font-size: 16px;
        font-weight: bold;
        color: #fff;
    }

  
   
</style>

