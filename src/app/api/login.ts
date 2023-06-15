import instance from "../config/api";

export const userLogin = async (body : {}) => {
  try {
    const result = await instance.post("/users/login", body);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFriendList = async (body : {}) => {
  try {
    const result = await instance.get("/users", body);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (body : {}) => {
  try {
    const result = await instance.post("/users/register", body);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};
  
  