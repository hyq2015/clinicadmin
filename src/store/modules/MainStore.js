// initial state
const state = {
        showMenu: true
    },
    /* eslint-disable  no-unused-vars*/
    actions = {
        handleMenuShow({ commit, state }, bool) {
            commit ("onHandleMenuShow", bool);
        }
    },
    mutations = {
        onHandleMenuShow(state, bool) {
            state.showMenu = bool;
        }
    };

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
