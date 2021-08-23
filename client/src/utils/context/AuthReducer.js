import React, { useReducer } from "react";
import jwtDecode from "jwt-decode";

let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
  : "";
let userId = token ? jwtDecode(token).userId : "";

export const initialState = {
  userId: "" || userId,
  token: "" || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        userId: jwtDecode(action.payload.token).userId,
        token: action.payload.token,
        errorMessage: "",
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        userId: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
