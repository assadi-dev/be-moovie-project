import {
  EDIT_USER_DATA,
  EDIT_USER_PASSWORD,
  GET_DATA_USER,
} from "../actions/user.action";

const initialState = {
  id:""
  avatar: "",
  pseudo: "",
  email: "",
  postLikes: "",
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
        isLoading: false,
        id:action.payload.id,
        pseudo: action.payload.pseudo,
        avatar: action.payload.avatar,
        email: action.payload.email,
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
        isLoading: false,
        pseudo: action.payload.pseudo,
        avatar: action.payload.avatar,
        email: action.payload.email,
        presentation: action.payload.presentation,
      };
      break;
    case EDIT_USER_PASSWORD:
      return {
        ...state,
        isLoading: false,
        pseudo: action.payload.pseudo,
        avatar: action.payload.avatar,
        email: action.payload.email,
        presentation: action.payload.presentation,
      };
      break;

    default:
      return state;
      break;
  }
};

export default UserReducers;
