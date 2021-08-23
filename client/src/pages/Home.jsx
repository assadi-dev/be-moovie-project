import { logout } from "../utils/context/AuthAction";
import { useAuthDispatch, useAuthState } from "../utils/context/AuthContext";

const Home = (props) => {
  const userData = useAuthState();
  const dispatch = useAuthDispatch(); // read dispatch method from context

  const handleLogout = () => {
    logout(dispatch); //call the logout action

    props.history.push("/login"); //navigate to logout page on logout
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
