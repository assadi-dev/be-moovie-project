import { GET_UPCOMMING_MOVIES } from "../actions/movies.action";

const initialState = {
  collections: [],
  isLoading: true,
};

const UpcomingMoviesReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_UPCOMMING_MOVIES:
      return { ...state, isLoading: false, collections: action.payload };
      break;

    default:
      return state;
      break;
  }
};

export default UpcomingMoviesReducers;
