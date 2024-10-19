// src/firebase.js
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANycqDHKrfjnkB-pAvI7nOBCU9kG_aNnw",
  authDomain: "planificalo-dd2d9.firebaseapp.com",
  projectId: "planificalo-dd2d9",
  storageBucket: "planificalo-dd2d9.appspot.com",
  messagingSenderId: "563226849144",
  appId: "1:563226849144:web:439ea6d9c04fbea702228d",
  measurementId: "G-360MN91QQ6",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
