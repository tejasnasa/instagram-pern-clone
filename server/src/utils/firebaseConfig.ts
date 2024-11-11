// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { config } from "dotenv";

config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: `${process.env.AUTH_DOMAIN}`,
  projectId: `${process.env.PROJECT_ID}`,
  storageBucket: `${process.env.STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.MESSAGING_SENDERID}`,
  appId: `${process.env.APPID}`,
  measurementId: `${process.env.MEASURE_ID}`,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
