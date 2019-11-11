import NotFoundView from '../views/404.vue';
export default [
    {
	    path: '/home',
	    alias: '',
	    name: '首页',
	    component: resolve => require(['../views/home/index.vue'], resolve),
    }, {
	    path: '/login',
	    alias: '',
	    name: '登录',
	    component: resolve => require(['../views/login/index.vue'], resolve),
    },{
	    path: '/register',
	    alias: '',
	    name: '注册',
	    component: resolve => require(['../views/register/index.vue'], resolve),
    },{
        path: '/race/collection',
        name: '图片与视频',
        component: resolve => require(['../views/race/current/collection.vue'], resolve),
    }, {
	    path: '/enroll',
	    name: '比赛报名',
	    component: resolve => require(['../views/enroll/index.vue'], resolve),
	    children: [{
	    	path: 'index',
		    alias: '',
		    name: '比赛报名-立刻报名',
		    component: resolve => require(['../views/enroll/enroll.vue'], resolve),
		    meta: {
		    	requiresAuth:true,
	          	description: ''
	        }
    },{
        path: 'query',
		    alias: '',
		    name: '比赛报名-报名查询',
		    component: resolve => require(['../views/enroll/query.vue'], resolve),
		    meta: {
		    	requiresAuth:true,
	          	description: ''
	        }
    },{
		    path: 'notice',
		    alias: '',
		    name: '比赛报名-报名须知',
		    component: resolve => require(['../views/enroll/notice.vue'], resolve),
    }]

    },{
	    path: '/current/race',
	    alias: '/current/race',
	    name: '本届赛事',
	    component: resolve => require(['../views/race/current/index.vue'], resolve),
	    children: [{
	    	path: 'rules',
		    alias: '',
		    name: '本届赛事-竞赛规程',
		    component: resolve => require(['../views/race/current/rules.vue'], resolve),
    },{
        path: 'qa',
		    alias: '',
		    name: '本届赛事-常见问题',
		    component: resolve => require(['../views/race/current/FAQ.vue'], resolve),
    },{
		    path: 'news',
		    alias: '',
		    name: '本届赛事-赛事新闻',
		    component: resolve => require(['../views/race/current/news.vue'], resolve),
    },{
		    path: 'guidelines',
		    alias: '',
		    name: '本届赛事-备赛指南',
		    component: resolve => require(['../views/race/current/guide.vue'], resolve),
    },{
		    path: 'collection',
		    alias: '',
		    name: '本届赛事-图片与视频',
		    component: resolve => require(['../views/race/current/collection.vue'], resolve),
    }]

    },{
	    path: '/previous/race',
	    alias: '/previous/race',
	    name: '往届赛事',
	    component: resolve => require(['../views/race/previous/index.vue'], resolve),
	    children: [{
		    path: 'collection',
		    alias: '',
		    name: '往届赛事-图片与视频',
		    component: resolve => require(['../views/race/current/collection.vue'], resolve),
    }]
    },{
	    path: '/news/:id',
	    alias: '',
	    name: '本届赛事-新闻',
	    component: resolve => require(['../views/news/index.vue'], resolve),
    },{
	    path: '/sponsorship',
	    name: '赞助商',
	    component: resolve => require(['../views/sponsorship/index.vue'], resolve),
	    children: [{
	    	path: 'investment',
		    alias: '',
		    name: '赞助商-招商信息',
		    component: resolve => require(['../views/sponsorship/investment.vue'], resolve),
    },{
        path: 'sponsors',
		    alias: '',
		    name: '赞助商-赛事赞助商',
		    component: resolve => require(['../views/sponsorship/sponsors.vue'], resolve),
    }]

    },{
        path: '*',
        component: NotFoundView
    }];
