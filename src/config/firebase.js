import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCqsdtxNOuD9sDih1xFv8ra6CdHc_48Ni8",
    authDomain: "fahim-pushnotification.firebaseapp.com",
    projectId: "fahim-pushnotification",
    storageBucket: "fahim-pushnotification.appspot.com",
    messagingSenderId: "344809008260",
    appId: "1:344809008260:web:f41c5ba4f795cb924366d1"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

