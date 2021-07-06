var firebase = require('firebase')

var firebaseConfig = {
    apiKey: "AIzaSyCUF1U2anf3q-HQaovu02j73J6XatmmEFc",
    authDomain: "spots-2385a.firebaseapp.com",
    projectId: "spots-2385a",
    storageBucket: "spots-2385a.appspot.com",
    messagingSenderId: "443388802865",
    appId: "1:443388802865:web:890b8ca24310474f1e2210"
  };
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(fire);

export {fire, db}