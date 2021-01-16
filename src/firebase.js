import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAHYa94RbXaHAfp04JkcX4OSuJVop2Oo-k",
    authDomain: "limitelimite-42ab2.firebaseapp.com",
    databaseURL: "https://limitelimite-42ab2.firebaseio.com",
    projectId: "limitelimite-42ab2",
    storageBucket: "limitelimite-42ab2.appspot.com",
    messagingSenderId: "124803034423",
    appId: "1:124803034423:web:c71d2f300d37c0aa17feb2",
    measurementId: "G-MXHWP1DBK6"
})

firebase.analytics()

export const db = app.firestore()
