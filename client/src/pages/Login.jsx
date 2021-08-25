import { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../utils/context/AuthAction";
import { useAuthDispatch } from "../utils/context/AuthContext";

const Login = () => {
  const [state, setState] = useState({ username: "", password: "" });
  const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook
  const history = useHistory();
  const handelChangeValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let email = state.username;
    let password = state.password;
    let payload = { email, password };

    // async request to the server
    try {
      let response = await loginUser(dispatch, payload);
      if (!response) return;
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handelChangeValue}
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handelChangeValue}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;