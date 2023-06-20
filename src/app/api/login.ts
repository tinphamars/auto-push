import instance from "../config/api";

export const userLogin = async (body: {}) => {
  try {
    const result = await instance.post("/users/login", body);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFriendList = async (body: {}) => {
  try {
    const result = await instance.get("/users", body);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (body: {}) => {
  try {
    const result = await instance.post("/users/register", body);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getConversation = async () => {
  try {
    const result = await instance.get("/conversations");
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

// http://localhost:7171/api/messages/6491096923bfc5568de9681f
export const getMessageForRoom = async (id: string | null) => {
  console.log("call the api get message for id")
  try {
    const result = await instance.get(`/messages/${id}`);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};
