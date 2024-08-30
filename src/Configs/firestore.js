import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5gm5oEX8uXr086DEtCLEiVgH3_L4Oz88",
  authDomain: "ar-application-35c3e.firebaseapp.com",
  projectId: "ar-application-35c3e",
  storageBucket: "ar-application-35c3e.appspot.com",
  messagingSenderId: "791180963944",
  appId: "1:791180963944:web:730e9f429001a21ff80bdd",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const storage = firebase.storage();

export { firestore, storage };
