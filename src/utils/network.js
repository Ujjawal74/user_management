// const API_URL = "http://localhost:5000"; // use it for local development
const API_URL = "https://goku01.pythonanywhere.com";

const STATUS = Object.freeze({
  WAITING: "waiting",
  IDLE: "idle",
  ERROR: "error",
});

// normal fetch get request and retrieving data
const getReq = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// normal fetch post request and retrieving data
const postReq = async (url, obj) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// normal fetch put request and retrieving data
const putReq = async (url, obj) => {
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// normal fetch delete request and retrieving data
const delReq = async (url) => {
  try {
    const res = await fetch(url, {
      method: "DELETE",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { API_URL, STATUS, getReq, postReq, putReq, delReq };
