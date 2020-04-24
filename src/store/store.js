import Vue from 'vue'
import Vuex from 'vuex'

export const IS_CONNECTED = 'IS_CONNECTED'
export const IS_CURRENT_USER = 'IS_CURRENT_USER'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        connected: false,
        currentUser: "",
        users: {
        }
    },
    actions: {
        isConnected({ commit }, payload) {
            commit(IS_CONNECTED, true)
            commit(IS_CURRENT_USER, payload)
        }
    },
    mutations: {
        [IS_CONNECTED](state, payload) {
            state.connected = payload
        },
        [IS_CURRENT_USER](state, payload) {
            state.currentUser = payload
        }
    }
})
