import axios from 'axios';

// import * as tempSearchData from '../../testSearchDataTemp.json';
// import * as tempSearchData1 from '../../testSearchData1Temp.json';
// import * as tempSearchData2 from '../../testSearchData2Temp.json';
// import * as tempSearchData3 from '../../testSearchData3Temp.json';
import * as tempSearchData from '../../testSearchData.json';
import * as tempSearchData1 from '../../testSearchData1.json';
import * as tempSearchData2 from '../../testSearchData2.json';
import * as tempSearchData3 from '../../testSearchData3.json';
const data = tempSearchData.data;
const data1 = tempSearchData1.data;
const data2 = tempSearchData2.data;
const data3 = tempSearchData3.data;

export const CallProxy = async (searchParams, page) => {
  // *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
  // Return the test data to not use API calls

  switch (page) {
    case 1:
      console.log('returning Data0');
      return data;
      break;
    case 2:
      console.log('returning Data1');
      return data1;
      break;
    case 3:
      console.log('returning Data2');
      return data2;
      break;
    case 4:
      console.log('returning Data3');
      return data3;
      break;

    default:
      console.log('default returning Data');
      return data;
      break;
  }

  return;
  // *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

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

  if (employmentTypes && employmentTypes.length > 0) {
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

  if (experienceRequirements && experienceRequirements.length > 0) {
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
