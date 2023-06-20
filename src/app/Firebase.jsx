// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqBKBZvzesX47pimF3G_ki4_4QofOZ8jI",
  authDomain: "helpdev-6cab6.firebaseapp.com",
  projectId: "helpdev-6cab6",
  storageBucket: "helpdev-6cab6.appspot.com",
  messagingSenderId: "900433594340",
  appId: "1:900433594340:web:bbaf6003d52a9f0122a9f1",
  measurementId: "G-9ZVBCZQVD2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
