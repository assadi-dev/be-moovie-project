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
  try {
    const result = await api.post("/auth/refreshToken", {
      refresh_token: refreshToken,
    });
    console.log("token refresh");
    setCookiesAuth(JSON.stringify(result.data));
    return result.data;
  } catch (error) {
    await Cookies.remove(StorageKey);
  }
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

//Check password

/**
 *
 * @param {string} value Mot de passe
 * @returns {string}
 * Verification des caracteres valide du mot de passe
 *
 */
export const validatePassword = (value) => {
  var p = value,
    errors = "";
  if (p.length < 6) {
    errors = "Votre mot de passe doit contenir au moins 6 caractere";
  }
  if (p.search(/[a-z]/) < 0) {
    errors = "Votre mot de passe doit contenir des lettres.";
  }
  if (p.search(/[A-Z]/) < 0) {
    errors = "Votre mot de passe doit contenir au moins 1 lettre en majuscule.";
  }
  if (p.search(/[0-9]/) < 0) {
    errors = "Votre mot de passe doit contenir au moins 1 valeur numerique.";
  }
  if (errors.length > 0) {
    return errors;
  }
  return "ok";
};

/**
 *
 * @param {string} value Mot de passe
 * @returns {string}
 *Comparaison des mot de passe
 *
 */
export const passworMatches = (value, confirm) => {
  if (value === confirm) {
    return "ok";
  } else {
    return "Les mot de passe ne correspondent pas.";
  }
};
