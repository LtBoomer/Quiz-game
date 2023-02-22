
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBF5baFrFP6taTRsFpguM95SktfXgULTi0",
  authDomain: "react-quiz-3f4bb.firebaseapp.com",
  projectId: "react-quiz-3f4bb",
  storageBucket: "react-quiz-3f4bb.appspot.com",
  messagingSenderId: "441043980625",
  appId: "1:441043980625:web:a4aa106479cb5d8f540370"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);