import Vue from 'vue'
import Vuex from 'vuex'

import { db } from "../firebase"

export const IS_CONNECTED = 'IS_CONNECTED'
export const IS_CURRENT_USER = 'IS_CURRENT_USER'
export const SET_USERS = 'SET_USERS'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        connected: false,
        currentUser: "",
        users: []
    },
    getters: {

    },
    actions: {
        isConnected({ commit }, payload) {
            db.collection("users").doc(payload.id.toString()).set({ name: payload.name, avatar: payload.avatar })
            commit(IS_CONNECTED, true)
            commit(IS_CURRENT_USER, payload.id)
        },
        fetchUsers({ commit }) {
            db.collection("users").onSnapshot(querySnapshot => {
                let usersArray = []

                querySnapshot.forEach(doc => {
                    let user = doc.data()
                    user.id = doc.id
                    usersArray.push(user)
                })

                commit(SET_USERS, usersArray)
            })
        },
        disconnectUser({ commit }, payload) {
            db.collection("users").doc(payload.id.toString()).delete()
            commit(IS_CONNECTED, false)
        }
    },
    mutations: {
        [IS_CONNECTED](state, payload) {
            state.connected = payload
        },
        [IS_CURRENT_USER](state, payload) {
            state.currentUser = payload
        },
        [SET_USERS](state, payload) {
            state.users = payload
        }
    }
})
