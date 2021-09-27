import {
  ADD_MOVIE_FAVORIE,
  REMOVE_MOVIE_FAVORIE,
} from "../actions/movies.action";
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
  movies: [],
  series: [],
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
        movies: action.payload.movies,
        series: action.payload.series,
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
      };
      break;
    case LIKE_POST:
      return {
        ...state,
        postLikes: [...state.postLikes, action.payload.postId],
      };
      break;
    case UNLIKE_POST:
      return {
        ...state,
        postLikes: [
          state.postLikes.filter((liker) => liker !== action.payload.postId),
        ],
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: action.payload.following,
      };
      break;
    case UNFOLLOW_USER:
      return {
        ...state,
        following: action.payload.following,
      };
      break;

    case ADD_MOVIE_FAVORIE:
      return { ...state, movies: [action.payload.toString(), ...state.movies] };
      break;
    case REMOVE_MOVIE_FAVORIE:
      return {
        ...state,
        movies: state.movies.filter(
          (movie) => movie !== action.payload.toString()
        ),
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
        movies: [],
        series: [],
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
