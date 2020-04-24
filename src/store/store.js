import Vue from 'vue'
import Vuex from 'vuex'

import { db } from "../firebase"

export const IS_CONNECTED = 'IS_CONNECTED'
export const IS_CURRENT_USER = 'IS_CURRENT_USER'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        connected: false,
        currentUser: "",
        users: []
    },
    getters: {
        getAllUsers() {
            db.collection("users").get().then((querySnapshot) => {
                querySnapshot.forEach((user) => {
                    console.log(user.data())
                })
            })
        }
    },
    actions: {
        isConnected({ commit }, payload) {
            db.collection("users").add({ id: payload.id, name: payload.name, avatar: payload.avatar })
            commit(IS_CONNECTED, true)
            commit(IS_CURRENT_USER, payload.id)
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
