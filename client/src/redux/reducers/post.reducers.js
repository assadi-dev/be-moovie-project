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

const initialState = {
  collections: [],
  current: [],
  isLoading: true,
};

const PostReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POST:
      return { ...state, collections: action.payload };
      break;
    case CREATE_POST:
      return { ...state };
      break;
    case EDIT_POST:
      return { ...state, current: action.payload };
      break;
    case DELETE_POST:
      return { ...state };
      break;

    case ADD_COMMENT:
      return { ...state };
      break;
    case EDIT_COMMENT:
      return { ...state, current: action.payload };
      break;
    case DELETE_COMMENT:
      break;

    case LIKE_POST:
      return {
        ...state,
        collections: state.collections.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              likers: [action.payload.userId, ...post.likers],
            };
          }
          return post;
        }),
      };

      break;
    case UNLIKE_POST:
      return {
        ...state,
        collection: state.collections.map((post) => {
          if (post._id == action.payload.postId) {
            return {
              ...post,
              likers: post.likers.filter(
                (liker) => liker !== action.payload.userId
              ),
            };
          }
          return post;
        }),
      };
      break;

    default:
      return state;
      break;
  }
};

export default PostReducers;
