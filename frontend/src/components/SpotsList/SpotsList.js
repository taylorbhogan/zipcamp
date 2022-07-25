import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { getSpots, searchSpots } from "../../store/spots";
import SpotBox from "../SpotBox";
import LoadingContent from "../parts/LoadingContent";
import NoContentFound from "../parts/NoContentFound";
import Errors from "../parts/Errors";
import styles from "./SpotsList.module.css";
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
    setSearchTerm(e.target.value);
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
  }, [dispatch, isLoaded, location.pathname, user?.id]);

  return isLoaded ? (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={
            location.pathname === "/my-spots"
              ? "search spots you've added"
              : "search community spots"
          }
        />
      </div>
      {errors.length > 0 && <Errors errors={errors} />}
      {spots.length === 0 && isLoaded === true && (
        <NoContentFound
          line1={
            "We couldn't find any spots in our database using that search term."
          }
          line2={"Try changing your selection...or add that spot yourself!"}
        />
      )}
      {spots.map((spot) => (
        <SpotBox key={spot.id} spot={spot} />
      ))}
      {numQueryResults > 0 && <div>{numQueryResults}</div>}
    </div>
  ) : (
    <LoadingContent options={{ marginTop: "15vh" }} />
  );
}

export default SpotsList;
