import React, { useState } from "react";
import parse from "html-react-parser";
import truncate from "truncate-html";
import styles from "./AreaBox.module.css";

function AreaBox({ area }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={styles.areaBox}
      onMouseDown={() => setIsOpen(!isOpen)}
    >
      <h1 className={styles.areaName}>{area.name}</h1>
      {/* <h2 className={styles.locationDiv}>{organizations[area?.orgID].name}</h2> */}
      <h2 className={styles.locationDiv}>{area.orgName}</h2>
      {isOpen ? (
        <div className={styles.locationDiv}>{parse(area.description)}</div>
      ) : (
        <div className={styles.locationDiv}>
          {truncate(area.description, 50, { stripTags: true })}
        </div>
      )}
    </div>
  );
}

export default AreaBox;
