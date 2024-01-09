// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhdeOJXQORMKEgl7XV7kZDPxD4kLAv_hw",
    authDomain: "email-pass-auth2-f4b1c.firebaseapp.com",
    projectId: "email-pass-auth2-f4b1c",
    storageBucket: "email-pass-auth2-f4b1c.appspot.com",
    messagingSenderId: "367840110720",
    appId: "1:367840110720:web:efd42625e628cae27e9e65",
    measurementId: "G-DPRVFRXQ63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;