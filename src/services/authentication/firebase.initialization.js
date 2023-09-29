import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDrvn2kVVsX1B9K7LvyPffuNw_BeligVfE',
  authDomain: 'jobsearch-rn.firebaseapp.com',
  projectId: 'jobsearch-rn',
  storageBucket: 'jobsearch-rn.appspot.com',
  messagingSenderId: '317594152810',
  appId: '1:317594152810:web:288a860dc50446f8007f13',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
