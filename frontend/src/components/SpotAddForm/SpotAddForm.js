import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { getAllAreas } from "../../store/allAreas";
import { getUsStates } from "../../store/usStates";
import Errors from "../parts/Errors";
import "../../index.css";
import styles from "./SpotAddForm.module.css";
import { createSpot, editSpot } from "../../store/spots";
import MapContainer from "../Maps";
import Input from "../parts/Input";
import CloseModalButton from "../parts/CloseModalButton";
import AutocompleteDropdown from "../parts/AutocompleteDropdown";

function SpotAddForm({
  spot,
  onClose,
  selectedArea,
  isUsingUserLocation = false,
}) {
  const userId = useSelector((state) => state.session.user?.id);
  const allAreas = useSelector((state) => Object.values(state.allAreas));
  const dispatch = useDispatch();
  const history = useHistory();
  // if spot.area, use that.
  // if selected area, use that
  // otherwise, it doesn't matter. dummy default, dealer's choice
  console.log("spot", spot);
  const [area, setArea] = useState(
    spot ? spot.Area.id : selectedArea ? selectedArea.id : "4"
  );
  const [name, setName] = useState(spot?.name);
  const [lat, setLat] = useState(
    spot
      ? spot.lat // case edit
      : selectedArea
      ? selectedArea?.latitude // case launch from areaBox
      : allAreas.area?.latitude // case launch from Navigation: use the default
  );
  const [long, setLong] = useState(
    spot
      ? spot.long // case edit
      : selectedArea
      ? selectedArea?.longitude // case launch from areaBox
      : allAreas.area?.longitude // case launch from Navigation: use the default
  );
  const [blurb, setBlurb] = useState(spot?.blurb);
  const [directions, setDirections] = useState(spot?.directions);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getUsStates());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if (!name) errors.push("Please add a spot name.");
    if (!lat) errors.push("Please add a latitude.");
    if (!long) errors.push("Please add a longitude.");
    if (!blurb)
      errors.push("you gotta give us a LITTLE something on the situation!");
    setErrors(errors);

    const land = allAreas.find((land) => land.id === +area);
    console.log("spot", spot);
    if (spot === undefined) {
      const newSpot = {
        name,
        lat,
        long,
        blurb,
        directions,
        areaId: area,
        stateId: 1,
        userId,
      };
      let createdSpot = await dispatch(createSpot(newSpot));
      if (createdSpot) {
        onClose();
        history.push(`/spots/${createdSpot.id}`);
      }
    } else {
      const newSpot = {
        ...spot,
        name,
        lat,
        long,
        blurb,
        directions,
        areaId: area,
        stateId: 1,
        userId,
      };
      console.log("newSpot", newSpot);
      let createdSpot = await dispatch(editSpot(newSpot));
      if (createdSpot) {
        onClose();
        history.push(`/spots/${createdSpot.id}`);
      }
    }
  };

  return (
    <div>
      <CloseModalButton closeFunction={() => onClose()} />
      <form className={"form"} onSubmit={handleSubmit}>
        <h1 className={"formHeader"}>
          add that spot so you can find your way back
        </h1>
        {errors.length > 0 && <Errors errors={errors} />}
        <div className={styles.container}>
          <div className={styles.left}>
            <AutocompleteDropdown
              items={allAreas}
              setItem={setArea}
              selectedArea={selectedArea}
            />
            <Input
              type="text"
              value={name}
              placeholder={" spot name"}
              ariaLabel={"spot name"}
              onChange={(e) => setName(e.target.value)}
              required={false}
            />
            <Input
              type="textarea"
              value={blurb}
              placeholder={" what's the deal?"}
              ariaLabel={"what's the deal?"}
              onChange={(e) => setBlurb(e.target.value)}
              required={false}
              rows={"3"}
            />
            <Input
              type="textarea"
              value={directions}
              placeholder={" how do you find your way back?"}
              ariaLabel={"how do you find your way back?"}
              onChange={(e) => setDirections(e.target.value)}
              required={false}
              rows={"4"}
            />
          </div>
          <div className={styles.right}>
            <MapContainer
              isAdding={true}
              setLat={setLat}
              setLong={setLong}
              isUsingUserLocation={isUsingUserLocation}
              singlePin={true}
              zoom={14}
              pins={{
                pin: {
                  latitude: lat,
                  longitude: long,
                },
              }}
            />
          </div>
        </div>
        <button type="submit" hidden={true} className={"submitButton"}>
          Create new Spot
        </button>
      </form>
    </div>
  );
}

export default SpotAddForm;
