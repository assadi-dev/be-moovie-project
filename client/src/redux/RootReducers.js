import { combineReducers } from "redux";
import UserReducers from "./reducers/user.reducer";
import AllUsersReducers from "./reducers/allUsers.reducer";
import PostReducers from "./reducers/post.reducers";
import AllPostReducers from "./reducers/allPosts.reducers";
import NotificationReducers from "./reducers/notifications.reducers";

const RootReducer = combineReducers({
  UserReducers,
  AllUsersReducers,
  PostReducers,
  AllPostReducers,
  NotificationReducers,
});

export default RootReducer;
