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
  const [searchTerm, setSearchTerm] = useState("");
  const [numQueryResults, setNumQueryResults] = useState(0);

  const spots = useSelector((state) => state.spots);
  const user = useSelector((state) => state.session.user);

  const location = useLocation();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchTerm((searchTerm) => e.target.value);
    const fetchFilteredSpots = async () => {
      const responseQuantity = await dispatch(searchSpots(e.target.value));
      setNumQueryResults(responseQuantity);
    };
    fetchFilteredSpots();
  };

  useEffect(() => {
    if (isLoaded === false) {
      const fetchSpots = async () => {
        const response = await dispatch(getSpots());
        if (typeof response === "string") {
          setErrors([response]);
        }
        setIsLoaded(true);
      };
      fetchSpots();
    }
  }, [dispatch, isLoaded]);

  return isLoaded ? (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <Input type="text" value={searchTerm} onChange={handleSearch} />
      </div>
      <Errors errors={errors} />
      {spots.length === 0 && isLoaded === true && <div>No spots found</div>}
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
        spots.map((spot) => <SpotBox key={spot.id} spot={spot} />)
      )}
      {numQueryResults > 0 && <div>{numQueryResults}</div>}
    </div>
  ) : (
    <LoadingContent options={{ marginTop: "15vh" }} />
  );
}

export default SpotsList;
