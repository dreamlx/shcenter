<template>
   <div class="search-bar">
        <div class="weui-search-bar__box"><i class="weui-icon-search"></i>
            <input type="search" autocomplete="off"  class="weui-search-bar__input"> <a href="javascript:" class="weui-icon-clear"></a>
         </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            account: ''
        };
    },
    watch:{
       
    },
    created() {
     
    },
    mounted(){
     
    },
    methods: {
      

     
    }
};
</script>

<style  scoped>
   .search-bar{
        background-color: #7F7F7F;
        padding-bottom: 175px;
    
    }
    .weui-search-bar__box {
        position: relative;
        padding-left: 30px;
        padding-right: 30px;
        width: 100%;
        box-sizing: border-box;
        z-index: 1;
        background:#fff;
        border-radius: 10px;
        display: none;
    }

    .weui-search-bar__box .weui-search-bar__input {
        padding: 4px 0;
        width: 100%;
        height: .283rem;
        border: 0;
        font-size: 14px;
        line-height: .283rem;
        box-sizing: content-box;
        background: transparent;
    }
   
</style>

