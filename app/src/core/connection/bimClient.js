import axios from 'axios';
import { DEFAULT_BASE_URL, API_VERSION } from "./constants";

const validToken = () => {
  const currentUser = JSON.parse(localStorage.getItem('usk'));
  return currentUser?.token;
}

const bimClient = axios.create({
  baseURL: `${DEFAULT_BASE_URL}/${API_VERSION}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    'Authorization': 'JWT ' + validToken()
  },
});

bimClient.interceptors.request.use(
  function(request){
    request.withCredentials = true;
    if(request.method == 'put'){
      const id = request.data['id'];
      if(id){
        request.url = request.url + '/' + id;
      }
    }
    request.headers['Authorization'] = 'JWT ' + validToken();
    return request;
  }
);

bimClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status === 401) {
      window.location.href = "#/auth/login";
    }
    if (res.status === 403) {
      window.location.href = "#/auth/login";
    }
    else if(res.status === 404){
      console.log('hehe, 404');
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);

export default bimClient;