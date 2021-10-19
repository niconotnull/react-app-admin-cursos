const baseURL = 'http://localhost:8090/api';

const fetchSinToken = (endPoint, data, method = 'GET') => {
  const url = `${baseURL}/${endPoint}`;
  console.log('URL : ', url);
  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((err) => console.error(err));
  }
};

export { fetchSinToken };
