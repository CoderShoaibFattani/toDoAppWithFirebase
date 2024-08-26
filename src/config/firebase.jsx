// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDsNFdLn8TQylOUtRyTXn4w9KCfCa427w",
  authDomain: "todoapp-98d61.firebaseapp.com",
  projectId: "todoapp-98d61",
  storageBucket: "todoapp-98d61.appspot.com",
  messagingSenderId: "735825736578",
  appId: "1:735825736578:web:3acda0193fb7292d03159b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
