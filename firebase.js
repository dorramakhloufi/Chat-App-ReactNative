// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjh-wkG5Z_QoESf6ApypLmWxnnjHhP85Y",
  authDomain: "reactnativeproject-b5544.firebaseapp.com",
  projectId: "reactnativeproject-b5544",
  storageBucket: "reactnativeproject-b5544.appspot.com",
  messagingSenderId: "752606119108",
  appId: "1:752606119108:web:28a646e7e9b55a66d5b591",
  measurementId: "G-068H85W0WL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db,auth };
