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

function SpotAddForm({
  spot,
  onClose,
  selectedArea,
  isUsingUserLocation = false,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState(spot?.name);
  const [lat, setLat] = useState(
    spot?.lat ? spot?.lat : selectedArea
      ? selectedArea.latitude
        ? selectedArea.latitude
        : "37.674874"
      : ""
  );
  const [long, setLong] = useState(
    spot?.long ? spot?.long : selectedArea
      ? selectedArea.longitude
        ? selectedArea.longitude
        : "-122.440264"
      : ""
  );
  const [blurb, setBlurb] = useState(spot?.blurb);
  const [directions, setDirections] = useState(spot?.directions);
  const [errors, setErrors] = useState([]);
  const [area, setArea] = useState(selectedArea ? selectedArea.id : "4");

  const userId = useSelector((state) => state.session.user?.id);
  const allAreas = useSelector((state) => Object.values(state.allAreas));

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
    console.log('spot',spot);
    if (spot === undefined){
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
      let createdSpot = await dispatch(editSpot(newSpot));
      if (createdSpot) {
        onClose();
        history.push(`/spots/${createdSpot.id}`);
      }

    }
  };

  const getLocation = (coords) => {
    setLat(coords.lat.toFixed(6));
    setLong(coords.lng.toFixed(6));
  };

  return (
    <div>
      <CloseModalButton closeFunction={() => onClose()} />
      <form className={"form"} onSubmit={handleSubmit}>
        <h1 className={"formHeader"}>
          add that spot so you can find your way back
        </h1>
        <Errors errors={errors} />
        <div className={styles.container}>
          <div className={styles.left}>
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
            <select
              onChange={(e) => setArea(e.target.value)}
              className={"formSelectInput"}
              defaultValue={selectedArea ? selectedArea.id : allAreas[0]}
            >
              {allAreas.map((area) => (
                <option value={area.id} key={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
            <div className={styles.coordsDiv}>
              <input
                type="text"
                className={styles.coords}
                value={lat}
                placeholder={" latitude: enter manually here, or use the map"}
                onChange={(e) => setLat(e.target.value)}
                required
                hidden={true}
              />
              <input
                type="text"
                hidden={true}
                className={styles.coords}
                value={long}
                placeholder={" ditto the longitude"}
                onChange={(e) => setLong(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.wrapper}>
            <MapContainer
              isAdding={true}
              getLocation={getLocation}
              isUsingUserLocation={isUsingUserLocation}
              singlePin={true}
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
