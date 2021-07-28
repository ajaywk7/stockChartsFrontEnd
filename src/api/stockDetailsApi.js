import { server } from "../config";
import { post, get } from "./global";

const BASE_URL = server + "stockDetails/";
const ADMIN_URL = BASE_URL + "admin";

export const importData = async (jsonArray) => {
  const body = {
    stockDetails: jsonArray,
  };
  return await post(body, ADMIN_URL);
};

export const getCompanyAvg = async (
  companyId,
  startTime,
  endTime,
  companyName
) => {
  var response = await get(
    BASE_URL +
      "company/avg?companyId=" +
      companyId +
      "&startTime=" +
      startTime +
      "&endTime=" +
      endTime
  );
  if (response.error === true) {
    return { min: 0, max: 0, avg: 0 };
  }
  return response.message;
};

export const getCompanyDetails = async (
  companyId,
  startTime,
  endTime,
  companyName
) => {
  var data = await get(
    BASE_URL +
      "company/range?companyId=" +
      companyId +
      "&startTime=" +
      startTime +
      "&endTime=" +
      endTime
  );
  var results = {};
  data.message.map((row) => {
    var date = new Date(Date.parse(row.time));
    date = date.toLocaleDateString();
    //date = date.toLocaleDateString().split("/");
    // var time =
    //   date[2] +
    //   (date[1].length === 1 ? "-0" : "-") +
    //   date[1] +
    //   (date[0].length === 1 ? "-0" : "-") +
    //   date[0];
    var result = [date, row.stockPrice, companyName];
    if (!results[date]) {
      results[date] = [];
    }
    results[date].push(result);
  });
  Object.keys(results).map((time) => {
    var price = 0;
    results[time].map((data) => {
      price = price + data[1];
    });
    price = price / results[time].length;
    results[time] = [time, price, results[time][0][2]];
  });

  //results = Object.keys(results).map((time) => results[time]);
  //console.log(results);
  return results;
};
