const initialState = {
  id: "",
  author: "",
  message: "",
  likers: [],
  comments: { id: "", author: "", pseudo: "", text: "", createdAt: "" },
  medias: { picture: [], audio: [], video: [] },
  createdAt: "",
  isLoading: true,
};

const PostReducers = (state = initialState, action) => {
  switch (action.type) {
    case "value":
      return {
        isLoading: false,
        id: action.payload.id,
        author: action.payload.author,
        message: action.payload.message,
        likers: action.payload.likers,
        comments: action.payload.comments,
        createdAt: action.payload.createdAt,
      };
      break;

    default:
      return state;
      break;
  }
};

export default PostReducers;
