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
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { FIREBASE_APP } from './firebase.initialization';
import {
  CreateNewRecord,
  DeleteData,
  DeleteUsersData,
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

  const deleteAccount = async (userProvidedPassword) => {
    // console.log(userProvidedPassword);
    // setIsLoading(true);

    // const credential = EmailAuthProvider.credential(
    //   FIREBASE_AUTH.currentUser.email,
    //   userProvidedPassword
    // );

    // await reauthenticateWithCredential(FIREBASE_AUTH.currentUser, credential)
    //   .then((user) => {
    //     deleteUser(user)
    //       .then(() => {
    //         DeleteData(user.uid);
    //         setDialogVisible(false);
    //         setIsLoading(false);
    //       })
    //       .catch((err) => {
    //         console.log('Error while delete user', err);
    //         logSetError(err, 'Error Deleting User - Auth');
    //         setDialogVisible(true);
    //         setIsLoading(false);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log('Passord INCORRECT', err);
    //     logSetError(err, 'Error Deleting User - ReAuth');
    //     setDialogVisible(true);
    //     setIsLoading(false);
    //   });

    const user = FIREBASE_AUTH.currentUser;

    setIsLoading(true);

    console.log('Call Delete - 111');

    await DeleteUsersData(user.uid);

    deleteUser(user)
      .then(() => {
        console.log('User Deleted - 555');
        setDialogVisible(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Error while delete user', err);
        setDialogVisible(false);
        setIsLoading(false);
      });
  };

  // helper function
  const logSetError = (error, source) => {
    const errorCode = error.code;
    const errorMessage = error.message.replace('Firebase: ', `\n`);
    const displayError = errorCode.replace('auth/', '');

    if (
      source === 'Error Deleting User - ReAuth' ||
      source === 'Error Deleting User - Auth'
    ) {
      setError(`${displayError} ${errorMessage}`);
    } else {
      setError(displayError);
    }

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
