import React from "react";
import styles from "./style.module.css";

const SeparatorTitleStyle = ({ title, style }) => {
  return (
    <div className={styles.container} style={style}>
      <h5>{title}</h5>
      <hr />
    </div>
  );
};

export default SeparatorTitleStyle;
