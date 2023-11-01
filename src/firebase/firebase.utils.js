import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // * for the database
import "firebase/compat/auth";
// NOTE // * never a good practice to import everything because they are quite large but rarher follow this procedure that i did above

const firebaseConfig = {
  apiKey: "AIzaSyDjJ6WEPVhZNeHcWRFOlUcWmBl7tfYhYt4",
  authDomain: "crwn-db2-34ac5.firebaseapp.com",
  projectId: "crwn-db2-34ac5",
  storageBucket: "crwn-db2-34ac5.appspot.com",
  messagingSenderId: "656221167099",
  appId: "1:656221167099:web:8e260e6b860f4e0e0bff5e",
  measurementId: "G-H0YWVPXDTV",
};

firebase.initializeApp(firebaseConfig);

// * the configuration below is for google auth and you can check the firebase docs for more

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
