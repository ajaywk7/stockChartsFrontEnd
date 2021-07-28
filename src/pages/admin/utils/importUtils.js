import XLSX from "xlsx";
import { importData } from "../../../api/stockDetailsApi";

function XLtoJson(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: "binary",
        bookVBA: true,
      });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      resolve(data);
    };
    reader.readAsBinaryString(file);
  });
}

function validateJson(content) {
  return new Promise((resolve) => {
    content.forEach((row) => {
      if (
        !row["Company Code"] ||
        !row["Date "] ||
        !row["Price Per Share(in Rs)"] ||
        !row["Stock Exchange"] ||
        !row["Time"]
      ) {
        resolve(true);
      }
    });
    resolve(false);
  });
}

function processJson(content) {
  return content.map((row) => {
    var temp = {};
    temp.companyId = parseInt(row["Company Code"].trim());
    temp.stockExchangeName = row["Stock Exchange"].trim();
    temp.stockPrice = parseFloat(row["Price Per Share(in Rs)"].trim());
    var ds = row["Date "].trim().split("/");
    var ts = row["Time"].trim().split(":");
    //console.log(ts);
    var time = new Date(ds[2], ds[1] - 1, ds[0]);
    time.setUTCHours(ts[0]);
    time.setUTCMinutes(ts[1]);
    time.setUTCSeconds(ts[2]);
    time.setMonth(ds[1] - 1, ds[0]);
    temp.time = time.toISOString();
    // console.log(temp.time);
    return temp;
  });
}

export const validateAndConvert = async (file, setErrorMessage) => {
  try {
    var json = await XLtoJson(file);
    //console.log(json);
    let inValid = await validateJson(json);
    if (inValid) {
      throw new Error("validation error");
    }
    json = await processJson(json);
    setErrorMessage(false, "");
    return json;
  } catch (e) {
    console.log("error found ! " + e);
  }
  setErrorMessage(true, "Error validating file");
  return null;
};

export const apiCall = async (jsonArray, setErrorMessage) => {
  let apiResponse = await importData(jsonArray);
  console.log(apiResponse);
  if (apiResponse.error === true) {
    setErrorMessage(true, apiResponse.errorMessage);
  } else {
    setErrorMessage(
      false,
      "successfully updated " + jsonArray.length.toString() + " records"
    );
  }
};
