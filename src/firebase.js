import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
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
const storage = getStorage(app);

export { auth, database, storage };