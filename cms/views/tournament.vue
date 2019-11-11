<style scoped>
.caption {
    background: #f5f7f9;
    color: #333;
    line-height: 30px;
}
.user-list-box .form-box {
    padding: 15px;
    padding-top: 0
}
</style>
<template>
    <div class="user-list-box">
        <Tabs type="card"  :animated="false" @on-click="tabClick" style='min-height:32px' v-model="activeTab">
            <TabPane label="赛事信息"></TabPane>
            <TabPane label="报名管理" ></TabPane>
            <TabPane label="成绩管理" ></TabPane>
        </Tabs>
        <component :is="currentView"></component>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import '../lib/util';
let loadingBar, resolveWrapper = function (resolve) {
        let _resolve = resolve;
        loadingBar.start();
        return function () {
            loadingBar.finish();
            return  _resolve.apply(this,[].slice.call(arguments));
        };
    };
export default {
    components: {
        'tournament-list': (resolve)=>{
            resolve = resolveWrapper(resolve);
            require(['./tournament.list.vue'], resolve);
        },
        'enrollment-races': (resolve)=>{
            resolve = resolveWrapper(resolve);
            require(['./enrollment.races.vue'], resolve);
        },
        'tournament-result': (resolve)=>{
            resolve = resolveWrapper(resolve);
            require(['./tournament.result.vue'], resolve);
        }
    },
    data() {
        return {
            currentView: 'tournament-list',
            activeTab:'',
            tabs:[{
                label:'赛事信息',key:'races'
            },{
                label:'报名管理',key:'enrollment'
            },{
                label:'成绩管理',key:'scores'
            }]
        };
    },
    computed: {
        ...mapState({
            account: state => state.account
        })
    },
    watch: {},
    created() {
        loadingBar = this.$Loading;
    },
    mounted() {
        let  tab = this.$route.query.tab;
        if(tab){
            let tabIndex = this.tabs.findIndex((t)=>{ return t.key == tab;});
            tabIndex = tabIndex < 0 ? 0 : tabIndex;
            this.activeTab = tabIndex;
            this.tabClick(tabIndex); 
        }
    },
    methods: {
        tabClick(tabIndex){
            this.$router.push({path: this.$route.path,query: {tab: this.tabs[tabIndex].key}});
            if(tabIndex == 0){
                this.currentView = 'tournament-list';
            }
            if(tabIndex == 1 ){
                this.currentView = 'enrollment-races';
            }
            if(tabIndex == 2 ){
                this.currentView = 'tournament-result';
            }
            
        },
    }
};
</script>
