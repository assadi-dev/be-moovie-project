import axios from "axios";
import Cookies from "js-cookie";

const StorageKey = "ssid";

const auth = Cookies.get(StorageKey) ? Cookies.get(StorageKey) : "";
const token = auth !== "" ? JSON.parse(auth).token : "";

export const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const apiMovie = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
