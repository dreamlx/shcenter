<template>
    <div style="overflow-x:hidden;min-height:800px;">
        <c-top-bar></c-top-bar>
        <c-header></c-header>
        <div style="margin-top:.1rem;">
            <c-nav></c-nav>  
        </div>
        <div class="breadcrumb">上海中心垂马网 
            <span v-for="(bread,index) in  breadCrumbItems" :key="index">
                &nbsp;> &nbsp;{{bread}}
            </span>
        </div>
        <div class="content">
            <div  v-if="showNav">
                <c-side-nav :navs='navs'></c-side-nav>
            </div>
            <div class="body">
                <slot name="box-body" ></slot>
            </div>
        </div>
      
    </div>
</template>
<script>
    import CHeader from '@/components/c-header';
    import CNav from '@/components/c-nav';
    import CSideNav from '@/components/c-side-nav';
    import CTopBar from '@/components/c-top-bar';
  
    export default {
        components: {
            CHeader,
            CNav,
            CSideNav,
            CTopBar
        },
        data() {
            return {
                currentView: '',
                navs:[{
                    label:'立刻报名',
                    key:'enroll'
                },{
                    label:'报名查询',
                    key:'query'
                },{
                    label:'报名须知',
                    key:'notice'
                }]
            };
        },
        computed: {
            showNav(){
                return ['/login', '/register', '/password/change', '/password/reset'].indexOf(this.$route.path) === -1;
            },
            breadCrumbItems(){
                if(this.$route.path == '/login'){
                    return ['登录'];
                }
                if(this.$route.path == '/register'){
                    return ['注册'];
                }
                if(this.$route.path == '/password/change'){
                    return ['修改密码'];
                }
                if(this.$route.path == '/password/reset'){
                    return ['密码找回'];
                }
                let nav = this.navs.find((nav)=>{ return nav.key == this.currentView;});
                if(nav){
                    return ['比赛报名',nav.label];
                }
                return [];
            }
        },
        watch:{
            $route(){
                let  paths = this.$route.path.split('/');
                this.currentView = paths[paths.length - 1];
            }
        },
        created() {
          
        },
        mounted(){
            let  paths = this.$route.path.split('/');
            this.currentView = paths[paths.length - 1];
        },
        methods: {
            navClick(index){
                this.currentView = this.navs[index].key;
                if(this.navs[index].key == 'enroll'){
                    this.$router.push('/enroll');
                    return;
                }
                if(this.navs[index].key == 'notice'){
                    this.$router.push('/enroll/notice');
                    return;
                }

                if(this.navs[index].key == 'query'){
                    this.$router.push('/enroll/query');
                    return;
                }
                
            }
        }
    };
</script>

<style scoped>
    .breadcrumb{
        color: #797979;
        font-size: 12px;
        margin-top: -10px;
        padding: 0 1rem;
    }
    .content{
        padding: .625rem 2px 0;
        display: flex;
        width: 100%
    }
    .body{
        padding: 0 .25rem;
        flex: 1;

    }

</style>

