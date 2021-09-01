import {
  DELETE_ALL_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_NOTIFICATION,
  UPDATE_NOTIFICATION,
} from "../actions/user.action";

const initialState = [];

const NotificationReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION:
      return action.payload;
    case UPDATE_NOTIFICATION:
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, read: true };
        }
        return item;
      });
    case DELETE_NOTIFICATION:
      return state.filter((item) => item.id !== action.payload);
    case DELETE_ALL_NOTIFICATION:
      return [];
    default:
      return state;
  }
};

export default NotificationReducers;
