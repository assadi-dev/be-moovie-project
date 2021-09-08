import React from "react";
import InputPass from "./InputPass";
import styles from "./style.module.css";

const Signout = () => {
  return (
    <div className={styles.formSignUpContainer}>
      <form>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            placeholder="Pseudo"
            required
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="date"
            name="birthday"
            id="birthday"
            placeholder="Date de naissance"
          />
        </div>
        <InputPass name="password" placeholder="Mot de passe" />
        <InputPass
          name="confirmPassword"
          placeholder="Confirmer votre mot de passe"
        />
      </form>
    </div>
  );
};

export default Signout;
