import { FIREBASE_APP } from '../authentication/firebase.initialization';

import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore';

export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const CreateNewRecord = async (uid) => {
  console.log('UID Passed in to CreateNewRecord - firesStore.Service', uid);

  try {
    await setDoc(doc(FIREBASE_DB, 'users', uid), {
      searchParameters: {
        employmentTypes: [''],
        experienceRequirements: [''],
        remoteOnly: false,
        searchDates: 'all',
      },
    });
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

export const GetSearchParameters = async (uid) => {
  const docRef = doc(FIREBASE_DB, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { searchParameters } = docSnap.data();
    console.log('--Firestore.Service - GetSearchParameters--');
    console.log('extracted data', searchParameters);
    return searchParameters;

    // const docData = docSnap.data();
    // console.log('doc Data', docData);
    // const searchParams = docData.searchParameters;
    // return searchParams;
  } else {
    return {};
  }
};

// Not Tested
// export const GetSavedPosts = async (uid) => {
//   // Not Tested

//   const collectionRef = collection(FIREBASE_DB, 'users', uid, 'savedPosts');
//   const savedPosts = await getDocs(collectionRef);

//   savedPosts.forEach((doc) => {
//     console.log(doc.id, ' => ', doc.data());
//   });
// };

export const DeleteData = async (uid) => {
  await deleteDoc(doc(FIREBASE_DB, 'users', uid));
};
