import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB2_GQ2dCYx-Vj0LfaEsIlkt4q9sceDUHY",
  authDomain: "addfire-7d04d.firebaseapp.com",
  projectId: "addfire-7d04d",
  storageBucket: "addfire-7d04d.appspot.com",
  messagingSenderId: "888681362437",
  appId: "1:888681362437:web:7da79aad8e32e8e71dd86c",
  measurementId: "G-0FWGJGN71F"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const storage = firebase.storage();

export { firestore, storage };
