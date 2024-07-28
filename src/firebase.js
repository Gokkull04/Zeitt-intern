import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOP3CF3anJ5PpoGLMh87ZmK51g00QRhbU",
  authDomain: "zeitt-intern.firebaseapp.com",
  projectId: "zeitt-intern",
  storageBucket: "zeitt-intern.appspot.com",
  messagingSenderId: "545886416003",
  appId: "1:545886416003:web:7745eada7a41179a21ffb6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
