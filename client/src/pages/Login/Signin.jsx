import { MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import React, { useState } from "react";
import InputPass from "./InputPass";
import styles from "./style.module.css";
import className from "classnames";
import { useAuthDispatch } from "../../utils/context/AuthContext";
import { useHistory } from "react-router";
import { loginUser } from "../../utils/context/AuthAction";

const Signin = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    loading: false,
    error: false,
    errorMessage: "",
  });

  const dispatch = useAuthDispatch();
  const history = useHistory();

  const handleChangeValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true, errorMessage: "", error: false });
    let email = state.email;
    let password = state.password;
    let payload = { email, password };

    try {
      let response = await loginUser(dispatch, payload);
      if (!response)
        return setState({
          ...state,
          loading: false,
          error: true,
          errorMessage: "Email ou Mot de passe incorrect !",
        });
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.formSignInContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChangeValue}
              required
            />
          </div>
          <InputPass
            name="password"
            placeholder="Mot de passe"
            onChange={handleChangeValue}
          />
        </div>

        <MDBBtn className={styles.signInBtn} color="danger">
          <span className={styles.textButton}>S'authentifier</span>
          {state.loading ? (
            <MDBSpinner
              className={styles.spinning}
              size="sm"
              role="status"
              tag="span"
            />
          ) : (
            ""
          )}
        </MDBBtn>

        <div className={styles.alertMessage}>
          <p className={className(styles.error, state.error && styles.slideUp)}>
            {state.errorMessage}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
