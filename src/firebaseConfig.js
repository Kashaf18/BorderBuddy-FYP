import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDe2JX7MA0LYd7La4uDpVtrEtJOjaE_WaA",
  authDomain: "borderbuddy-7e1fb.firebaseapp.com",
  projectId: "borderbuddy-7e1fb",
  storageBucket: "borderbuddy-7e1fb.appspot.com",
  messagingSenderId: "797413686472",
  appId: "1:797413686472:web:2abf995db1bf8a98c539fd",
  measurementId: "G-XHP5SFZ0JG"
};

// Initialize Firebase only if it hasn't been initialized already
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Firestore and Storage instances
export const db = getFirestore(app);
export const storage = getStorage(app);
