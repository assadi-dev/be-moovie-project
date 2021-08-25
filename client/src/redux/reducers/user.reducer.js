const initialState = {
  avatar: "",
  email: "",
  postLikes: "",
  followers: "",
  following: "",
  movies: { favories: [], likes: [] },
  series: { favories: [], likes: [] },
  createdAt: "",
  isLoading: false,
};

const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    case "value":
      break;

    default:
      return state;
      break;
  }
};

export default UserReducers;
