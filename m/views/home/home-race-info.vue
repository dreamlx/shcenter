<template>
    <div>
        <div class="m-tabs">
            <div class="tabs">
                <div :class="['tab-title',{'active': currentTabIndex == index }]"  v-for="(tab,index) in tabList" :key="index" @click="onTabItemClick(index)">{{$t(tab.label)}}</div>
            </div>
            <div class="content">
                <div class="ql-container">
                    <div class="ql-editor" v-html="race.content" v-if="lang == 'zh'"> </div>
                    <div class="ql-editor" v-html="race.content_en" v-if="lang == 'en'"> </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  
    export default {
          components: {
        
          },
          data() {
              return {
                  tabList:[{
                      label:'竞赛规程',
                      key:'schedule'
                  },{
                      label:'常见问题',
                      key:'FAQ'
                  },{
                      label:'备赛指南',
                      key:'guide'
                  }],
                  currentTabIndex: 0,
                  race:{}
              };
          },
          computed:{
              lang(){
                  return this.$i18n.locale;
              }
          },
          created() {
           
          },
          mounted(){
              this.getRaceInfo();
          },
          methods: {
              onTabItemClick(index){
                  this.currentTabIndex = index;
                  this.getRaceInfo();
              },
              getRaceInfo(){
                  this.$http
                .get(
                    this.$root.$options.baseURI +
                        '/shcenter/api/race/info',{params: {nav_name:  this.tabList[this.currentTabIndex].label}}
                )
                .then(res => {
                    this.race = res.data.result;
                })
                .catch(() => {
                 
                });
              }
          }
      };
</script>
<style scoped>
    .m-tabs{
        margin:80px 35px;
    }
    .tabs{
        display: flex;
    }
    .tabs > div.tab-title{
        flex: 1;
        height: 130px;
        text-align: center;
        background: #dcd9d9;
        color: #737171;
        line-height: 130px;
        font-size: 45px;
    }
    .tabs > div.active{
        background: #ff9600;
        color: #fff;
    }
    .content{
        max-height: 1120px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        border: 1px solid #ff9600;
        border-top-width: 0;
    }

    .content .ql-editor{
        font-size: 7px;
    }
    

</style>

