import { combineReducers } from "redux";
import UserReducers from "./reducers/user.reducer";
import AllUsersReducers from "./reducers/allUsers.reducer";
import PostReducers from "./reducers/post.reducers";
import AllPostReducers from "./reducers/allPosts.reducers";
import NotificationReducers from "./reducers/notifications.reducers";
import TrendingMoviesReducers from "./reducers/trendingMovieReducer";
import PopularMoviesReducers from "./reducers/popularMoviesReducer";
import UpcomingMoviesReducers from "./reducers/upcomingMovieReducer";

const RootReducer = combineReducers({
  UserReducers,
  AllUsersReducers,
  PostReducers,
  AllPostReducers,
  NotificationReducers,
  TrendingMoviesReducers,
  PopularMoviesReducers,
  UpcomingMoviesReducers,
});

export default RootReducer;
