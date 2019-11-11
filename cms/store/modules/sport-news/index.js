/**
 * Created by .
 */
import types from './types';
//import Request from "~/lib/request";

const state = {
    list: [],
};
const getters = {
    
};

const mutations = {
    [types.INIT_SPORT_NEWS_LIST](state, {list}){
        state.list = list;
    },
    [types.RESET_SPORT_NEWS_LIST](state){
        state.list = [];
    }
};

const actions = {
    // getParkingList({commit}, {brandStoreName}){
    //     Request.querySchedules({
    //         data: {brandStoreName}
    //     }, function (result) {
    //         commit(types.INIT_SCHEDULE_LIST, {
    //             list: result
    //         });
    //         // 避免element-select组件先触发value修改，后触发options修改时出现“无匹配数据”错误
    //         setTimeout(() => {
    //             if (result.length > 0) {
    //                 let schedule = result[0];
    //                 commit(types.CHANGE_SCHEDULE, schedule);
    //             } else {
    //                 commit(types.RESET_SCHEDULE);
    //             }
    //             commit(types.CHANGE_BRAND_CHANGE_FLAG);
    //         }, 0);
    //     });
    // }
};

export default {
    state,
    mutations,
    actions,
    getters
};
