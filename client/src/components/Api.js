import axios from "axios";
import { useAuthState } from "../utils/context/AuthContext";
import Cookies from "js-cookie";

const StorageKey = "@MyAppOAuthKey";
const auth = Cookies.get(StorageKey);
const token = JSON.parse(auth).token;

export const api = axios.create({
  baseURL: process.env.APP_REACT_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
