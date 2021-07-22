import { server } from "../config";
import { get, post } from "./global";

const BASE_URL = server + "sector";

export const getSectors = async () => {
  return await get(BASE_URL + "/all");
};

export const addSector = async (data) => {
  return await post(data, BASE_URL);
};
