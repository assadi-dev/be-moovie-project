import { GET_TRENDING_MOVIES } from "../actions/movies.action";

const initialState = {
  collections: [],
  isLoading: true,
};

const TrendingMoviesReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRENDING_MOVIES:
      return { ...state, isLoading: false, collections: action.payload };
      break;

    default:
      return state;
      break;
  }
};

export default TrendingMoviesReducers;
