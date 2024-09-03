import api from "./api";
import { getSession } from "./auth.service";

export const createTransaction = async ({
  account_id,
  amount,
  type,
  description,
  category_ids,
}) => {
  try {
    const userId = await getSession();
    const { data } = await api.post("/transaction", {
      account_id: "3b4fa180-9c34-4c05-97bc-500284052eba",
      amount: Number(amount),
      type,
      description,
      category_ids: ["0574f64a-c084-4083-885b-77cbc63be488"],
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTransactions = async () => {
  try {
    const userId = await getSession();
    const { data } = await api.get("/transaction");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOneTransactionById = async (id) => {
  try {
    const userId = await getSession();
    const { data } = await api.get(`/transaction/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
