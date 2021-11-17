// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDODyH7C46ss7pxLnXg0slJggHC1UCetKs",
  authDomain: "coke-cny.firebaseapp.com",
  projectId: "coke-cny",
  storageBucket: "coke-cny.appspot.com",
  messagingSenderId: "715312913877",
  appId: "1:715312913877:web:928320c8405fd7e6a4b15c",
  measurementId: "G-WT8TELMR4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const functions = getFunctions(app);

export { analytics, functions }
export default app;