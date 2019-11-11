import NotFoundView from '../views/404.vue';
export default [{
    path: '/',
    component: resolve => require(['../views/layout/layout.vue'], resolve),
    children: [{
	    path: 'home',
	    alias: '',
	    name: '首页',
	    component: resolve => require(['../views/home/index.vue'], resolve),
    },{
	    path: 'current/race',
	    alias: 'current/race',
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
		    path: 'classroom',
		    alias: '',
		    name: '本届赛事-垂马课堂',
		    component: resolve => require(['../views/race/current/classroom.vue'], resolve),
    },{
		    path: 'collection',
		    alias: '',
		    name: '本届赛事-图片与视频',
		    component: resolve => require(['../views/race/current/collection.vue'], resolve),
    }]

    },{
	    path: 'previous/race',
	    alias: '',
	    name: '往届赛事',
	    component: resolve => require(['../views/race/previous/index.vue'], resolve),
	    children: [{
		    path: 'collection',
		    alias: '',
		    name: '往届赛事-图片与视频',
		    component: resolve => require(['../views/race/current/collection.vue'], resolve),
    },{
	    	path: 'events',
		    alias: '',
		    name: '往届赛事-往期活动',
		    component: resolve => require(['../views/race/current/rules.vue'], resolve),
    }]

    },{
	    path: 'race/events',
        name: '系列活动',
        component: resolve => require(['../views/race/events/index.vue'], resolve),
        children: [{
    		path: '',
		    name: '系列活动-系列活动',
		    component: resolve => require(['../views/race/events/events.vue'], resolve)
        }]
    },{
        path: 'race/collection',
        alias: 'race/collection',
        name: '图片与视频',
        component: resolve => require(['../views/race/collection/index.vue'], resolve),
        children: [{
            path: '2017',
            alias: '',
            name: '图片与视频-2017',
		    component: resolve => require(['../views/race/current/collection.vue?2017'], resolve)
        },{
    		path: '2018',
            name: '图片与视频-2018',
		    component: resolve => require(['../views/race/current/collection.vue?2018'], resolve)
        },{
    		path: '2019',
            name: '图片与视频-2019',
		    component: resolve => require(['../views/race/current/collection.vue?2019'], resolve)
        }]
    },{
	    path: 'login',
	    alias: '',
	    belongTo:'比赛报名',
	    name: '登录',
	    component: resolve => require(['../views/enroll/login.vue'], resolve),
    },{
	    path: 'register',
	    alias: '',
	    belongTo:'比赛报名',
	    name: '注册',
	    component: resolve => require(['../views/enroll/register.vue'], resolve),
    },{
	    path: 'password/change',
	    alias: '',
	    name: '修改密码',
	    component: resolve => require(['../views/enroll/password.vue'], resolve),
	    meta: {
	    	requiresAuth:true,
          	description: ''
	    }
    },{
	    path: 'password/reset',
	    alias: '',
	    name: '忘记密码',
	    component: resolve => require(['../views/enroll/forget.vue'], resolve),
	    meta: {
          	description: ''
	    }
    },{
	    path: 'news/:id',
	    alias: '',
	    name: '赛事新闻',
	    component: resolve => require(['../views/news/index.vue'], resolve),
    },{
	    path: 'enroll',
	    alias: 'enroll',
	    name: '比赛报名',
	    component: resolve => require(['../views/enroll/index.vue'], resolve),
	    children: [{
	    	path: 'index',
		    alias: '',
		    name: '比赛报名-立刻报名',
		    component: resolve => require(['../views/enroll/sign.vue'], resolve),
		    meta: {
		       requiresAuth:true,
		       description: ''
		    }
    },{
		    path: 'notice',
		    alias: '',
		    name: '比赛报名-报名须知',
		    component: resolve => require(['../views/enroll/notice.vue'], resolve),
		    meta: {
	          	description: ''
	        }
    },{
		    path: 'query',
		    alias: '',
		    name: '比赛报名-报名查询',
		    component: resolve => require(['../views/enroll/result.vue'], resolve),
		    meta: {
		    	requiresAuth:true,
	          	description: ''
	        }
    }]
	  
    },{
	    path: 'record',
	    alias: '',
	    name: '成绩查询',
	    component: resolve => require(['../views/record/index.vue'], resolve),
	    meta: {
	        // requiresAuth:true,
	        description: ''
	    }
    },{
	    path: 'public/welfare',
	    alias: '',
	    name: '垂马公益',
	    component: resolve => require(['../views/welfare/index.vue'], resolve),
	    meta: {
	        // requiresAuth:true,
	        description: ''
	    }
    },{
	    path: 'sponsorship',
	    alias: '',
	    name: '赞助商',
	    component: resolve => require(['../views/sponsorship/index.vue'], resolve),
	    children: [{
	    	path: 'investment',
		    alias: '',
		    name: '赞助商-招商信息',
		    component: resolve => require(['../views/sponsorship/investment.vue'], resolve),
		    meta: {
		        // requiresAuth:true,
		        description: ''
		    }
    },{
		    path: 'sponsors',
		    alias: '',
		    name: '赞助商-赛事赞助商',
		    component: resolve => require(['../views/sponsorship/sponsors.vue'], resolve),
		    meta: {
	          	description: ''
	        }
    }]

    }]
},{
    path: '*',
    component: NotFoundView
}];
