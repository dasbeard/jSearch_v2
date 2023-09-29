import { FIREBASE_APP } from '../authentication/firebase.initialization';

import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const CreateNewRecord = async (uid) => {
  console.log('UID Passed in to CreateNewRecord - firesStore.Service', uid);

  const defaultSearchParameters = {
    employmentTypes: [],
    experienceRequirements: [],
    remoteOnly: false,
    searchDates: 'all',
  };

  try {
    await setDoc(doc(FIREBASE_DB, 'users', uid), {
      defaultSearchParameters,
      // searchParameters: {
      //   employmentTypes: [],
      //   experienceRequirements: [],
      //   remoteOnly: false,
      //   searchDates: 'all',
      // },
    });

    return defaultSearchParameters;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

export const DeleteData = async (uid) => {
  await deleteDoc(doc(FIREBASE_DB, 'users', uid));
};
