import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { api } from "../components/Api";

const StorageKey = "@MyAppOAuthKey";

export const setCookiesAuth = async (authState) => {
  return await Cookies.set(StorageKey, authState, {
    expires: 7,
    secure: true,
    sameSite: "Lax",
  });
};

export const removeCookiesAuth = async () => {
  try {
    if (Cookies.get(StorageKey)) {
      let value = Cookies.get(StorageKey);
      let authState = JSON.parse(value);

      await api.post("/auth/revokeToken", {
        refresh_token: authState.refreshToken,
      });

      await Cookies.remove(StorageKey);
      return authState;
    }
  } catch (error) {
    alert(`Failed to revoke token: ${error}`);
  }
};

const checkIfTokenExpired = ({ token }) => {
  let decodeToken = jwtDecode(token);
  let accessTokenExpirationDate = decodeToken.exp;

  return new Date(accessTokenExpirationDate * 1000) < new Date();
};

const refreshAuthAsync = async ({ refreshToken }) => {
  const result = await api.post("/auth/refreshToken", {
    refresh_token: refreshToken,
  });
  console.log("token refresh");
  setCookiesAuth(JSON.stringify(result.data));
  return result.data;
};

export const checkToken = () => {
  let authState = Cookies.get(StorageKey)
    ? JSON.parse(Cookies.get(StorageKey))
    : "";

  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }

  return null;
};
