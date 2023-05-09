// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBwRFetCg-4Wecq_GFERWovdQGySELhQv4",
	authDomain: "project--with-mentor.firebaseapp.com",
	projectId: "project--with-mentor",
	storageBucket: "project--with-mentor.appspot.com",
	messagingSenderId: "211934609082",
	appId: "1:211934609082:web:3cf1a28c1117711ae70c83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
