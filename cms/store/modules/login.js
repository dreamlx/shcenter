/**
 * Created by 
 */
import types from '../mutation-types';


const state = {
    name: '',
    token:'',
    role: '',
    remembered:false
};

const mutations = {
    [types.ACCOUNT_LOGIN](state, {name,token,remembered, role}){
        state.name = name;
        state.token = token;
        state.remembered = remembered;
        state.role = role;
    },
    [types.ACCOUNT_LOGOUT](state, {}){
        state.name = '';
        state.token = '';
        state.remembered = false;
    }
};

const actions = {
    // getAccountType({commit}){
    //     Request.queryAccountType(
    //         {},
    //         function(result) {
    //             commit(types.CHANGE_ACCOUNT_TYPE, {accountType: result});
    //         }
    //     );
    // }
};

export default {
    state,
    mutations,
    actions
};
