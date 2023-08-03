import firebase from 'firebase';
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBbum1rzINchraQbPayqOKMns-aJIn9W48",
    authDomain: "linkdin-clone-7c3a1.firebaseapp.com",
    projectId: "linkdin-clone-7c3a1",
    storageBucket: "linkdin-clone-7c3a1.appspot.com",
    messagingSenderId: "54178827016",
    appId: "1:54178827016:web:aff5c788eca17842d27abd"
  };


// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();


  export {auth,provider,storage};
  export default db;