import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDxlqfZqjZ-Pm_pM8R5vxmedsstah1LFp0",
    authDomain: "fireact-a9ef0.firebaseapp.com",
    projectId: "fireact-a9ef0",
    storageBucket: "fireact-a9ef0.appspot.com",
    messagingSenderId: "546070121947",
    appId: "1:546070121947:web:669ead0965db21f026ebfe",
    measurementId: "G-33YEQWKPB1"
  };

  const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);