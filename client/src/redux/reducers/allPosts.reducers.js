import { GET_ALL_POST } from "../actions/post.action";

const initialState = {
  collections: [],
  isLoading: true,
};

const AllPostReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POST:
      return { ...state, isLoading: false, collections: action.payload };
      break;

    default:
      return state;
      break;
  }
};

export default AllPostReducers;
