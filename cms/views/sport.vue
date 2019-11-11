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
            <TabPane label="赛事新闻"  key="news"></TabPane>
            <TabPane label="kv" key="kv"></TabPane>
            <TabPane label="banner" key="banners"></TabPane>
            <TabPane label="赛事图片" key="images"></TabPane>
            <TabPane label="赛事视频" key="videos"></TabPane>
            <TabPane label="活动" key="activities" ></TabPane>
            <TabPane label="赞助商" key="sponsors"></TabPane>
            <TabPane label="招商信息" key="investment"></TabPane>
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
        'tournament-news': (resolve)=>{
            resolve = resolveWrapper(resolve);
            require(['./tournament.news.vue'], resolve);
        },
        'tournament-banners': (resolve)=>{
            resolve = resolveWrapper(resolve);
            require(['./tournament.banner.vue'], resolve);
        },
        'tournament-kv': (resolve)=>{
            resolve = resolveWrapper(resolve);
            require(['./kv.list.vue'], resolve);
        },
        'tournament-images': (resolve)=>{
            resolve = resolveWrapper(resolve);
            require(['./tournament.images.vue'], resolve);
        },
        'tournament-videoes': (resolve)=>{
            resolve = resolveWrapper(resolve);
            require(['./tournament.video.vue'], resolve);
        },
        'tournament-activities': (resolve)=>{
            resolve = resolveWrapper(resolve);
            require(['./tournament.activity.vue'], resolve);
        },
        'tournament-sponsors': (resolve)=>{
            resolve = resolveWrapper(resolve);
            require(['./tournament.sponsor.vue'], resolve);
        },
        'tournament-investment': (resolve)=>{
            resolve = resolveWrapper(resolve);
            require(['./tournament.investment.vue'], resolve);
        }
    },
    data() {
        return {
            currentView: 'tournament-news',
            activeTab:'',
            tabs:[{
                label:'赛事新闻',key:'news'
            },{
                label:'kv',key:'kv'
            },{
                label:'banner',key:'banners'
            },{
                label:'赛事图片',key:'images'
            },{
                label:'赛事视频',key:'videoes'
            },{
                label:'活动',key:'activities'
            },{
                label:'赞助商',key:'sponsors'
            },{
                label:'招商信息',key:'investment'
            }]
        };
    },
    computed: {
        ...mapState({
            account: state => state.account
        })
    },
    watch: {

    },
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
                this.currentView = 'tournament-news';
            }
            if(tabIndex == 1 ){
                this.currentView = 'tournament-kv';
            }
            if(tabIndex == 2 ){
                this.currentView = 'tournament-banners';
            }
            if(tabIndex == 3 ){
                this.currentView = 'tournament-images';
            }
            if(tabIndex == 4 ){
                this.currentView = 'tournament-videoes';
            }
            if(tabIndex == 5 ){
                this.currentView = 'tournament-activities';
            }
            if(tabIndex == 6 ){
                this.currentView = 'tournament-sponsors';
            }
            if(tabIndex == 7 ){
                this.currentView = 'tournament-investment';
            }
        },
    }
};
</script>
