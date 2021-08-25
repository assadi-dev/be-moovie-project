import React from "react";
import styles from "./style.module.css";

const SeparatorTitleStyle = ({ title }) => {
  return (
    <div className={styles.container}>
      <h5>{title}</h5>
      <hr />
    </div>
  );
};

export default SeparatorTitleStyle;
