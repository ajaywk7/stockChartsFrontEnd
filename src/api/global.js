class ApiResponse {
  constructor(status, message, errorMessage, details = []) {
    this.status = status;
    this.message = message;
    this.error = errorMessage ? true : false;
    this.errorMessage = errorMessage;
    this.details = details;
  }
}

export async function get(url) {
  try {
    const response = await fetch(encodeURI(url), {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
    const results = await response.json();
    return new ApiResponse(response.status, results, undefined);
  } catch (e) {
    console.log("get error : " + e);
    return new ApiResponse(null, null, e.toString());
  }
}

export const post = async (body, url) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: "follow",
  };

  try {
    let response = await fetch(url, requestOptions);
    let results = await response.json();
    if (response.status !== 200) {
      return new ApiResponse(
        response.status,
        null,
        results.message + " " + JSON.stringify(results.details),
        results.details
      );
    }
    return new ApiResponse(response.status, results, undefined);
  } catch (e) {
    console.log("post error : " + e);
    return new ApiResponse(null, null, e.toString());
  }
};

export const put = async (body, url) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: "follow",
  };

  try {
    let response = await fetch(url, requestOptions);
    let results = await response.json();
    if (response.status !== 200) {
      console.log(response);
      return new ApiResponse(
        response.status,
        null,
        results.message + " " + JSON.stringify(results.details)
      );
    }
    return new ApiResponse(response.status, results, undefined);
  } catch (e) {
    console.log("post error : " + e);
    return new ApiResponse(null, null, e.toString());
  }
};
