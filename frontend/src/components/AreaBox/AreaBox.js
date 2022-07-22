import React, { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";
import truncate from "truncate-html";
import SpotAddModal from "../SpotAddModal";
import styles from "./AreaBox.module.css";

function AreaBox({ area, selectedArea, setSelectedArea }) {
  const [isOpen, setIsOpen] = useState(false);
  const areaRef = useRef();

  useEffect(() => {
    if (selectedArea?.id === area.id) {
      areaRef.current.scrollIntoView({
        behavior: "smooth",
      });
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedArea, area]);

  const handleClick = () => {
    setSelectedArea(area);
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div ref={areaRef} className={styles.areaBox} onClick={handleClick}>
      <div className={styles.top}>
        <div>
          <h1 className={styles.areaName}>{area.name}</h1>
          <h2 className={styles.locationDiv}>{area.orgName}</h2>
        </div>
        <div className={styles.addSpotButtonWrapper}>
          <SpotAddModal selectedArea={area} />
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
