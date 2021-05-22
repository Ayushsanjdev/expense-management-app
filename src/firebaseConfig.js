import firebase from 'firebase';
import firestore from 'firebase/firestore';

const FirebaseConfig = {
	apiKey: "AIzaSyC019_wLNH0aXwn-1YTdcYdC8Fa9xdDv0M",
  authDomain: "expense-tracker-app-1ae09.firebaseapp.com",
  projectId: "expense-tracker-app-1ae09",
  storageBucket: "expense-tracker-app-1ae09.appspot.com",
  messagingSenderId: "35989782938",
  appId: "1:35989782938:web:15737cd5413da9c6cc7a23"
};

firebase.initializeApp(FirebaseConfig);

const db = firebase.firestore();

export default FirebaseConfig;