const BACKEND_URL = 'http://localhost:8000';

// eslint-disable-next-line no-unused-vars, camelcase
async function fetchBackendJSON(url, method, dataDict) {
 // eslint-disable-next-line camelcase
 const backend_url = `${BACKEND_URL}/${url}/`;
 const fetchParams = {
  method,
  mode: 'cors',
  cache: 'no-cache',
  headers: {
   'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
 };

 if (method !== 'GET' && dataDict !== null) {
  fetchParams.body = JSON.stringify(dataDict);
 }
 const response = await fetch(backend_url, fetchParams);
 let data;
 if (method !== 'DELETE') {
  data = await response.json();
  return data;
 }
 return null;
}

export default fetchBackendJSON;
