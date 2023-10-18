import axios from 'axios';
export const CallProxy = async (searchTerm, searchParams) => {
  // console.log('searchTerm:', searchTerm);
  // console.log('searchParameters:', searchParams);

  const { searchDates, remoteOnly, employmentTypes, experienceRequirements } =
    searchParams;

  const loc = searchParams.location ? searchParams.location : 'Los Angeles, CA';
  const query = `${searchTerm} in ${loc}`;

  const remote = remoteOnly ? `,"remoteOnly":true` : '';
  let empTypeString = '';
  let expReqString = '';

  if (employmentTypes.length > 0) {
    employmentTypes.forEach((type, _idx) => {
      if (type != '') {
        if (_idx > 0) {
          empTypeString += `,"${type}"`;
        } else {
          empTypeString += `"${type}"`;
        }
      }
    });
    empTypeString = `,"employmentTypes":[` + empTypeString + `]`;
  } else {
    empTypeString = '';
  }

  if (experienceRequirements.length > 0) {
    experienceRequirements.forEach((type, _idx) => {
      if (type != '') {
        if (_idx > 0) {
          expReqString += `,"${type}"`;
        } else {
          expReqString += `"${type}"`;
        }
      }
    });
    expReqString = `,"experienceRequirements":[` + expReqString + `]`;
  } else {
    expReqString = '';
  }

  const parameters = `{"searchDates":"${searchDates}"${remote}${empTypeString}${expReqString},"searchValue":"${query}"}`;

  const url = `http://127.0.0.1:5001/jobsearch-rn/us-central1/getList?params=${parameters}`;

  const Values = await GetResult(url);
  console.log(Values);
  console.log('Values type', typeof Values);
  return Values;
};

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// This function is ONLY returning undefined - need to fix and then append saved/applied to each obj

const GetResult = async (URL) => {
  console.log(URL);
  let data;
  await axios
    .get(URL)
    .then((response) => {
      // console.log('********** GetResults response: ', response.data);
      data = response.data.data;
      return response;
    })
    .catch((err) => {
      console.log('EEEEError:', err);
      return { error: err };
    });
};
