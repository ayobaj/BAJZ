// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration



const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE,
    authDomain: "bajz-blog.firebaseapp.com",
    projectId: "bajz-blog",
    storageBucket: "bajz-blog.appspot.com",
    messagingSenderId: "571691068480",
    appId: "1:571691068480:web:297787c8833629ce3783a5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

