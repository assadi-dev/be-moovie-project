import React, { useState } from "react";

import styles from "./style.module.css";

export const Tab = ({ title }) => <li className="tab-item">{title}</li>;

const TabsMedia = () => {
  return (
    <>
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <ul className={styles.tabList}>
            {/** Render of list of comonent */}
          </ul>
          <div className={styles.tabContent}>
            {/**Render the content of a Tab if is active */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsMedia;
