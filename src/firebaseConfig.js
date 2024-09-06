import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


export const firebaseConfig = {
  apiKey: "AIzaSyDe2JX7MA0LYd7La4uDpVtrEtJOjaE_WaA",
  authDomain: "borderbuddy-7e1fb.firebaseapp.com",
  projectId: "borderbuddy-7e1fb",
  storageBucket: "borderbuddy-7e1fb.appspot.com",
  messagingSenderId: "797413686472",
  appId: "1:797413686472:web:2abf995db1bf8a98c539fd",
  measurementId: "G-XHP5SFZ0JG"
};

const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export const db = getFirestore(app);
