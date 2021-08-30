import {
  ADD_COMMENT,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  EDIT_POST,
  GET_ALL_POST,
  LIKE_POST,
  UNLIKE_POST,
} from "../actions/post.action";
import { FOLLOW_USER, UNFOLLOW_USER } from "../actions/user.action";

const initialState = {
  collections: [],
  current: [],
  isLoading: true,
};

const PostReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POST:
      return { ...state, collections: action.payload, isLoading: false };
      break;
    case CREATE_POST:
      return { ...state, isLoading: true };
      break;
    case EDIT_POST:
      return { ...state, current: action.payload, isLoading: true };
      break;
    case DELETE_POST:
      return { ...state, isLoading: true };
      break;

    case ADD_COMMENT:
      return { ...state, isLoading: true };
      break;
    case EDIT_COMMENT:
      return { ...state, current: action.payload, isLoading: true };
      break;
    case DELETE_COMMENT:
      return { ...state, isLoading: true };
      break;

    case LIKE_POST:
      return { ...state, isLoading: true };
      break;
    case UNLIKE_POST:
      return { ...state, isLoading: true };
      break;

    default:
      return state;
      break;
  }
};

export default PostReducers;
