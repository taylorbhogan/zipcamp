import React from "react";
import styles from "./SpotBox.module.css";

function SpotBox({ spot }) {
  return (
    <a href={`/spots/${spot.id}`} className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.spotImageDiv}>
          <img
            className={styles.spotImage}
            alt={"a glimpse of this spot"}
            src={spot.SpotImages ? spot.SpotImages[0]?.imgUrl : null}
          />
        </div>
      </div>
      <div className={styles.containerRight}>
        <h1 className={styles.spotName}>{spot.name}</h1>
        <h2 className={styles.areaName}>{spot.Area?.name}</h2>
        <div className={styles.stateName}>{spot.State?.name}</div>
        <div className={styles.spotBlurb}>{spot.blurb}</div>
      </div>
    </a>
  );
}

export default SpotBox;
