import axios from "axios";
import Cookies from "js-cookie";

const ROOT_URL = "http://127.0.0.1:6500/api/auth/login";

const StorageKey = "@MyAppOAuthKey";

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await axios.post(ROOT_URL, loginPayload, {
      headers: { "Content-Type": "application/json" },
    });
    let data = response.data;

    if (data.token) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: "erreur" });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error.response.data });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
