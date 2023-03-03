// import * as firebase from "firebase";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

import { FIREBASE_API_KEY, FIREBASE_APP_ID } from "@env";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "sdg-app-6f9da.firebaseapp.com",
  projectId: "sdg-app-6f9da",
  storageBucket: "sdg-app-6f9da.appspot.com",
  messagingSenderId: "978460902699",
  appId: FIREBASE_APP_ID,
  measurementId: "G-NXWW1QT3WY",
};

app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
