// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFuCt9LJy6K0a_CpH9bOqQrw_b9NiI0gw",
  authDomain: "quizzapp-a8632.firebaseapp.com",
  projectId: "quizzapp-a8632",
  storageBucket: "quizzapp-a8632.appspot.com",
  messagingSenderId: "881817678892",
  appId: "1:881817678892:web:83c05777e20c7c9954cd89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
