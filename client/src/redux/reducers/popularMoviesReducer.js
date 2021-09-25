import { GET_POPULAR_MOVIES } from "../actions/movies.action";

const initialState = {
  collections: [],
  isLoading: true,
};

const PopularMoviesReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_POPULAR_MOVIES:
      return { ...state, isLoading: false, collections: action.payload };
      break;

    default:
      return state;
      break;
  }
};

export default PopularMoviesReducers;
