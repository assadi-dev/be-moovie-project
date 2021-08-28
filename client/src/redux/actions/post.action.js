import { api } from "../../components/Api";
export const GET_ALL_POST = "GET_ALL_POST";
export const READ_POST = "READ_POST";
export const CREATE_POST = "CREATE_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";

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
        .get(`/post/${id}`)
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

export const create_post = (data) => {
  return async (dispatch) => {
    try {
      api
        .post("/post/add", data)
        .then((res) => {
          dispatch({ type: CREATE_POST, payload: res.data });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error);
    }
  };
};
