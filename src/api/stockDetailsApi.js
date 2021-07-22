import { server } from "../config";
import { post } from "./global";

const BASE_URL = server + "stockDetails/";
const ADMIN_URL = BASE_URL + "admin";

export const importData = async (jsonArray) => {
  const body = {
    stockDetails: jsonArray,
  };
  return await post(body, ADMIN_URL);
};
