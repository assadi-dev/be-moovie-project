import { useState } from "react";
import styles from "./style.module.css";
import Signin from "./Signin";
import Signout from "./Signout";

const Login = () => {
  const [state, setState] = useState({ signIn: true, signUp: false });

  const handleChangeToSignUp = () => {
    setState({ ...state, signIn: false, signUp: true });
  };

  const handleChangeToSignIn = () => {
    setState({ ...state, signIn: true, signUp: false });
  };

  return (
    <div className={styles.container}>
      <h1>BeeMoovie</h1>
      <div className={styles.wrapper}>
        <div className={styles.translateView}>
          {state.signIn && <Signin />} {state.signUp && <Signout />}{" "}
        </div>
        <div className={styles.optionText}>
          {state.signIn ? (
            <>
              <p>
                Vous n'avez pas de compte ?
                <span
                  className={styles.switchBtn}
                  onClick={handleChangeToSignUp}
                >
                  Inscrivez-vous
                </span>
              </p>
              <a href="#">Mot de passe oublié</a>
            </>
          ) : (
            <p>
              Vous avez un compte ?
              <span className={styles.switchBtn} onClick={handleChangeToSignIn}>
                Connectez-vous
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
