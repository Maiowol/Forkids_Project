import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyApS390h7qbe8rji-j8xe6dv4-BfNEOYL4",
  authDomain: "ins-magazine.firebaseapp.com",
  projectId: "ins-magazine",
  storageBucket: "ins-magazine.appspot.com",
  messagingSenderId: "214654099482",
  appId: "1:214654099482:web:fb8e99c5b56cad0cb831a3",
  measurementId: "G-ZGLVNQMSMS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;