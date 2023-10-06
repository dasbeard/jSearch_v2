import { createContext, useState } from 'react';
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
  Timestamp,
} from 'firebase/firestore';

export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const FSContext = createContext();

export const FireStoreContext = ({ children }) => {
  const [searchParameters, setSearchParameters] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  const GetSearchParameters = async (uid) => {
    console.log('--Firestore.Service - GetSearchParameters--');

    if (!uid) {
      return null;
    }

    const docRef = doc(FIREBASE_DB, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { searchParameters } = docSnap.data();
      console.log('extracted data', searchParameters);
      setSearchParameters(searchParameters);
    } else {
      return {
        searchParameters: {
          location: 'Los Angeles, CA',
          employmentTypes: [''],
          experienceRequirements: [''],
          remoteOnly: false,
          searchDates: 'all',
        },
      };
    }
  };

  const GetSearchQuery = async (uid) => {
    const defaultQuery = 'React Native Developer';

    if (!uid) {
      return defaultQuery;
    }

    const docRef = doc(FIREBASE_DB, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { query } = docSnap.data();
      if (query) {
        setSearchQuery(query);
      } else {
        setSearchQuery(defaultQuery);
      }
    } else {
      setSearchQuery(defaultQuery);
    }
  };

  const UpdateSearchParameters = (key, value, uid) => {
    const docRef = doc(FIREBASE_DB, 'users', uid);

    switch (key) {
      case 'location':
        setSearchParameters((prevState) => ({
          location: value,
          searchDates: prevState.searchDates,
          remoteOnly: prevState.remoteOnly,
          employmentTypes: prevState.employmentTypes,
          experienceRequirements: prevState.experienceRequirements,
        }));

        setDoc(
          docRef,
          { searchParameters: { location: value } },
          { merge: true }
        );
      case 'remoteOnly':
        setSearchParameters((prevState) => ({
          location: prevState.location,
          searchDates: prevState.searchDates,
          remoteOnly: value,
          employmentTypes: prevState.employmentTypes,
          experienceRequirements: prevState.experienceRequirements,
        }));

        setDoc(
          docRef,
          { searchParameters: { remoteOnly: value } },
          { merge: true }
        );

        break;
      case 'searchDates':
        setSearchParameters((prevState) => ({
          location: prevState.location,
          searchDates: value,
          remoteOnly: prevState.remoteOnly,
          employmentTypes: prevState.employmentTypes,
          experienceRequirements: prevState.experienceRequirements,
        }));

        setDoc(
          docRef,
          { searchParameters: { searchDates: value } },
          { merge: true }
        );

        break;
      case 'employmentTypes':
        let newEmploymentTypes = searchParameters.employmentTypes;

        if (!newEmploymentTypes.length) {
          newEmploymentTypes = [value];
        } else if (newEmploymentTypes.includes(value)) {
          newEmploymentTypes = newEmploymentTypes.filter(
            (item) => item !== value
          );
        } else {
          newEmploymentTypes = [...newEmploymentTypes, value];
        }

        setSearchParameters((prevState) => ({
          location: prevState.location,
          searchDates: prevState.searchDates,
          remoteOnly: prevState.remoteOnly,
          employmentTypes: newEmploymentTypes,
          experienceRequirements: prevState.experienceRequirements,
        }));

        setDoc(
          docRef,
          { searchParameters: { employmentTypes: newEmploymentTypes } },
          { merge: true }
        );

        break;
      case 'experienceRequirements':
        let newRequirements = searchParameters.experienceRequirements;

        if (!newRequirements.length) {
          newRequirements = [value];
        } else if (newRequirements.includes(value)) {
          newRequirements = newRequirements.filter((item) => item !== value);
        } else {
          newRequirements = [...newRequirements, value];
        }

        setSearchParameters((prevState) => ({
          location: prevState.location,
          searchDates: prevState.searchDates,
          remoteOnly: prevState.remoteOnly,
          employmentTypes: prevState.employmentTypes,
          experienceRequirements: newRequirements,
        }));

        setDoc(
          docRef,
          { searchParameters: { experienceRequirements: newRequirements } },
          { merge: true }
        );
        break;

      default:
        break;
    }
  };

  const UpdateSearchQuery = (value, uid) => {
    const docRef = doc(FIREBASE_DB, 'users', uid);

    setDoc(docRef, { query: value }, { merge: true });
  };

  return (
    <FSContext.Provider
      value={{
        GetSearchParameters,
        UpdateSearchParameters,
        UpdateSearchQuery,
        GetSearchQuery,
        searchParameters,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </FSContext.Provider>
  );
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

export const CreateNewRecord = async (uid) => {
  console.log('UID Passed in to CreateNewRecord - firesStore.Service', uid);

  try {
    await setDoc(doc(FIREBASE_DB, 'users', uid), {
      userCreatedOn: Timestamp.now(),
      query: 'React Native Developer',
      searchParameters: {
        location: 'Los Angeles, CA',
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

export const DeleteData = async (uid) => {
  await deleteDoc(doc(FIREBASE_DB, 'users', uid));
};
