import {
  ADD_COMMENT,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  EDIT_POST,
} from "../actions/post.action";

const initialState = {
  id: "",
  author: "",
  message: "",
  likers: [],
  comments: { id: "", author: "", pseudo: "", text: "", createdAt: "" },
  medias: { picture: [], audio: [], video: [] },
  createdAt: "",
  isLoading: true,
};

const PostReducers = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        isLoading: false,
        id: action.payload.id,
        author: action.payload.author,
        message: action.payload.message,
        likers: action.payload.likers,
        comments: action.payload.comments,
        createdAt: action.payload.createdAt,
      };
      break;
    case EDIT_POST:
      return { ...state, isLoading: true };
      break;
    case DELETE_POST:
      return { ...state, isLoading: true };
      break;

    case ADD_COMMENT:
      return { ...state, isLoading: true };
      break;
    case EDIT_COMMENT:
      return { ...state, isLoading: true };
      break;
    case DELETE_COMMENT:
      return { ...state, isLoading: true };
      break;

    default:
      return state;
      break;
  }
};

export default PostReducers;
