import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserSpots, searchSpots } from "../../store/spots";
import SpotBox from "../SpotBox";
import LoadingContent from "../parts/LoadingContent";
import NoContentFound from "../parts/NoContentFound";
import Errors from "../parts/Errors";
import styles from "./MySpotsList.module.css";
import Input from "../parts/Input/Input";

function MySpotsList() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [numQueryResults, setNumQueryResults] = useState(0);

  const spots = useSelector((state) => state.spots);
  const user = useSelector((state) => state.session.user);

  const history = useHistory();
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
    if (!user) {
      history.push("/");
    }
  }, [history, user]);

  useEffect(() => {
    if (isLoaded === false) {
      const fetchUserSpots = async () => {
        const response = await dispatch(getUserSpots(user?.id));
        if (typeof response === "string") {
          setErrors([response]);
        }
        setIsLoaded(true);
      };
      fetchUserSpots();
    }
  }, [dispatch, isLoaded, user?.id]);

  return isLoaded ? (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={"search spots you've added"}
        />
      </div>
      {errors.length > 0 && <Errors errors={errors} />}
      {spots.length === 0 && isLoaded === true && (
        <NoContentFound
          line1={"no spots yet."}
          line2={"add your first spot to see it here!"}
        />
      )}
      {spots
        .filter((spot) => spot.userId === user?.id)
        .map((spot) => (
          <SpotBox key={spot.id} spot={spot} />
        ))}
      {numQueryResults > 0 && <div>{numQueryResults}</div>}
    </div>
  ) : (
    <LoadingContent options={{ marginTop: "15vh" }} />
  );
}

export default MySpotsList;
