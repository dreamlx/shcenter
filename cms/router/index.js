import NotFoundView from '../views/404.vue';
export default [{
    path: '/login',
    name: 'login',
    component: resolve => require(['../views/login.vue'], resolve),
},{
    path: '/',
    component: resolve => require(['../views/layout.vue'], resolve),
    children: [{
	    path: 'sport',
	    alias: '',
        name: 'sport',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/sport.vue'], resolve),
    }, {
	    path: 'news/create',
	    name: 'news',
	    meta:{
	      
	    },
	    component: resolve => require(['../views/news.vue'], resolve),
    },{
	    path: 'news/update',
	    name: 'news.update',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/news.vue'], resolve),
    },{
	    path: 'news/preview',
	    name: 'news.preview',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/news.preview.vue'], resolve),
    },{
	    path: 'banner/create',
	    name: 'banner',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/banner.vue'], resolve),
    },{
	    path: 'banner/update',
	    name: 'banner.update',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/banner.vue'], resolve),
    },{
	    path: 'video/create',
	    name: 'video',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/video.vue'], resolve),
    },{
	    path: 'video/update',
	    name: 'video.update',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/video.vue'], resolve),
    },{
	    path: 'image/create',
	    name: 'image',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/image.vue'], resolve),
    },{
	    path: 'kv/create',
	    name: 'kv',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/kv.vue'], resolve),
    },{
	    path: 'kv/update',
	    name: 'kv.update',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/kv.vue'], resolve),
    },{
	    path: 'image/update',
	    name: 'image.update',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/image.vue'], resolve),
    },{
	    path: 'activity/create',
	    name: 'activity',
	    meta:{
	      requiresAuth:true
    	},
	    component: resolve => require(['../views/activity.vue'], resolve),
    },{
	    path: 'activity/update',
	    name: 'activity.update',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/activity.vue'], resolve),
    },{
	    path: 'sponsor/create',
	    name: 'sponsor',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/sponsor.vue'], resolve),
    },{
	    path: 'sponsor/update',
	    name: 'sponsor.update',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/sponsor.vue'], resolve),
    },{
	    path: 'tournament/create',
	    name: 'tournament.create',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/tournament.info.vue'], resolve),
    },{
	    path: 'tournament/update',
	    name: 'tournament.update',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/tournament.info.vue'], resolve),
    },{
	    path: 'user/detail',
	    name: 'user.detail',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/user.detail.vue'], resolve),
    },{
	    path: 'tournament',
	    name: 'tournament',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/tournament.vue'], resolve),
    },{
	    path: 'banner/list',
	    name: 'banner.list',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/banner.list.vue'], resolve),
    },{
	    path: 'investment/create',
	    name: 'investment',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/investment.vue'], resolve),
    },{
	    path: 'investment/update',
	    name: 'investment.update',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/investment.vue'], resolve),
    },{
	    path: 'enrollment/create',
	    name: 'enrollment.create',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/enrollment.item.vue'], resolve),
    },{
	    path: 'enrollment/update',
	    name: 'enrollment.update',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/enrollment.item.vue'], resolve),
    },{
	    path: 'enrollment/list',
	    name: 'enrollment.list',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/enrollment.list.vue'], resolve),
    },{
	    path: 'enrollment/detail',
	    name: 'enrollment.detail',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/enrollment.detail.vue'], resolve),
    },{
	    path: 'users',
	    name: 'users',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/user.list.vue'], resolve),
    },{
	    path: 'password/change',
	    alias: '',
        name: 'password',
	    meta:{
	      requiresAuth:true
	    },
	    component: resolve => require(['../views/password.change.vue'], resolve),
    }, {
	    path: 'user/create',
	    alias: '',
        name: 'user.create',
	    meta:{
		  requiresAuth:true,
		  role: 'admin'
	    },
	    component: resolve => require(['../views/user.create.vue'], resolve),
    },{
	    path: 'setting',
	    name: 'setting',
	    meta:{
		  requiresAuth:true,
		  role: 'admin'
	    },
	    // eslint-disable-next-line no-mixed-spaces-and-tabs
	    component: resolve => require(['../views/setting.vue'], resolve),
    }]
},{
    path: '*',
    component: NotFoundView
}];
