import "firebase/firestore"
import "firebase/auth"
import firebase from 'firebase';
  

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfmbQsBLcxgJMvhAHU2tWi4trCIAmIewM",
  authDomain: "signal-clone-6fca9.firebaseapp.com",
  projectId: "signal-clone-6fca9",
  storageBucket: "signal-clone-6fca9.appspot.com",
  messagingSenderId: "179211633162",
  appId: "1:179211633162:web:511786ac86d8e1ee6595f3",
  measurementId: "G-74G9K9Q70K"
};

let app;
  if(firebase.apps.length === 0)
  {
    app = firebase.initializeApp(firebaseConfig);
  }
  else {
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export  { db, auth };