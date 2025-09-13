// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF0UF7bR3BtRPESqNYxpW4gz5acq6mJ74",
  authDomain: "kadai-okodukai-app.firebaseapp.com",
  projectId: "kadai-okodukai-app",
  storageBucket: "kadai-okodukai-app.firebasestorage.app",
  messagingSenderId: "214755988377",
  appId: "1:214755988377:web:7db020a3610269d46cf908",
  measurementId: "G-16LXFTKQ0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;