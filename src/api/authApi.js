import { server } from "../config";
import { get, post } from "./global";

const BASE_URL = server + "auth";

export const authregister = async (data) => {
  return await post(data, BASE_URL + "/register");
};

export const authlogin = async (data) => {
  return await post(data, BASE_URL + "/login");
};
