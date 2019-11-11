/**
 * Created by .
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import sportNews from './modules/sport-news';
import account from './modules/login';



Vue.use(Vuex);


const vuexLocal = createPersistedState({
    key:'shcenter',
    storage: window.localStorage,
    reducer:state => ({account: state.account})
});

export default new Vuex.Store({
    modules: {
        sportNews,
        account
    },
    plugins: [vuexLocal]
});
