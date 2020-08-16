import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyDN-nA5apj0cVBhLcBVU8GMVRvvCWrBMjk",
        authDomain: "facebook-messenger-clone-78690.firebaseapp.com",
        databaseURL: "https://facebook-messenger-clone-78690.firebaseio.com",
        projectId: "facebook-messenger-clone-78690",
        storageBucket: "facebook-messenger-clone-78690.appspot.com",
        messagingSenderId: "186049277658",
        appId: "1:186049277658:web:2eed5df5174eb943dfffe3",
        measurementId: "G-56LHW08MXM"
});

const db = firebaseApp.firestore();

export default db;