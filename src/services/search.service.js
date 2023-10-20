import axios from 'axios';

// export const CallProxy = async (searchTerm, searchParams) => {
export const CallProxy = async (searchParams) => {
  console.log(
    '*-*-*- CallProxy *-*-* -- searchTerm/searchParams',
    // searchTerm,
    searchParams
  );

  if (!searchParams) {
    console.log('*-*-*- CallProxy - no searchParams ');
    return false;
  }

  const {
    searchValue,
    searchDates,
    remoteOnly,
    employmentTypes,
    experienceRequirements,
  } = searchParams;

  const loc = searchParams.location ? searchParams.location : 'Los Angeles, CA';
  const query = `${searchValue} in ${loc}`;
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

  const baseURL =
    // 'http://127.0.0.1:5001/jobsearch-rn/us-central1/getList?params=';
    'https://getlist-twitpwxkva-uc.a.run.app?params=';

  const url = baseURL + parameters;
  console.log('CallProxy URL called:', url);

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        // console.log('********** GetResults got a response');
        return resolve(response.data.data);
      })
      .catch((err) => {
        console.log('EEEEError:', err);
        return reject({ error: err });
      });
  });
};
