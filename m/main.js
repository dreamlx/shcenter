
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';
import VueLocalStorage from 'vue-localstorage';
import FastClick from 'fastclick';
import App from './App';
import routes from './router';
import lang from './lang';
import Bus from './lib/bus';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import './css/custom.less';
import './css/main.css';

import CButton from './components/c-button';
import CInput from './components/c-input';
import CRadioGroup from './components/c-radio-group';
import CRadio from './components/c-radio';
import {Form , FormItem} from './components/form';
import CLoading from './components/c-loading';
import CAlert from './components/c-alert';
import CSkewCaption from './components/c-skew-caption';
import CMascot from './components/c-mascot';
import CVideoPlayer from './components/c-video-player';

Vue.component('CButton', CButton);
Vue.component('CSkewCaption', CSkewCaption);
Vue.component('CInput', CInput);
Vue.component('CRadioGroup', CRadioGroup);
Vue.component('CRadio', CRadio);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('CLoading', CLoading);
Vue.component('CAlert', CAlert);
Vue.component('CMascot', CMascot);
Vue.component('CVideoPlayer', CVideoPlayer);


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(VueLocalStorage);

import loadingPng from './assets/loading-spin.svg';
// or with options
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: loadingPng,
    attempt: 1
});

const router = new VueRouter({
    routes: routes,
    mode: 'hash'
});


const i18n = new VueI18n({
    locale: 'zh',
    messages:lang
});



Vue.http.interceptors.push((request, next) => {
    let token = router.app.$localStorage.get('token');
    if (token) {
        request.headers.set('Authorization', 'Bearer ' + token);
    }
    next(response => {
        let data = response.body;
        if (data.code == 1000 || data.code == 1001 || data.code == 1002) {
            router.push('/login');
            Bus.$emit('LoginExpired',{});
        }
        return response;
    });
});

router.beforeEach((to, from, next) => {
    let token = router.app.$localStorage.get('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next({
            path: '/login',
            query:{
                from:to.fullPath
            }
        });
    } else {
        if(to.path == '/login' ){
            router.lastRoute = from;
        }
        next();
    }
});

router.afterEach((to, from, next) => {
    // window.scrollTo(0, 0);
});


FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.http.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
Vue.http.options.emulateHTTP = true;
//Vue.http.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
//Vue.http.options.emulateJSON = true;

let baseURI = window.location.hostname == '127.0.0.1' || /^192\.168(\.([2][0-4]\d|[2][5][0-5]|[01]?\d?\d)){2}$/.test(window.location.hostname)
? '' : window.location.protocol + '//' + window.location.host;

//baseURI= 'http://zhenhua.ripple-tech.com';

/* eslint-disable no-new */
window.vuexExpress = new Vue({
    i18n,
    el: '#app',
    baseURI: baseURI,
    router,
    template: '<App/>',
    components: { App }
});


//116.196.82.243
