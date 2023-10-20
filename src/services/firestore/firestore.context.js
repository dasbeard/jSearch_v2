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
} from 'firebase/firestore';
import { CallProxy } from '../search.service';

export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const FSContext = createContext();

export const FireStoreContext = ({ children }) => {
  const [fsSearchParameters, setFsSearchParameters] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedPostsIDs, setSavedPostsIDs] = useState([]);

  const RetreiveSearchValues = async (uid) => {
    console.log('*-*-*- RetreiveSettings');

    const docRef = doc(FIREBASE_DB, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log('Data:', docSnap.data());
      setFsSearchParameters(docSnap.data());
    } else {
      console.log('No data');
      // Set ERROR
      // temp params
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

    // if (collSnapShot.length > 0) {
    collSnapShot.forEach((doc) => {
      console.log(doc.id);
      savedPosts.push(doc.data());
      savedPostsIDs.push(doc.id);
    });
    setSavedPosts(savedPosts);
    setSavedPostsIDs(savedPostsIDs);
    // } else {
    //   console.log('No Posts');
    //   // Set ERROR ?
    // }
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

  const RetreiveJobPosts = async (searchValues) => {
    setDataLoading(true);

    CallProxy(searchValues).then((posts) => {
      // Merge Posts with Saved Posts
      let results = [];
      posts.forEach((post) => {
        if (savedPostsIDs.includes(post.job_id)) {
          post = {
            ...post,
            applied: post.applied === true ? true : false,
            saved: true,
          };
        } else {
          post = { ...post, applied: false, saved: false };
        }
        results.push(post);
      });

      setSearchResults(results);
      setDataLoading(false);
    });
  };

  const SavePost = (uid, postData, setApplied) => {
    console.log('-- Firestore.Context -- SavePost --');

    const docRef = doc(
      FIREBASE_DB,
      'users',
      uid,
      'savedPosts',
      postData.job_id
    );

    postData = {
      ...postData,
      saved: true,
      applied: setApplied ? setApplied : false,
    };
    setDoc(docRef, postData, { merge: true });

    setSavedPostsIDs([...savedPostsIDs, postData.job_id]);
    setSavedPosts([...savedPosts, postData]);
  };

  // const RemovePost = async (uid, postID) => {
  //   console.log('-- Firestore.Context -- RemovePost --');

  //   const docRef = doc(FIREBASE_DB, 'users', uid, 'savedPosts', postID);

  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     if (docSnap.data().applied) {
  //       postData = { ...postData, saved: false };
  //       setDoc(docRef, postData, { merge: true });
  //     } else {
  //       await deleteDoc(docRef);
  //     }
  //   }
  //   // const removed = data.filter(object => object.items.some(item => !item.isAvailable));
  //   // data = data.filter(item => !removed.includes(item));
  //   let newSavedPosts = []
  //    savedPosts.filter((post) => {
  //     if(post.job_id != postID){
  //       newSavedPosts.push(post)
  //     }
  //   });

  //   // Need to remove Post IDS

  //   setSavedPosts(newSavedPosts);
  //   // setSavedPostsIDs([...savedPostsIDs, postData.job_id]);
  // };

  return (
    <FSContext.Provider
      value={{
        RetreiveSearchValues,
        RetrieveSavedPosts,
        UpdateSearchQuery,
        RetreiveJobPosts,
        UpdateSearchParameters,

        dataLoading,
        fsSearchParameters,
        searchResults,
        savedPosts,
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
