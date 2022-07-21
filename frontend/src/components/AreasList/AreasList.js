import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsStates } from "../../store/usStates";
import MapContainer from "../Maps";
import { searchAreas } from "../../store/areas";
import AreaBox from "../AreaBox";
import Dropdown from "../parts/Dropdown";
import styles from "./AreasList.module.css";
import NoContentFound from "../parts/NoContentFound/NoContentFound";
import LoadingContent from "../parts/LoadingContent";
import ControlPanel from "./ControlPanel";
import Pagination from "../parts/Pagination/Pagination";
import Errors from "../parts/Errors";

function AreasList() {
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [usStates, setUsStates] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState(25);
  const [resultPageNum, setResultPageNum] = useState(1);
  const [errors, setErrors] = useState([]);

  const areas = useSelector((state) =>
    Object.values(state.areas.searchResults)
  );

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
        searchAreas(
          organization?.id,
          selectedLocation?.abbreviation,
          resultsPerPage,
          resultsPerPage * (resultPageNum - 1)
        )
      );
      if (fetch !== "error") {
        setIsLoaded(true);
      }
    };
    fetchAreas();
  }, [dispatch, organization, selectedLocation, resultPageNum]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const res = await fetch(`/api/areas/from-rec-gov/organizations`);
      const data = await res.json();
      if (res.ok) {
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
          "Tennessee Valley Authority",
          "Department of the Interior",
          "National Register of Historic Places",
          "Department of Commerce",
          "Department of Defense",
          "Department of Agriculture",
          "National Archives and Records Administration",
          "American Battle Monuments Commission",
          "Department of the Treasury",
          "Bureau of Engraving and Printing",
          "Historic Hotels of America",
          "National Historic Landmark",
          "United States Geological Survey",
          "Bureau of Reclamation",
          "Commander, Navy Installation Command (CNIC)",
          "Booz Allen Hamilton",
          "Department of Transportation",
        ];
        const filteredData = data.filter((datum) => {
          return !filterOut.includes(datum.name);
        });
        const obj = {};
        filteredData.forEach((datum) => {
          obj[datum.id] = datum;
        });
        setOrganizations(obj);
      } else {
        try {
          setErrors([...errors, ...data?.errors]);
        } catch (e) {
          console.log(e);
        }
      }
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
        <ControlPanel
          organizations={organizations}
          organization={organization}
          setOrganization={setOrganization}
          selectedLocation={selectedLocation}
          usStates={usStates}
          setSelectedLocation={setSelectedLocation}
          clearSelection={clearSelection}
        />
        {errors.length > 0 && <Errors errors={errors} />}
        <div className={styles.scroll}>
          {isLoaded ? (
            areas.length > 0 ? (
              areas.map((area) => (
                <AreaBox
                  key={area.id}
                  area={area}
                  selectedArea={selectedArea}
                  setSelectedArea={setSelectedArea}
                />
              ))
            ) : (
              <NoContentFound
                line1={"There are no Federal public lands with that distinction in that location in the rec.gov database."}
                line2={"Try changing your selection or click clear to view all areas."}
              />
            )
          ) : (
            <LoadingContent location={"areas"} />
          )}
          {areas.length > 0 && <Pagination
            isLoaded={isLoaded}
            resultsPerPage={resultsPerPage}
            resultPageNum={resultPageNum}
            setResultPageNum={setResultPageNum}
          />}
        </div>
      </div>
      <div className={styles.pageRight}>
        <MapContainer pins={areas} zoom={3} setFunction={setSelectedArea} selectedItem={selectedArea}/>
      </div>
    </div>
  );
}

export default AreasList;
