import 'whatwg-fetch';
import Client from 'harvest-api-client';

const client = new Client({
  url: process.env.REACT_APP_API_URL,
  token: process.env.REACT_APP_API_TOKEN
});


export default { client };
