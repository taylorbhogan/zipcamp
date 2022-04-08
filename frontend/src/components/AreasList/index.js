import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsStates } from "../../store/usStates";
import MapContainer from "../Maps";
import { searchAreas } from "../../store/areas";
import AreaBox from "../AreaBox";
import Dropdown from "../parts/Dropdown";
import styles from "./AreasList.module.css";
import MessageNoAreas from "./MessageNoAreas";
import LoadingContent from "../parts/LoadingContent"

function AreasList() {
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [usStates, setUsStates] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const areas = useSelector((state) => Object.values(state.areas));

  useEffect(() => {
    const fetchSelectableLocations = async () => {
      const usStates = await dispatch(getUsStates());
      setUsStates(usStates);
    };
    fetchSelectableLocations();
  }, [dispatch]);

  useEffect(() => {
    const fetchAreas = async () => {
      const fetch = await dispatch(
        searchAreas(organization?.id, selectedLocation?.abbreviation)
      );
      if (fetch !== "error") {
        setIsLoaded(true);
      }
    };
    fetchAreas();
  }, [dispatch, organization, selectedLocation]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const res = await fetch(`/api/areas/from-rec-gov/organizations`);
      const data = await res.json();

      const filterOut = [
        "STATE PARKS",
        "FEDERAL",
        "Smithsonian Institution",
        "Utah",
        "Maryland",
        "Texas",
        "Virginia",
        "New Mexico",
        "US Air Force",
        "Smithsonian Institution Affiliations Program",
        "",
      ];
      const filteredData = data.filter((datum) => {
        return !filterOut.includes(datum.name);
      });
      const obj = {};
      filteredData.forEach((datum) => {
        obj[datum.id] = datum;
      });
      setOrganizations(obj);
    };
    fetchOrganizations();
  }, []);

  const clearSelection = () => {
    setSelectedLocation("");
    setOrganization("");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageLeft}>
        <div className={styles.search}>
          <span>Explore</span>
          <Dropdown
            placeholder={"Public Lands"}
            items={organizations}
            item={organization}
            setFunction={setOrganization}
            plural={true}
          />
          <span>in</span>
          <Dropdown
            placeholder={"The United States"}
            item={selectedLocation}
            items={usStates}
            setFunction={setSelectedLocation}
          />
          <button onClick={clearSelection}>clear</button>
        </div>
        {isLoaded ? (
          areas.length > 0 ? (
            areas.map((area) => (
              <AreaBox key={area.id} area={area} selectedArea={selectedArea} />
            ))
          ) : (
            <MessageNoAreas />
          )
        ) : (
          <LoadingContent />
        )}
      </div>
      <div className={styles.pageRight}>
        <MapContainer pins={areas} zoom={3} setFunction={setSelectedArea} />
      </div>
    </div>
  );
}

export default AreasList;
