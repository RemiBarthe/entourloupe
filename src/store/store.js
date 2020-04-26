import Vue from 'vue'
import Vuex from 'vuex'

import { db } from "../firebase"

export const IS_CURRENT_USER = 'IS_CURRENT_USER'
export const SET_USERS = 'SET_USERS'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        currentRoom: null,
        isHost: null,
        users: []
    },
    getters: {

    },
    actions: {
        joinRoom({ commit }, payload) {
            const idRoom = payload.idRoom.toString()
            const idUser = payload.id.toString()

            db.collection("rooms").doc(idRoom).collection("users").doc(idUser).set({ name: payload.name, avatar: payload.avatar })
            commit(IS_CURRENT_USER, { id: payload.id, idRoom: payload.idRoom, isHost: payload.isHost })

            db.collection("rooms").doc(idRoom).collection("users").onSnapshot(querySnapshot => {
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
            const idUser = payload.id.toString()
            const idRoom = payload.idRoom.toString()

            db.collection("rooms").doc(idRoom).collection("users").doc(idUser).delete()
            commit(IS_CURRENT_USER, null)
        }
    },
    mutations: {
        [IS_CURRENT_USER](state, payload) {
            state.currentUser = payload.id
            state.currentRoom = payload.idRoom
            state.isHost = payload.isHost
        },
        [SET_USERS](state, payload) {
            state.users = payload
        }
    }
})
