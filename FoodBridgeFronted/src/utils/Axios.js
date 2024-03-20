import axios from 'axios';
import Util from './CommonUtils';
import { navigationRef } from '../navigation';

const customAxios = axios.create({
  baseURL: 'http://192.168.8.107:3000',
  responseType: 'json',
  withCredentials: true,
});

const requestHandler = async (request) => {
  let data = await Util.getData('token')
  request.headers['Authorization'] = data?data:'';
  return request;
};

const responseHandler = response => {
  try {
    if (response.status === 401) {
      Util.storeData('token','')
      if(navigationRef.current.getCurrentRoute().name != 'Profile'){
        Util.showToast(response?.data?.error)
        navigationRef.navigate('Profile')
      }
    }
    return response;
  } catch (error) {

  }
};

const errorHandler = error => {
  if (error.response.status === 401) {
    Util.storeData('token','')
    if(navigationRef.current.getCurrentRoute().name != 'Profile'){
      Util.showToast(error?.response?.data?.error)
      navigationRef.navigate('Profile')
    }
  }
  return Promise.reject(error?.response);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;