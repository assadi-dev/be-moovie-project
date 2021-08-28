import { api } from "../../components/Api";
export const GET_DATA_USER = "GET_DATA_USER";
export const EDIT_USER_DATA = "EDIT_USER_DATA";
export const EDIT_USER_PASSWORD = "EDIT_USER_PASSWORD";

export const get_user = (id) => {
  return async (dispatch) => {
    try {
      await api.get(`/user/${id}`).then((res) => {
        dispatch({ type: GET_DATA_USER, payload: res.data });
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const edit_user_data = (id, data) => {
  return async (dispatch) => {
    try {
      await api
        .put(`/user/${id}`, data)
        .then((res) => {
          dispatch({ type: EDIT_USER_DATA, payload: res.data });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const changePassword = (id, data) => {
  return async (dispatch) => {
    try {
      await api
        .patch(`/user/password/${id}`, data)
        .then((res) => {
          dispatch({ type: EDIT_USER_PASSWORD, payload: res.data });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error);
    }
  };
};
