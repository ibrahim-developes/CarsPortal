
import { initializeApp, FirebaseApp, getApps, getApp } from 'firebase/app';
import { Auth, getAuth, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDuEULIh-eiVwxjC2S_HZ-lKdLPXwskt2Q",
    authDomain: "carsportaldummy.firebaseapp.com",
    projectId: "carsportaldummy",
    storageBucket: "carsportaldummy.appspot.com",
    messagingSenderId: "388286209752",
    appId: "1:388286209752:android:56e58025eb3200f97f41ad"
  
  };

 let firebase= initializeApp(firebaseConfig);
 let auth = getAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});
   export default auth;

   
