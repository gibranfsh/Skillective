import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChB7arfXAL65k3UBxF-_4OliT1ls_bzbI",
    authDomain: "firebasic-2.firebaseapp.com",
    databaseURL: "https://firebasic-2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "firebasic-2",
    storageBucket: "firebasic-2.appspot.com",
    messagingSenderId: "677321678276",
    appId: "1:677321678276:web:d21bbc2198c8cb3f7ad891"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };