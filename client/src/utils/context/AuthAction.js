import axios from "axios";
import { setCookiesAuth, removeCookiesAuth } from "../../services/Auth.sevices";

const ROOT_URL = "http://127.0.0.1:6500/api/auth/login";

export const loginUser = async (dispatch, loginPayload) => {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await axios.post(ROOT_URL, loginPayload, {
      headers: { "Content-Type": "application/json" },
    });
    let data = response.data;

    if (data.token) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      setCookiesAuth(JSON.stringify(data));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: "erreur" });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error.response.data });
  }
};

export const logout = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
  await removeCookiesAuth();
};
