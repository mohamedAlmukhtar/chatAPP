import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgj5I4Afwq6k9KMGtHJFi7D1p09XrvylI",
    authDomain: "chatapp-c0f3d.firebaseapp.com",
    projectId: "chatapp-c0f3d",
    storageBucket: "chatapp-c0f3d.appspot.com",
    messagingSenderId: "58400970258",
    appId: "1:58400970258:web:427ed1070575e7622b6acb",
    measurementId: "G-0HC322FDL7"
};

const firebaseapp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider } 