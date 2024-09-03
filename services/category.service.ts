import api from "./api";
import { getSession } from "./auth.service";

export const createCategory = async ({ name, type }) => {
  try {
    const userId = await getSession();
    const { data } = await api.post("/category", {
      user_id: userId,
      name,
      type,
      transaction_ids: ["bc90666c-eec5-4173-ab42-d93ccb85f3dc"],
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    const userId = await getSession();
    const { data } = await api.get("/category");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneCategoryById = async (id) => {
  try {
    const userId = await getSession();
    const { data } = await api.get(`/category/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
