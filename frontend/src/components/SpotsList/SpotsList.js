import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSpots, searchSpots } from "../../store/spots";
import SpotBox from "../SpotBox";
import LoadingContent from "../parts/LoadingContent";
import Errors from "../parts/Errors";
import styles from "./SpotsList.module.css";
import PleaseLogin from "../parts/PleaseLogin/PleaseLogin";
import Input from "../parts/Input/Input";

function SpotsList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots.allSpots));
  const filteredSpots = useSelector((state) => state.spots.filteredSpots);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const fetchFilteredSpots = async () => {
      const numQueryResults = await dispatch(searchSpots(searchTerm));
    };

    fetchFilteredSpots();
  }, [searchTerm, dispatch]);

  useEffect(() => {
    const fetchSpots = async () => {
      const response = await dispatch(getSpots());
      if (typeof response === "string") {
        setErrors([response]);
      }
      setIsLoaded(true);
    };
    fetchSpots();
  }, [dispatch]);

  return isLoaded ? (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Errors errors={errors} />
      {location.pathname === "/my-spots" ? (
        user ? (
          spots
            .filter((spot) => spot.userId === user.id)
            .map((spot) => <SpotBox key={spot.id} spot={spot} />)
        ) : (
          <div>
            <PleaseLogin />
          </div>
        )
      ) : (
        filteredSpots.map((spot) => <SpotBox key={spot.id} spot={spot} />)
      )}
    </div>
  ) : (
    <LoadingContent options={{ marginTop: "15vh" }} />
  );
}

export default SpotsList;
