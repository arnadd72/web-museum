// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6Z0K0JqpHa9746IOaxToEgW5vGcL7X1w",
  authDomain: "purbatech-db719.firebaseapp.com",
  projectId: "purbatech-db719",
  storageBucket: "purbatech-db719.firebasestorage.app",
  messagingSenderId: "660872569420",
  appId: "1:660872569420:web:e1e2e6d1d8f0e450578ae9",
  measurementId: "G-5XDTEK12F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);