import { api } from "../../components/Api";
export const GET_ALL_POST = "GET_ALL_POST";
export const READ_POST = "READ_POST";

export const get_all_post = () => {
  return async (dispatch) => {
    try {
      await api
        .get("/post")
        .then((res) => {
          dispatch({ type: GET_ALL_POST, payload: res.data });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const read_post = (id) => {
  return async (dispatch) => {
    try {
      await api
        .get(`post/${id}`)
        .then((res) => {
          dispatch({ type: READ_POST, payload: res.data });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };
};
