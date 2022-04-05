import React from "react";
import parse from "html-react-parser";
import styles from "./AreaBox.module.css";

function AreaBox({ area }) {

  return (
    <div className={styles.areaBoxWrapper}>
      <div className={styles.areaBoxContainer}>
        <div className={styles.areaBoxContainerRight}>
          <h1 className={styles.areaName}>{area.name}</h1>
          <div className={styles.locationDiv}>{parse(area.description)}</div>
        </div>
      </div>
    </div>
  );
}

export default AreaBox;
