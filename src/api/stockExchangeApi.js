import { server } from "../config";
import { get, post } from "./global";

const BASE_URL = server + "stockexchange";

export const getStockExchanges = async () => {
  return await get(BASE_URL + "/all");
};

export const addStockExchange = async (data) => {
  return await post(data, BASE_URL);
};

export const addCompanyToStockExchang = async (companyId, stockExchangeId) => {
  await get(
    BASE_URL +
      "/addCompany?companyId=" +
      companyId +
      "&stockExchangeId=" +
      stockExchangeId
  );
};
