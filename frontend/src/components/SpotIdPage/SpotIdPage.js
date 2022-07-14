import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { getSpot } from "../../store/spots";
import SpotAddForm from "../SpotAddForm";
import TipsList from "../TipsList";
import MapContainer from "../Maps";
import SpotFinderCard from "../SpotFinderCard";
import styles from "./SpotIdPage.module.css";
import SpotImages from "../SpotImages/SpotImages";

function SpotIdPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);

  const spot = useSelector((state) => state.spots.allSpots[spotId]);

  useEffect(() => {
    if (!spot) {
      dispatch(getSpot(spotId));
    }
  }, [dispatch, spotId, spot]);

  const setEditModal = () => {
    setShowEditModal(true);
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={"contentContainer"}>
        <div className={styles.spotImageCarousel}></div>
        {showEditModal && (
          <Modal
            className={"modalCard"}
            onClose={() => setShowEditModal(false)}
          >
            <SpotAddForm spot={spot} selectedArea={spot.Area} onClose={() => setShowEditModal(false)}/>
          </Modal>
        )}
        <div className={styles.SpotDivHeader}>
          <div className={styles.spotName}>{spot?.name}</div>
          <div className={styles.coordinates}>
            {spot?.lat}, {spot?.long}
          </div>
          <div className={styles.areaName}>{spot?.Area?.name}</div>
        </div>
        <div className={styles.midsection}>
          <div className={styles.SpotDivInfo}>
            <SpotFinderCard spotId={spotId} setEditModal={setEditModal} />
            <div className={styles.SpotDivInfoRight}>
              <div>{spot?.blurb}</div>
              <div className={styles.directionsHeader}>Directions:</div>
              <div className={styles.directions}>{spot?.directions}</div>
            </div>
          </div>
          <div className={styles.mapContainerWrapper}>
            <MapContainer
              zoom={14}
              singlePin={true}
              pins={{
                pin: {
                  latitude: spot?.lat,
                  longitude: spot?.long,
                },
              }}
            />
          </div>
        </div>
        <TipsList spot={spot} />
        <SpotImages spot={spot} />
      </div>
    </div>
  );
}

export default SpotIdPage;
