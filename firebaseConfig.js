// import * as firebase from "firebase";
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_BUCKET,
  FIREBASE_PROJECT_ID,
  FIREBASE_PROJECT_SENDER_ID,
} from "@env";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_PROJECT_BUCKET,
  messagingSenderId: FIREBASE_PROJECT_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const rtdb = getDatabase(
  app,
  "https://bitebuddies-38265-default-rtdb.asia-southeast1.firebasedatabase.app"
);

export { auth, db, rtdb, storage };
