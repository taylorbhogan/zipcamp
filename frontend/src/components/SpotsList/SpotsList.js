import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSpots } from "../../store/spots";
import SpotBox from "../SpotBox";
import LoadingContent from "../parts/LoadingContent";
import styles from "./SpotsList.module.css";

function SpotsList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots.allSpots));
  const user = useSelector((state) => state.session.user);

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
        {location.pathname === "/my-spots"
          ? spots
              .filter((spot) => spot.userId === user.id)
              .map((spot) => <SpotBox key={spot.id} spot={spot} />)
          : spots.map((spot) => <SpotBox key={spot.id} spot={spot} />)}
      </div>
    </div>
  ) : (
    <LoadingContent options={{ marginTop: "15vh" }} />
  );
}

export default SpotsList;
