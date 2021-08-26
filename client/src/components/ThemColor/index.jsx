import React from "react";
import styles from "./style.module.css";

const ThemeColor = ({ children }) => {
  return <div className={styles.bgDark}>{children}</div>;
};

export default ThemeColor;
