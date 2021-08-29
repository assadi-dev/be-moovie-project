import { api } from "../../components/Api";
export const GET_ALL_POST = "GET_ALL_POST";
export const READ_POST = "READ_POST";
export const CREATE_POST = "CREATE_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

/**Action Post ***/

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
/**Action Comments */
export const add_comment = (id, data) => {
  return async (dispatch) => {
    try {
      await api
        .patch(`/post/comment/add/${id}`, data)
        .then((res) => {
          dispatch({ type: ADD_COMMENT, payload: res.data });
        })
        .then((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 *
 * @param {any} id id du post
 * @returns {string}
 */
export const edit_comment = (id, data) => {
  return async (dispatch) => {
    try {
      await api
        .patch(`/post/comment/edot/${id}`, data)
        .then((res) => {
          dispatch({ type: EDIT_COMMENT, payload: res.data });
        })
        .then((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const delete_comment = (id) => {
  return async (dispatch) => {};
};

/**Action Like & Unlike Post **/

/**
 *
 * @param {any} id id du post
 * @returns
 */
export const like_post = (id) => {
  return async (dispatch) => {
    try {
      await api
        .patch(`/user/postLike/add/${id}`)
        .then((res) => {
          dispatch({ type: LIKE_POST, payload: res.data });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 *
 * @param {any} id id du post
 * @returns
 */
export const unlike_post = (id) => {
  return async (dispatch) => {
    try {
      await api
        .patch(`/user/postLike/remove/${id}`)
        .then((res) => {
          dispatch({ type: UNLIKE_POST, payload: res.data });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };
};
