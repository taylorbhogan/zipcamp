import React from "react";
import TipBox from "../TipBox";
import TipButton from "../TipButton";
import styles from "./TipsList.module.css";

function TipsList({ spot, tips }) {
  return (
    <div className={styles.container}>
      <TipButton spot={spot} />
      {tips.length > 0 && (
        <div className={styles.tips}>
          {tips.map((tip) => (
            <TipBox key={tip.id} tip={tip} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TipsList;
