import instance from "../config/api";

export const userLogin = async (body : {}) => {
  try {
    const result = await instance.post("/api/users/login", body);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};


export const getFriendList = async (body : {}) => {
  try {
    const result = await instance.get("/api/users", body);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};
  