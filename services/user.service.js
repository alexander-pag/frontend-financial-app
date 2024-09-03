import api from "./api";

export const getAllUsers = async () => {
  try {
    const { data } = await api.get("/user");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOneUser = async (userId) => {
  try {
    const { data } = await api.get(`/user/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
