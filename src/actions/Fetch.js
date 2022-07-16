const BACKEND_URL = 'http://localhost:8000';

// eslint-disable-next-line no-unused-vars, camelcase
async function fetchBackendJSON(url, method, data_dict) {
 // eslint-disable-next-line camelcase
 const backend_url = `${BACKEND_URL}/${url}/`;
 const response = await fetch(backend_url, {
  method,
  mode: 'cors',
  cache: 'no-cache',
  headers: {
   'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(data_dict),
 });

 const data = await response.json();
 return data;
}

export default fetchBackendJSON;

// .then((res) => res.json())
//   .then((data) => {
//    console.log(data);
//    // if (data.success === true) {
//    //     return data;
//    // }

//    return data;
//   });
