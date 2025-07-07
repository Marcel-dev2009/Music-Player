// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkT8kPqkYyFVX-PxKxQhV6Th8yxOtAJ-g",
  authDomain: "muse-player-a4bf2.firebaseapp.com",
  projectId: "muse-player-a4bf2",
  storageBucket: "muse-player-a4bf2.firebasestorage.app",
  messagingSenderId: "465834400219",
  appId: "1:465834400219:web:659c8f4b6230d3f3182ffe",
  measurementId: "G-4EY1LCCBHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
 const storage = getStorage(app)
export { auth, db , storage };
