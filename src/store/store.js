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
            db.collection("users").add({ id: payload.id, name: payload.name, avatar: payload.avatar })
            commit(IS_CONNECTED, true)
            commit(IS_CURRENT_USER, payload.id)
        },
        fetchUsers() {
            db.collection("users").onSnapshot(querySnapshot => {
                let usersArray = []

                querySnapshot.forEach(doc => {
                    let user = doc.data()
                    usersArray.push(user)
                })

                store.commit(SET_USERS, usersArray)
            })
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
