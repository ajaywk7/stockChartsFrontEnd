import { server } from "../config";
import { get, put, post } from "./global";

const BASE_URL = server + "company/";
const ADMIN_URL = BASE_URL + "admin";

export const getCompanies = async () => {
  return await get(BASE_URL + "all");
};

export const searchCompanies = async (seacrhText) => {
  return await get(BASE_URL + "search/?searchText=" + seacrhText);
};

export const getCompany = async (id) => {
  return await get(BASE_URL + "?id=" + id);
};

export const getIpos = async () => {
  return await get(BASE_URL + "ipos");
};

export const getUpcomingIpos = async () => {
  return await get(BASE_URL + "ipos/upcoming");
};

export const getCompanySEList = async (id) => {
  return await get(BASE_URL + "stockExchanges/?companyId=" + id);
};

export const addCompany = async (data) => {
  return await post(data, ADMIN_URL);
};

export const editCompany = async (data) => {
  return await put(data, ADMIN_URL + "/?id=" + data.id);
};

export const addIpo = async (data) => {
  return await post(data, ADMIN_URL + "/ipo");
};
