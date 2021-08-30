import { LIKE_POST, UNLIKE_POST } from "../actions/post.action";
import {
  CLEAR_USER,
  EDIT_USER_DATA,
  EDIT_USER_PASSWORD,
  GET_DATA_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../actions/user.action";

const initialState = {
  id: "",
  avatar: "",
  pseudo: "",
  email: "",
  postLikes: [],
  followers: [],
  following: [],
  movies: { favories: [], likes: [] },
  series: { favories: [], likes: [] },
  createdAt: "",
  presentation: "",
  birthday: "",
  isLoading: true,
};

const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_USER:
      return {
        ...state,
        isLoading: action.payload._id ? false : true,
        id: action.payload._id,
        pseudo: action.payload.pseudo,
        avatar: action.payload.avatar,
        email: action.payload.email,
        postLikes: action.payload.postLikes,
        createdAt: action.payload.createdAt,
        presentation: action.payload.presentation,
        birthday: action.payload.birthday,
        following: action.payload.following,
        followers: action.payload.followers,
      };
      break;
    case EDIT_USER_DATA:
      return {
        ...state,

        pseudo: action.payload.pseudo,
        avatar: action.payload.avatar,
        email: action.payload.email,
        presentation: action.payload.presentation,
        isLoading: true,
      };
      break;
    case EDIT_USER_PASSWORD:
      return {
        ...state,

        pseudo: action.payload.pseudo,
        avatar: action.payload.avatar,
        email: action.payload.email,
        presentation: action.payload.presentation,
        isLoading: true,
      };
      break;
    case LIKE_POST:
      return {
        ...state,
        postLikes: action.payload.postLikes,
        isLoading: true,
      };
      break;
    case UNLIKE_POST:
      return {
        ...state,
        postLikes: action.payload.postLikes,
        isLoading: true,
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: action.payload.following,
        isLoading: true,
      };
      break;
    case UNFOLLOW_USER:
      return {
        ...state,
        following: action.payload.following,

        isLoading: true,
      };
      break;
    case CLEAR_USER:
      return {
        id: "",
        avatar: "",
        pseudo: "",
        email: "",
        postLikes: [],
        followers: [],
        following: [],
        movies: { favories: [], likes: [] },
        series: { favories: [], likes: [] },
        createdAt: "",
        presentation: "",
        birthday: "",
        isLoading: true,
      };
      break;

    default:
      return state;
      break;
  }
};

export default UserReducers;
