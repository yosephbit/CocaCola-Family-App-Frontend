// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7eHH_ShU-HkU3cHO7etoarkL2v7-zL3g",
  authDomain: "coke-ar-filter.firebaseapp.com",
  projectId: "coke-ar-filter",
  storageBucket: "coke-ar-filter.appspot.com",
  messagingSenderId: "51333275674",
  appId: "1:51333275674:web:64f444a671239727de31a3",
  measurementId: "G-LTXS64G61T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const functions = getFunctions(app);

export { analytics, functions }
export default app;