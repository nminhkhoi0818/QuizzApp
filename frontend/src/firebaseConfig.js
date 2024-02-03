// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYsx5iqMgUdXNbU1UhbRpjj1VvaZdoGv0",
  authDomain: "quizzapp-fb7c7.firebaseapp.com",
  projectId: "quizzapp-fb7c7",
  storageBucket: "quizzapp-fb7c7.appspot.com",
  messagingSenderId: "744695740763",
  appId: "1:744695740763:web:d32507323be4a03488c27e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
