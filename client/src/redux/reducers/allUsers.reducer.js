import {
  FOLLOW_USER,
  GET_ALL_USERS,
  UNFOLLOW_USER,
} from "../actions/user.action";

const initialState = {
  collections: [],
  current: [],
  isLoading: true,
};
const AllUsersReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, isLoading: false, collections: action.payload };
      break;
    case FOLLOW_USER:
      return { ...state, isLoading: true };
      break;
    case UNFOLLOW_USER:
      return { ...state, isLoading: true };
      break;
    default:
      return state;
      break;
  }
};

export default AllUsersReducers;
