const initialState = {
  id: "",
  author: "",
  message: "",
  likers: [],
  comments: { id: "", author: "", pseudo: "", text: "", createdAt: "" },
  medias: { picture: [], audio: [], video: [] },
  createdAt: "",
  isLoading: false,
};

const PostReducers = (state = initialState, action) => {
  switch (action.type) {
    case "value":
      break;

    default:
      return state;
      break;
  }
};

export default PostReducers;
