import { createContext, useState } from 'react';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  deleteUser,
} from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { FIREBASE_APP } from './firebase.initialization';
import {
  CreateNewRecord,
  DeleteData,
  // GetSearchParameters,
} from '../firestore/firestore.context';

const Firebase_Initial_Auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export const AuthContext = createContext();

export const AuthenticationContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  // const [searchParameters, setSearchParameters] = useState();

  onAuthStateChanged(FIREBASE_AUTH, (usr) => {
    if (usr) {
      setUser(usr);
    } else {
      setUser(false);
    }
  });

  const loginWithEmail = (email, password) => {
    setIsLoading(true);

    setTimeout(() => {
      signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then((usr) => {
          setUser(usr);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          logSetError(err, 'Login with Email');
        });
    }, 550);
  };
  // // Moved to firesrtore.service
  // const getUserData = async (uid) => {
  //   if (user) {
  //     setSearchParameters(await GetSearchParameters(uid));
  //   }
  // };

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
      setError(`Passwords Don't Match`);
      setIsLoading(false);
      return;
    }

    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((usr) => {
        setUser(usr);

        CreateNewRecord(usr.user.uid);

        setIsLoading(false);
      })
      .catch((err) => {
        logSetError(err, 'Register with Email');
        setIsLoading(false);
      });
  };

  const deleteAccount = async () => {
    const user = FIREBASE_AUTH.currentUser;
    setIsLoading(true);
    setTimeout(() => {
      deleteUser(user)
        .then(() => {
          DeleteData(user.uid);
          setDialogVisible(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log('Error while delete user', err);
          setDialogVisible(false);
          setIsLoading(false);
        });
    }, 250);
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
        error,
        isLoading,
        setError,
        loginWithEmail,
        registerWithEmail,
        logoutUser,
        deleteAccount,
        dialogVisible,
        setDialogVisible,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
