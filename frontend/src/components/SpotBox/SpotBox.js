import React from "react";
import styles from "./SpotBox.module.css";
import Image from "../parts/Image";

function SpotBox({ spot }) {
  return (
    <a href={`/spots/${spot.id}`} className={styles.container}>
      <div className={styles.spotImage}>
        <Image
          alt={"a glimpse of this spot"}
          src={spot.SpotImages[0]?.imgUrl}
        />
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
