import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAreas } from "../../store/areas";
import { getUsStates } from "../../store/usStates";
import "../../index.css";
import { editSpot } from "../../store/spots";
import { deleteSpot } from "../../store/spots";
import styles from "./SpotEditForm.module.css";
import Input from "../parts/Input";
import Errors from "../parts/Errors";

function SpotEditForm({ spotId, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const spot = useSelector((state) => state.spots.allSpots[spotId]);
  const [name, setName] = useState(spot?.name);
  const [lat, setLat] = useState(spot?.lat);
  const [long, setLong] = useState(spot?.long);
  const [blurb, setBlurb] = useState(spot?.blurb);
  const [directions, setDirections] = useState(spot?.directions);
  const areas = useSelector((state) => Object.values(state.areas.searchResults));
  const [area, setArea] = useState(spot?.areaId);
  const usStates = useSelector((state) => Object.values(state.states));
  const [stateId, setStateId] = useState(spot?.stateId);
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getAreas());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsStates());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.id !== 8) {
      const errors = [];
      if (!name) errors.push("Please add a spot name.");
      if (!lat) errors.push("Please add a latitude.");
      if (!long) errors.push("Please add a longitude.");
      if (!blurb)
        errors.push("you gotta give us a LITTLE something on the situation!");
      setErrors(errors);

      const newSpot = {
        ...spot,
        name,
        lat,
        long,
        blurb,
        directions,
        areaId: +area,
        stateId: +stateId,
        userId,
      };

      let editedSpot = await dispatch(editSpot(newSpot));
      if (editedSpot) {
        setShowModal(false);
        history.push(`/spots/${editedSpot.id}`);
      }
    }
  };

  const handleDelete = async (spotId) => {
    let deletedSpot = await dispatch(deleteSpot(spotId));
    if (deletedSpot) {
      history.push(`/spots`);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className={"formHeader"}>hello from spot edit form</h1>
        <Errors errors={errors} />
        <Input
          type="text"
          value={name}
          placeholder={" spot name"}
          ariaLabel={"spot name"}
          onChange={(e) => setName(e.target.value)}
          // required false to show frontend validation error array
          required={false}
        />
        <Input
          type="text"
          value={lat}
          placeholder={" the most helpful latitude for retracing your steps"}
          ariaLabel={"the most helpful latitude for retracing your steps"}
          onChange={(e) => setLat(e.target.value)}
          // required false to show frontend validation error array
          required={false}
        />
        <Input
          type="text"
          value={long}
          placeholder={" ditto the longitude"}
          ariaLabel={"ditto the longitude"}
          onChange={(e) => setLong(e.target.value)}
          // required false to show frontend validation error array
          required={false}
        />
        <Input
          type="textarea"
          value={blurb}
          placeholder={" what's the deal?"}
          onChange={(e) => setBlurb(e.target.value)}
          // required false to show frontend validation error array
          required={false}
        />
        <textarea
          type="textarea"
          value={directions}
          placeholder={" how do you find your way back?"}
          onChange={(e) => setDirections(e.target.value)}
          // required false to show frontend validation error array
          required={false}
        />
        <select
          onChange={(e) => setArea(e.target.value)}
          className={"formSelectInput"}
          value={spot?.areaId}
        >
          {areas.map((area) => (
            <option value={area.id} key={area.id}>
              {area.name}
            </option>
          ))}
        </select>
        <select
          value={spot?.stateId}
          hidden={true}
          onChange={(e) => setStateId(e.target.value)}
          className={"formSelectInput"}
        >
          {usStates.map((state) => (
            <option value={state.id} key={state.id}>
              {state.name}
            </option>
          ))}
        </select>
        <button type="submit" className={"submitButton"}>
          Save your changes
        </button>
      </form>
      <button
        onClick={() => handleDelete(spot.id)}
        className={styles.warningButton}
        id={8}
      >
        Delete
      </button>
    </div>
  );
}

export default SpotEditForm;