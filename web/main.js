// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueLocalStorage from 'vue-localstorage';
import VueI18n from 'vue-i18n';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueLazyload from 'vue-lazyload';

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'swiper/dist/css/swiper.css';
import App from '@/App';
import routes from '@/router';
import Bus from '@/lib/bus';
import lang from '@/lang';
import '@/css/main.css';
import loadingPng from '@/assets/loading-spin.svg';

import CQrcode from './components/c-qrcode';
Vue.component('CQrcode', CQrcode);

Vue.use(VueI18n);
Vue.use(VueResource);
Vue.use(VueLocalStorage);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueAwesomeSwiper);


Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: loadingPng,
    attempt: 1
});


if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function(predicate) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var thisArg = arguments[1];
            var k = 0;
            while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                k++;
            }
            return undefined;
        },
        configurable: true,
        writable: true
    });
}


const i18n = new VueI18n({
    locale: 'zh',
    messages:lang
});


const router = new VueRouter({
    routes: routes,
    mode: 'hash'
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
                from: to.fullPath
            }
        });
    } else {
        if(to.path == '/login' ){
            router.lastRoute = from;
        }
        iView.LoadingBar.start();
        next();
    }
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    // window.scrollTo(0, 0);
});

Vue.config.productionTip = false;
Vue.http.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
Vue.http.options.emulateHTTP = true;
//Vue.http.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
//Vue.http.options.emulateJSON = true;

let baseURI = window.location.hostname == '127.0.0.1' || /^192\.168(\.([2][0-4]\d|[2][5][0-5]|[01]?\d?\d)){2}$/.test(window.location.hostname)
? '' : window.location.protocol + '//' + window.location.host;

/* eslint-disable no-new */
window.vuexExpress = new Vue({
    i18n,
    el: '#app',
    baseURI: baseURI,
    router,
    template: '<App/>',
    components: { App }
});
