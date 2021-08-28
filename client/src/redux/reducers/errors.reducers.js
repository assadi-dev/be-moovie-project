const initialState = {
  profil: "",
  signIn: "",
  login: "",
  outher: "",
};

const ErrorReducers = (state = initialState, action) => {
  switch (action.type) {
    case "value":
      break;

    default:
      return state;
      break;
  }
};

export default ErrorReducers;
