import { createContext, useState } from 'react';
import { FIREBASE_APP } from '../authentication/firebase.initialization';
import {
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  Timestamp,
  collection,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { CallProxy } from '../search.service';

export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const FSContext = createContext();

export const FireStoreContext = ({ children }) => {
  const [fsSearchParameters, setFsSearchParameters] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [savedPosts, setSavedPosts] = useState(null);
  const [savedPostsIDs, setSavedPostsIDs] = useState([]);
  const [apiPageNum, setApiPageNum] = useState(1);

  const RetreiveSearchValues = async (uid) => {
    console.log('*-*-*- RetreiveSettings');

    const docRef = doc(FIREBASE_DB, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFsSearchParameters(docSnap.data());
    } else {
      console.log('No data');
      // Set ERROR ??
      const tempParams = {
        searchValue: 'React Developer',
        location: 'Los Angeles, CA',
        employmentTypes: [],
        experienceRequirements: [],
        remoteOnly: false,
        searchDates: 'all',
      };
      setFsSearchParameters(tempParams);
    }
  };

  const RetrieveSavedPosts = async (uid) => {
    console.log('*-*-*- RetrieveSavedPosts');
    const collSnapShot = await getDocs(
      collection(FIREBASE_DB, 'users', uid, 'savedPosts')
    );

    let savedPosts = [];
    let savedPostsIDs = [];

    collSnapShot.forEach((doc) => {
      savedPosts.push(doc.data());
      savedPostsIDs.push(doc.id);
    });
    setSavedPosts(savedPosts);
    setSavedPostsIDs(savedPostsIDs);
  };

  const UpdateSearchQuery = async (uid, newQuery) => {
    const docRef = doc(FIREBASE_DB, 'users', uid);
    setDoc(docRef, { searchValue: newQuery }, { merge: true });
    let currentParams = fsSearchParameters;
    currentParams.searchValue = newQuery;
    setFsSearchParameters(currentParams);

    RetreiveJobPosts(currentParams);
  };

  const UpdateSearchParameters = async (uid, newParameters) => {
    const docRef = doc(FIREBASE_DB, 'users', uid);

    setDoc(docRef, newParameters, { merge: true });

    let newParams = newParameters;
    newParams.searchValue = fsSearchParameters.searchValue;
    setFsSearchParameters(newParams);

    RetreiveJobPosts(newParams);
  };

  const RetreiveJobPosts = async (searchValues, pageNum = 1) => {
    console.log('*-*-*- RetreiveJobPosts');
    setDataLoading(true);

    console.log('pageNum', pageNum);
    console.log('apiPageNum', apiPageNum);

    const newSearchResults = await CallProxy(searchValues, pageNum);
    let newResultsList = [];

    // if (pageNum !== 1) {
    //   // Append results to currentList
    //   newResultsList = [...searchResults];
    // }

    // Check if saved and update obj
    newSearchResults.forEach((post) => {
      if (savedPostsIDs.includes(post.job_id)) {
        let thisPost = savedPosts.find((ob) => ob.job_id == post.job_id);
        post = {
          ...post,
          saved: thisPost.saved,
          applied: thisPost.applied,
        };
      } else {
        post = { ...post, saved: false, applied: false };
      }
      newResultsList.push(post);
    });

    setApiPageNum(pageNum + 1);
    // setSearchResults(newResultsList);
    setDataLoading(false);
    return newResultsList;
  };

  // const RetreiveJobPosts = async (searchValues) => {
  //   console.log('*-*-*- RetreiveJobPosts');
  //   setDataLoading(true);

  //   await CallProxy(searchValues, apiPageNum).then((searchResults) => {
  //     // Merge Posts with Saved Posts
  //     let myResults = [];
  //     searchResults.forEach((post) => {
  //       if (savedPostsIDs.includes(post.job_id)) {
  //         let myPost = savedPosts.find((ob) => ob.job_id == post.job_id);
  //         post = {
  //           ...post,
  //           saved: myPost.saved,
  //           applied: myPost.applied,
  //         };
  //       } else {
  //         post = { ...post, saved: false, applied: false };
  //       }
  //       myResults.push(post);
  //     });

  //     setSearchResults(myResults);
  //     setDataLoading(false);
  //   });
  // };

  const SetAppliedStatus = async (uid, postData, appliedStatus) => {
    console.log('-- Firestore.Context -- SetAppliedStatus --');

    const docRef = doc(
      FIREBASE_DB,
      'users',
      uid,
      'savedPosts',
      postData.job_id
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (!appliedStatus && !docSnap.data().saved) {
        // delete record
        await deleteDoc(docRef);
      } else {
        //  Update Applied status
        await updateDoc(docRef, { applied: appliedStatus });
      }
    } else {
      // Create doc in Firestore
      postData = {
        ...postData,
        saved: false,
        applied: true,
      };
      await setDoc(docRef, postData, { merge: true });
    }

    RetrieveSavedPosts(uid);
  };

  const SetSavedStatus = async (uid, postData, savedStatus) => {
    console.log('-- Firestore.Context -- SetSavedStatus --');

    const docRef = doc(
      FIREBASE_DB,
      'users',
      uid,
      'savedPosts',
      postData.job_id
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (!savedStatus && !docSnap.data().applied) {
        // delete record
        await deleteDoc(docRef);
      } else {
        //  Update Applied status
        await updateDoc(docRef, { saved: savedStatus });
      }
    } else {
      // Create doc in Firestore
      postData = {
        ...postData,
        saved: true,
        applied: false,
      };
      await setDoc(docRef, postData, { merge: true });
    }
    RetrieveSavedPosts(uid);
  };

  return (
    <FSContext.Provider
      value={{
        RetreiveSearchValues,
        RetrieveSavedPosts,
        UpdateSearchQuery,
        RetreiveJobPosts,
        UpdateSearchParameters,
        SetAppliedStatus,
        SetSavedStatus,

        dataLoading,
        fsSearchParameters,
        searchResults,
        savedPosts,

        apiPageNum,
        setApiPageNum,
      }}
    >
      {children}
    </FSContext.Provider>
  );
};

export const CreateNewRecord = async (uid) => {
  console.log('UID Passed in to CreateNewRecord - firesStore.Service', uid);

  try {
    await setDoc(doc(FIREBASE_DB, 'users', uid), {
      userCreatedOn: Timestamp.now(),
      searchValue: 'React Developer',
      location: 'Los Angeles, CA',
      employmentTypes: [],
      experienceRequirements: [],
      remoteOnly: false,
      searchDates: 'all',
    });
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

export const DeleteUsersData = async (uid) => {
  // Subcollection need to be deleted by fb Function
  // await deleteDoc(doc(FIREBASE_DB, 'users', uid, 'savedPosts'));
  await deleteDoc(doc(FIREBASE_DB, 'users', uid));
  return;
};
