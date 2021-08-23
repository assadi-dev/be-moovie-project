import axios from "axios";
import Cookies from "js-cookie";

const StorageKey = "@MyAppOAuthKey";
const auth = Cookies.get(StorageKey);
const token = JSON.parse(auth).token;

console.log(process.env.REACT_APP__URL);

export const api = axios.create({
  baseURL: "http://localhost:6500/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
