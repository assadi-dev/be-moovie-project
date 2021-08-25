import { combineReducers } from "redux";
import UserReducers from "./reducers/user.reducer";
import AllUsersReducers from "./reducers/allUsers.reducer";
import PostReducers from "./reducers/post.reducers";
import AllPostReducers from "./reducers/allPosts.reducers";

const RootReducer = combineReducers({
  UserReducers,
  AllUsersReducers,
  PostReducers,
  AllPostReducers,
});

export default RootReducer;
