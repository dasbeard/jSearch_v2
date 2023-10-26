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
  const [dataLoading, setDataLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [savedPosts, setSavedPosts] = useState(null);
  const [savedPostsIDs, setSavedPostsIDs] = useState([]);
  const [updateSavedPosts, setUpdateSavedPosts] = useState(false);

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
      // console.log(doc.id);
      savedPosts.push(doc.data());
      savedPostsIDs.push(doc.id);
    });
    setSavedPosts(savedPosts);
    setSavedPostsIDs(savedPostsIDs);

    setUpdateSavedPosts(false);
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

  const RetreiveJobPosts = async (searchValues, mySavedPost) => {
    console.log('*-*-*- RetreiveJobPosts');
    // console.log('savedPostsIDs', savedPostsIDs);

    setDataLoading(true);

    await CallProxy(searchValues).then((searchResults) => {
      // Merge Posts with Saved Posts

      let myResults = [];
      searchResults.forEach((post) => {
        if (savedPostsIDs.includes(post.job_id)) {
          let myPost = savedPosts.find((ob) => ob.job_id == post.job_id);
          post = {
            ...post,
            saved: myPost.saved,
            applied: myPost.applied,
          };
        } else {
          post = { ...post, saved: false, applied: false };
        }
        myResults.push(post);
      });

      setSearchResults(myResults);
      setDataLoading(false);
    });
  };

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

        // Update state on screen change
        setUpdateSavedPosts(true);
      } else {
        //  Update Applied status
        await updateDoc(docRef, { applied: appliedStatus });

        const newList = savedPosts.map((el) => {
          if (el.job_id === postData.job_id) {
            return postData;
          }
          return el;
        });
        setSavedPosts(newList);
      }
    } else {
      // Create doc in Firestore
      postData = {
        ...postData,
        saved: false,
        applied: true,
      };
      setDoc(docRef, postData, { merge: true });

      setSavedPostsIDs([...savedPostsIDs, postData.job_id]);
      setSavedPosts([...savedPosts, postData]);
    }
  };

  const SetSavedStatus = async (uid, postData, savedStatus) => {
    console.log('-- Firestore.Context -- SetSavedStatus --');

    // UpdateSearchResultsSaveStatus(postData.job_id, savedStatus);

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

        // Update state on screen change
        setUpdateSavedPosts(true);
      } else {
        //  Update Applied status
        await updateDoc(docRef, { saved: savedStatus });

        const newList = savedPosts.map((el) => {
          if (el.job_id === postData.job_id) {
            return postData;
          }
          return el;
        });
        setSavedPosts(newList);
      }
    } else {
      // Create doc in Firestore
      postData = {
        ...postData,
        saved: true,
        applied: false,
      };
      setDoc(docRef, postData, { merge: true });

      setSavedPostsIDs([...savedPostsIDs, postData.job_id]);
      setSavedPosts([...savedPosts, postData]);
    }
  };

  const UpdateSearchResultsSaveStatus = (postID, savedStatus) => {
    console.log('**** UpdateSearchResults');

    // Not updating between screens - state isn't getting triggered

    const newResults = searchResults.map((post) => {
      if (post.job_id === postID) {
        return {
          ...post,
          saved: savedStatus,
        };
      } else {
        return post;
      }
    });

    setSearchResults(newResults);
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
        updateSavedPosts,
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
  // Need to delete SavedPosts SubCollection

  await deleteDoc(doc(FIREBASE_DB, 'users', uid));
};
