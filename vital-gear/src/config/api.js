import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/user",
});

export const addData = async (data) => {
  try {
    const res = await api.post("/signup", data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const loginupuser = async (data) => {
  try {
    const res = await api.post("/signin", data);
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
};
