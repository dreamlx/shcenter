// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import routes from './router';
import store from './store';

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './css/main.css';

import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueQuillEditor);

const router = new VueRouter({
    routes: routes,
    mode: 'hash'
    
});

Vue.http.interceptors.push((request, next) => {
    let token = store.state.account.token;
    if (token) {
        request.headers.set('Authorization', 'Bearer ' + token);
    }
    next(response => {
        let data = response.body;
        if (data.code == 1000 || data.code == 1001 || data.code == 1002) {
            router.push('/login');
        }
        return response;
    });
});

router.beforeEach((to, from, next) => {
    let token = store.state.account.token,
        role = store.state.account.role,
        remembered = store.state.account.remembered,
        authenticated = remembered || window.authenticated;
    if (to.matched.some(record => record.meta.requiresAuth) && !authenticated) {
        next({
            path: '/login'
        });
    } else {
        if(to.matched.some(record => record.meta.role && record.meta.role !== role )){
            next({
                path: '/'
            });
            return;
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
    el: '#app',
    baseURI: baseURI,
    router,
    store,
    template: '<App/>',
    components: { App }
});
