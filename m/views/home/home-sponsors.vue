<template>
    <div>
        <div class="m-brands"> 
             <div style="text-align: center; ">
                <img src="../../assets/sponors.jpeg" style="width: auto; max-width: 100%" />
            </div>
        </div>
        <!-- <div class="m-brands"> 
            <div class="column-header">
                <c-skew-caption> <span class="caption">{{$t('组织架构')}}</span></c-skew-caption>
            </div>
            <ul class="brand-logo-list">
                <li v-for="(brd,index) in specBrandList" :key="index">
                    <a :href="brd.link" target="_blank">
                       <div class="lazy-box" v-lazy:background-image="brd.logo"></div>
                    </a>
                     <div class="brand-name">{{brd.name}}</div>
                </li>
            </ul>
        </div>
        <div class="m-brands"> 
            <div class="column-header">
                 <c-skew-caption> <span class="caption">{{$t('合作伙伴')}}</span></c-skew-caption>
            </div>
            <ul class="brand-logo-list">
                <li v-for="(brd,index) in coopBrandList" :key="index">
                    <a :href="brd.link" target="_blank">
                       <div class="lazy-box" v-lazy:background-image="brd.logo"></div>
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
            isEN(){
                return this.$i18n.locale == 'en' ;
            }  
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
            }
        }
    };
</script>

<style scoped>
   
.m-brands{
    margin:-200px 35px;
}

.brand-logo-list{
    list-style: none;
    min-height: 350px;
    margin-top: 10px;
}
.brand-logo-list > li{
    display: inline-block;
    width: 33%;
    margin-bottom: 10px;
}
.brand-logo-list > li img{
    width:100% ;
    cursor: pointer;
}
.brand-logo-list .brand-name{
    text-align: center;
}
.lazy-box{
    padding-bottom: 16vw;
}
.lazy-box[lazy="loaded"]{
    background-position: bottom center;
}

</style>

