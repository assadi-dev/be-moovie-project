import { api } from "../../components/Api";
export const GET_DATA_USER = "GET_DATA_USER";

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
