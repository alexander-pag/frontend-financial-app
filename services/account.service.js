import api from "./api";
import { getSession } from "./auth.service";

export const createAccount = async ({ name, balance }) => {
  try {
    const userId = await getSession();
    const { data } = await api.post("/account", {
      name,
      balance: Number(balance),
      user_id: userId,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAccounts = async () => {
  try {
    const userId = await getSession();
    const { data } = await api.get("/account");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneAccountById = async (id) => {
  try {
    const userId = await getSession();
    const { data } = await api.get(`/account/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
