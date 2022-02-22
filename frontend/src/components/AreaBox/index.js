import React from "react";
import styles from "./AreaBox.module.css";

function AreaBox({ area }) {
  return (
    <div className={styles.areaBoxWrapper}>
      <div className={styles.areaBoxContainer}>
        <div className={styles.areaBoxContainerLeft}>
          <div className={styles.areaImageDiv}>
            <img
              className={styles.areaImage}
              alt={"a glimpse of this area"}
              src={""}
            />
          </div>
        </div>
        <div className={styles.areaBoxContainerRight}>
          <h1 className={styles.areaName}>{area.name}</h1>
          <div className={styles.locationDiv}>
            <div className={styles.areaName}></div>
            <div className={styles.stateName}>{area?.State?.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaBox;
