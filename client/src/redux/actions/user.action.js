import { api } from "../../components/Api";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_DATA_USER = "GET_DATA_USER";
export const EDIT_USER_DATA = "EDIT_USER_DATA";
export const EDIT_USER_PASSWORD = "EDIT_USER_PASSWORD";
export const CLEAR_USER = "CLEAR_USER";
export const FOLLOW_USER = "FOLLOW_USER ";
export const UNFOLLOW_USER = "UNFOLLOW_USER ";
export const CREATE_NOTIFICATION = "CREATE_NOTIFICATION";
export const GET_NOTIFICATION = "GET_NOTIFICATION";
export const UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION";
export const DELETE_NOTIFICATION = "UPDATE_NOTIFICATION";
export const DELETE_ALL_NOTIFICATION = "UPDATE_NOTIFICATION";

export const get_all_users = () => {
  return async (dispatch) => {
    try {
      await api
        .get("/user")
        .then((res) => {
          dispatch({ type: GET_ALL_USERS, payload: res.data });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };
};

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

export const clear_user = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: CLEAR_USER });
    } catch (error) {}
  };
};

/** Follow- Unfollow **/

/**
 *
 * @param {string} id L' ID de l'utilisateur à suivre
 */
export const follow_user = (id) => {
  return async (dispatch) => {
    try {
      await api
        .patch(`/user/follow/${id}`)
        .then((res) => {
          dispatch({ type: FOLLOW_USER, payload: res.data });
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
 * @param {string} id L' ID de l'utilisateur à retiré de la listes des suivis
 */
export const unfollow_user = (id) => {
  return async (dispatch) => {
    try {
      await api
        .patch(`/user/unfollow/${id}`)
        .then((res) => {
          dispatch({ type: UNFOLLOW_USER, payload: res.data });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };
};

/*** Notifications ***/

export const get_notification = (id) => {
  return async (dispatch) => {
    try {
      await api.get(`/user/${id}`).then((res) => {
        let cleanData = res.data.notifications;
        let data = cleanData.sort((a, b) => b.createdAt - a.createdAt);

        dispatch({ type: GET_NOTIFICATION, payload: data });
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const update_notification = (idNotification) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_NOTIFICATION, payload: idNotification });
    } catch (error) {
      console.log(error);
    }
  };
};
