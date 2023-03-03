// import * as firebase from "firebase";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi3k8lT7a3cKt0E85wOPnrQ2rXu8DH6I8",
  authDomain: "sdg-app-6f9da.firebaseapp.com",
  projectId: "sdg-app-6f9da",
  storageBucket: "sdg-app-6f9da.appspot.com",
  messagingSenderId: "978460902699",
  appId: "1:978460902699:web:7631411043a9a5a774716e",
  measurementId: "G-NXWW1QT3WY",
};

app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
