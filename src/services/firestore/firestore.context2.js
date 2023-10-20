import { createContext, useContext, useState } from 'react';
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
  const [searchParameters, setSearchParameters] = useState();
  const [currentQuery, setCurrentQuery] = useState('');
  const [searchModified, setSearchModified] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState('');
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedPostsIDs, setSavedPostsIDs] = useState([]);

  const GetSearchParameters = async (uid) => {
    console.log('--Firestore.Service - GetSearchParameters--');
    console.log('- FS - currentQuery:', currentQuery);

    if (!uid) {
      return null;
    }

    const docRef = doc(FIREBASE_DB, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { searchParameters } = docSnap.data();
      // console.log('extracted data', searchParameters);
      setSearchParameters(searchParameters);
    } else {
      const params = {
        searchParameters: {
          location: 'Los Angeles, CA',
          employmentTypes: [],
          experienceRequirements: [],
          remoteOnly: false,
          searchDates: 'all',
        },
      };
      setSearchParameters(params);
      UpdateSearchParameters(params, uid);
    }
    // RetrieveJobPosts(currentQuery, searchParameters, uid);
  };

  const GetSearchValue = async (uid) => {
    console.log('-- Firestore -- GetSearchValue --');

    const defaultQuery = 'React Developer';

    if (!uid) {
      return defaultQuery;
    }

    const docRef = doc(FIREBASE_DB, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { searchValue } = docSnap.data();

      console.log('searchValue', searchValue);

      if (searchValue) {
        setCurrentQuery(searchValue);
      } else {
        setCurrentQuery(defaultQuery);
        SetDeafultSearchValue(uid, defaultQuery);
      }
    } else {
      setCurrentQuery(defaultQuery);
      SetDeafultSearchValue(uid, defaultQuery);
    }

    // console.log('- FS - currentQuery:', currentQuery);
  };

  const SetDeafultSearchValue = (uid, value) => {
    const docRef = doc(FIREBASE_DB, 'users', uid);

    setDoc(docRef, { searchValue: value }, { merge: true });
  };

  const UpdateSearchParameters = (newParameters, uid) => {
    const docRef = doc(FIREBASE_DB, 'users', uid);

    setDoc(docRef, { searchParameters: newParameters }, { merge: true });

    setSearchParameters(newParameters);
    setSearchModified(false);

    // RetrieveJobPosts(currentQuery, newParameters, uid);
  };

  const UpdateSearchQuery = async (uid, newValue) => {
    const newQuery = newValue.trim();
    setCurrentQuery(newQuery);

    const docRef = doc(FIREBASE_DB, 'users', uid);
    setDoc(docRef, { searchValue: newQuery }, { merge: true });

    RetrieveJobPosts(newQuery, searchParameters, uid);
  };

  const RetrieveJobPosts = async (searchQuery, searchParams, uid) => {
    console.log(' *~*~*~*~*~* RetreiveJobPost ~*~*~*~*');

    setDataLoading(true);

    if (!searchParameters) {
      GetSearchParameters(uid);
    }

    await CallProxy(searchQuery, searchParams).then((ReturnValues) => {
      console.log(' *-*-*-*-*- RetrieveJobPosts *-*-*-*-*');
      console.log('ReturnValues', ReturnValues);

      if ((ReturnValues = false)) {
        return;
      }
      if (savedPostsIDs.length > 0) {
        MergePosts(ReturnValues);
      } else {
        // Get saved posts before merging
        RetrieveSavedPosts(uid);
        MergePosts(ReturnValues);
      }
    });
  };

  const MergePosts = (searchResults) => {
    let mergedResults = [];

    searchResults.forEach((post) => {
      if (savedPostsIDs.includes(post.job_id)) {
        post = {
          ...post,
          applied: post.applied ? post.applied : false,
          saved: true,
        };
      } else {
        post = { ...post, applied: false, saved: false };
      }
      mergedResults.push(post);
    });

    setSearchResults(mergedResults);
    setDataError(null);
    setDataLoading(false);
  };

  const SavePost = (uid, postData) => {
    console.log('-- Firestore.Context -- SavePost --');
    // console.log('postData: ', postData);

    const docRef = doc(
      FIREBASE_DB,
      'users',
      uid,
      'savedPosts',
      postData.job_id
    );

    postData = { ...postData, saved: true };

    setDoc(docRef, postData, { merge: true });

    setSavedPostsIDs([...savedPostsIDs, postData.job_id]);
    setSavedPosts([...savedPosts, postData]);
  };

  const RemoveSavedPost = async (uid, postData) => {
    // console.log('-- Firestore.Context -- RemoveSavePost --');

    const docRef = doc(
      FIREBASE_DB,
      'users',
      uid,
      'savedPosts',
      postData.job_id
    );

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);
    }
  };

  const RetrieveSavedPosts = async (uid) => {
    console.log('**** RetrieveSavedPosts');
    let posts = [];
    let postIDs = [];
    const querySnapshot = await getDocs(
      collection(FIREBASE_DB, 'users', uid, 'savedPosts')
    );

    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        // doc.data()
        postIDs.push(doc.id);
        posts.push(doc.data());
        // console.log(doc.id);
      });
    } else {
      console.log('no saved posts');
    }

    //  To Be Refactored
    setSavedPosts(posts);
    setSavedPostsIDs(postIDs);
  };

  return (
    <FSContext.Provider
      value={{
        GetSearchParameters,
        UpdateSearchParameters,
        UpdateSearchQuery,
        GetSearchValue,
        SavePost,
        RemoveSavedPost,
        RetrieveSavedPosts,
        RetrieveJobPosts,

        searchParameters,
        currentQuery,
        setCurrentQuery,
        searchModified,
        setSearchModified,

        searchResults,
        dataLoading,
        setDataLoading,
        dataError,
        setDataError,

        savedPosts,
        savedPostsIDs,
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
      searchParameters: {
        location: 'Los Angeles, CA',
        employmentTypes: [],
        experienceRequirements: [],
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
