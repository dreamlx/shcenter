<template>
  	<div style="position:relative;z-index:999">
     	<div class="search-bar" style="display:none">
     		<div class="weui-search-bar__box"><i class="weui-icon-search"></i>
     		 	<input type="search" autocomplete="off"  class="weui-search-bar__input"> <a href="javascript:" class="weui-icon-clear"></a>
     		 </div>
     	</div>
     	<c-top-header @onMenuClick="onMenuClick">
       		<div slot="side-nav" style="position:relative">
       			<c-side-menu :visible='showMenuList'  @on-visible-change="onVisibleChange"></c-side-menu>
       		</div>
       	</c-top-header>
 	</div>
</template>

<script>
   	import CTopHeader from '@/components/c-top-header';
   	import CSideMenu from '@/components/c-side-menu';
   
export default {
    components:{
        CTopHeader,
        CSideMenu,
    },
    data(){
        return {
            showMenuList: false,
        };
    },
    created() {
          
    },
    methods: {
        onMenuClick(){
            	this.showMenuList =  !this.showMenuList;
        },
        onVisibleChange(val){
            this.showMenuList = val;
        }
    }
};
</script>
