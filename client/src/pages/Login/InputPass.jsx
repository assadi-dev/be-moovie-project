import { MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

const InputPass = ({ name, placeholder, onChange }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type={show ? "text" : "password"}
        name={name}
        id={name}
        onChange={onChange}
        placeholder={placeholder}
      />
      <span className={styles.showBtn}>
        <MDBIcon far icon={show ? "eye-slash" : "eye"} onClick={handleShow} />
      </span>
    </div>
  );
};

export default InputPass;
