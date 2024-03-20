import Axios from '../utils/Axios';

export const login = async data => {
  try {
    const result = await Axios.post('/user/login', data);
    return result;
  } catch (error) {
    return error;
  }
};

export const register = async data => {
  try {
    const result = await Axios.post('/user/create',data);
    return result;
  } catch (error) {
    return error;
  }
};

export const getUserDetails = async data => {
  try {
    const result = await Axios.get('/user',data);
    return result;
  } catch (error) {
    return error;
  }
};

export const getUserAddressDetails = async data => {
  try {
    const result = await Axios.get('/user/address',data);
    return result;
  } catch (error) {
    return error;
  }
};

export const postFoodDetails = async data => {
  try {
    // console.log("welcome",data) 
    const result = await Axios.post('/food/postfood',data);
    // console.log("result",result)
    return result;
  } catch (error) {
    console.log("error",error)
    return error;
  }
};

export const getFoodDetails = async data => {
  try {
//    console.log("welcome") 
    const result = await Axios.get('/food/postfood',data);
//    console.log("result",result)
    return result;
  } catch (error) {
    // console.log("error",error)
    return error;
  }
};

export const getAllFoodDetails = async data => {
  try {
    console.log("inn")
    const result1 = await Axios.get('/food/allpost');
    const result = result1.data
    console.log("api started",result)
    return result;
  } catch (error) {
    console.log("error",error)
    return error;
  }
};

export const userLogOut = async () => {
  try {
    const result = await Axios.get('/user/logout');
    return result;
  } catch (error) {
    return error;
  }
};
export const addUserAddressDetails = async data => {
  try {
    const result = await Axios.post('/user/address',data);
    return result;
  } catch (error) {
    return error;
  }
};
