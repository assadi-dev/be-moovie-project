import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import {
  changePassword,
  edit_user_data,
  get_user,
} from "../../redux/actions/user.action";
import { useAuthState } from "../../utils/context/AuthContext";
import { passworMatches, validatePassword } from "../../services/Auth.sevices";

const EditProfile = ({ data }) => {
  const [state, setState] = useState({
    pseudo: data.pseudo,
    email: data.email,
    presentation: data.presentation,
  });

  const [changePass, setChangePass] = useState({
    password: "",
    confirmPassword: "",
    error: "",
  });

  const id = useAuthState().userId;

  const dispatch = useDispatch();

  const handleChangeValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleChangePassword = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setChangePass({ ...changePass, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      pseudo: state.pseudo,
      email: state.email,
      presentation: state.presentation,
    };
    dispatch(edit_user_data(id, data));
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    let password = changePass.password;
    let validation = validatePassword(password);
    let confirm = passworMatches(
      changePass.password,
      changePass.confirmPassword
    );

    if (validation !== "ok") {
      setChangePass({ ...changePass, error: validation });
      return false;
    } else if (confirm !== "ok") {
      setChangePass({ ...changePass, error: confirm });
      return false;
    }
    setChangePass({ ...changePass, error: "" });
    let data = {
      password: changePass.password,
      confirmPassword: changePass.confirmPassword,
    };

    dispatch(changePassword(id, data));
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div className={styles.editProfileWrapper}>
      <div className={styles.sectionPresentation}>
        <form
          className={classNames(styles.formPresentation, styles.formApparence)}
          onSubmit={handleSubmit}
        >
          <MDBInputGroup className="mb-3">
            <MDBInputGroupText noBorder>
              <MDBIcon far icon="user" />
            </MDBInputGroupText>
            <MDBInputGroupElement
              type="text"
              placeholder="Pseudo"
              name="pseudo"
              value={state.pseudo}
              onChange={handleChangeValue}
            />
          </MDBInputGroup>
          <MDBInputGroup className="mb-3">
            <MDBInputGroupText noBorder>
              <MDBIcon fas icon="at" />
            </MDBInputGroupText>
            <MDBInputGroupElement
              type="email"
              placeholder="Adresse email"
              name="email"
              value={state.email}
              onChange={handleChangeValue}
            />
          </MDBInputGroup>
          <MDBInputGroup>
            <MDBInputGroupText noBorder>
              <MDBIcon far icon="address-card" />
            </MDBInputGroupText>
            <MDBInputGroupElement
              textarea
              type="text"
              name="presentation"
              placeholder="Présentation"
              value={state.presentation}
              onChange={handleChangeValue}
            />
          </MDBInputGroup>
          <div className={styles.messageZone}>
            <p> </p>
          </div>
          <div className={styles.submitZone}>
            <MDBBtn color="info" type="submit">
              Enregistrer
            </MDBBtn>
          </div>
        </form>
        <hr />
        <h5>Changez de Mot de passe</h5>
        <form onSubmit={handleSubmitPassword}>
          <MDBInputGroup className="mb-3">
            <MDBInputGroupText noBorder>
              <MDBIcon far icon="eye" />
            </MDBInputGroupText>
            <MDBInputGroupElement
              type="password"
              placeholder="Nouveau mot de passe"
              name="password"
              onChange={handleChangePassword}
            />
          </MDBInputGroup>
          <MDBInputGroup className="mb-3">
            <MDBInputGroupText noBorder>
              <MDBIcon far icon="eye" />
            </MDBInputGroupText>
            <MDBInputGroupElement
              type="password"
              placeholder="Confirmé votre nouveau mot de passe"
              name="confirmPassword"
              onChange={handleChangePassword}
            />
          </MDBInputGroup>

          <div className={styles.messageZone}>
            {changePass.error && (
              <p className="text-danger">{changePass.error}</p>
            )}
          </div>

          <div className={styles.submitZone}>
            <MDBBtn color="info" type="submit">
              Enregistrer
            </MDBBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
