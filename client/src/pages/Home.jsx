import { logout } from "../utils/context/AuthAction";
import { useAuthDispatch, useAuthState } from "../utils/context/AuthContext";
import { api } from "../components/Api";

const Home = (props) => {
  const userData = useAuthState();
  const dispatch = useAuthDispatch();
  const handleLogout = () => {
    logout(dispatch);
    props.history.push("/login");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <br />
      <p>Hello {userData.userId}</p>
      <p>My Token : {userData.token}</p>
      <p></p>
      <br />
      <button onClick={handleLogout}>Deconexion</button>
    </div>
  );
};

export default Home;
