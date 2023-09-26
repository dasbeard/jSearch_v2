import { createContext, useState } from 'react';

import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

const Firebase_Initial_Auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export const AuthContext = createContext();

export const AuthenticationContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  onAuthStateChanged(FIREBASE_AUTH, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setUser(false);
      setIsLoading(false);
    }
  });

  const loginWithEmail = (email, password) => {
    setIsLoading(true);

    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((usr) => {
        setUser(usr);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        logSetError(err, 'Login with Email');
      });
  };

  const logoutUser = () => {
    signOut(FIREBASE_AUTH).then(() => {
      setUser(null);
      setError(null);
    });
  };

  const registerWithEmail = (email, password, confirmPassword) => {
    setIsLoading(true);

    if (
      password !== confirmPassword ||
      password === null ||
      confirmPassword === null
    ) {
      setIsLoading(false);
      setError(`Passwords Don't Match`);
      return;
    }

    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((usr) => {
        setUser(usr);
        setIsLoading(false);
      })
      .catch((err) => {
        logSetError(err, 'Register with Email');
        setIsLoading(false);
      });
  };

  // helper function
  const logSetError = (error, source) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const displayError = errorCode.replace('auth/', '');

    // setError(errorCode);
    setError(displayError);
    console.log('Error from:', source);
    console.log('Error Code:', errorCode);
    console.log('Error Message:', errorMessage);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        setError,
        loginWithEmail,
        registerWithEmail,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
