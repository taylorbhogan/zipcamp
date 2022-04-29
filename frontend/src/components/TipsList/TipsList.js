import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTips } from "../../store/tips";

import styles from "./TipsList.module.css";
import TipBox from "../TipBox";
import TipButton from "../TipButton";

function TipsList({ spot }) {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const tips = useSelector((state) => Object.values(state.tips.allTips));
  const thisSpotTips = tips.filter((tip) => {
    return tip.spotId === +spotId;
  });

  useEffect(() => {
    dispatch(getTips());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <TipButton spot={spot}/>
      {thisSpotTips.length > 0 && (
        <div className={styles.tips}>
          {thisSpotTips.map((tip) => (
            <TipBox key={tip.id} tip={tip} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TipsList;
