import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import SpotBox from "../SpotBox";
import LoadingContent from "../parts/LoadingContent";
import styles from "./SpotsList.module.css";

function SpotsList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots.allSpots));

  useEffect(() => {
    const fetchSpots = async () => {
      const response = await dispatch(getSpots());
      if (typeof response === "string") {
        console.log("response", response);
      } else {
        setIsLoaded(true);
      }
    };
    fetchSpots();
  }, [dispatch]);

  return isLoaded ? (
    <div className={styles.contentWrapper}>
      <div className={"contentContainer"}>
        {spots.map((spot) => (
          <SpotBox key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  ) : (
    <LoadingContent options={{"margin-top": "15vh"}}/>
  );
}

export default SpotsList;
