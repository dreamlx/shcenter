<template>
    <div class="sponsors-container">

        <div style="text-align: center; padding:  0  3.125vw; ">
            <img src="../../assets/sponors.jpeg" style="width: auto; max-width: 100%" />
        </div>
        <div style="text-align: center">
            <img src="../../assets/orgnization.png" />
        </div>
        <!-- <div class="column-item-container"> 
            <div class="column-header">
                <a class="button"> <div>{{$t('组织架构')}}</div> </a>
            </div>
            <ul class="brand-logo-list">
                <li v-for="(brd,index) in specBrandList" :key="index">
                    <a :href="brd.link" target="_blank">
                        <img :src="brd.logo">
                    </a>
                    <div class="brand-name">{{brd.name}}</div>
                </li>
            </ul>
        </div> -->

    <!--     <div class="column-item-container"> 
            <div class="column-header">
                <a class="button"> <div>{{$t('国际授权单位')}}</div> </a>
            </div>
            <ul class="brand-logo-list">
                <li v-for="(brd,index) in honorBrandList" :key="index">
                    <a :href="brd.link" target="_blank">
                        <img :src="brd.logo">
                    </a>
                </li>
            </ul>
        </div> -->

        <!-- <div class="column-item-container"> 
            <div class="column-header">
                <a class="button"> <div>{{$t('合作伙伴')}}</div> </a>
            </div>
            <ul class="brand-logo-list">
                <li v-for="(brd,index) in coopBrandList" :key="index">
                    <a :href="brd.link" target="_blank">
                        <img :src="brd.logo">
                    </a>
                    <div class="brand-name">{{brd.name}}</div>
                </li>
            </ul>
        </div> -->
    </div>
</template>
<script>
   
    export default {
           components: {
          
           },
           data() {
               return {
                   coopBrandList:[],
                   honorBrandList:[],
                   specBrandList:[],
               };
           },
           computed: {
           
           },
           watch:{
           
           },
           created() {
               this.getSponsorList();
           },
           mounted(){
           
           },
           methods: {
               getSponsorList(){
                   this.$http
                    .get(
                        this.$root.$options.baseURI +
                            '/shcenter/api/sport/sponsor/list',{pageSize:6}
                    )
                    .then(response => {
                        let list = response.data.sponsors, coopBrandList = [],honorBrandList = [],specBrandList = [];
                        list.forEach((s)=>{
                            if(s.type == '合作品牌'){
                                coopBrandList.push(s);
                            }
                            if(s.type == '荣誉赞助品牌'){
                                honorBrandList.push(s);
                            }
                            if(s.type == '独家冠名'){
                                specBrandList.push(s);
                            }
                        });
                        this.coopBrandList = coopBrandList;
                        this.honorBrandList = honorBrandList;
                        this.specBrandList = specBrandList;
                    })
                    .catch(() => {
                     
                    });
               },
           }
       };
</script>

<style scoped>
    .button { 
        transform: skewX(-33deg); 
        height: 1.25rem;
        background: #FEA000;
        min-width: 3.9rem;
        display: inline-block;
        padding: 0 10px;
    } 

    .button > div { 
        transform: skewX(33deg);
        line-height: 1.25rem;
        color: #fff;
        font-size: 16px;
        text-align: center;
    }

    .sponsors-container > .column-item-container:first-child{
        margin-top: 0   
    }
    .column-item-container{
        margin: 2.5rem 5.5rem;
        margin-bottom: 5.75rem
    }

    .column-header{
        position: relative;
        display: flex;
    }

    .column-header>div{
        flex: 1
    } 

    .column-header:after{
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: #FF9600;
        bottom: 0;
        position: absolute;
    }

    .column-header .caption{
        line-height: 1.25rem; 
        font-size: 16px;
        padding-right: 1.75rem;
        padding-left: .5rem
    } 

    .column-header .button{
        transform-origin: right bottom;
    }

    .column-header .button >div{
        font-weight: bold;
    }



    .brand-logo-list{
        list-style: none;
    }
    .brand-logo-list > li{
        display: inline-block;
        width: 25%;
        vertical-align: baseline;
        margin-bottom: 20px;
    }
    .brand-logo-list > li img{
        width:100% ;
        cursor: pointer;
        display: block;
    }
    .brand-logo-list .brand-name{
        text-align: center;
    }


</style>

