import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const myAxios = Axios.create({
  baseURL: 'http://192.168.0.7:7000',
});

const requestHandler = async request => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token && token.length > 0) {
      request.headers.Authorization = 'Bearer ' + token;
    }
  } catch (err) {}

  return request;
};

myAxios.interceptors.request.use(request => requestHandler(request));

export default myAxios;
