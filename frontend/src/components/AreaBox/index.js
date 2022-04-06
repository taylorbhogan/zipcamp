import React, { useState } from "react";
import parse from "html-react-parser";
import truncate from "truncate-html";
import SpotAddModal from "../SpotAddModal"
import styles from "./AreaBox.module.css";

function AreaBox({ area }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.areaBox} onMouseDown={() => setIsOpen(!isOpen)}>
      <div className={styles.top}>
        <div>
          <h1 className={styles.areaName}>{area.name}</h1>
          <h2 className={styles.locationDiv}>{area.orgName}</h2>
        </div>
        <div>
          <SpotAddModal />
        </div>
      </div>
      {isOpen ? (
        <div className={styles.description}>{parse(area.description)}</div>
      ) : (
        <div className={styles.description}>
          {truncate(area.description, 190, { stripTags: true })}
        </div>
      )}
    </div>
  );
}

export default AreaBox;
