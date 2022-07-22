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
import { getTips } from "../../store/tips";

function SpotIdPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);

  let [spot] = useSelector((state) => state.spots);
  const allTips = useSelector((state) => Object.values(state.tips.allTips));
  const tips = allTips.filter((tip) => tip.spotId === +spotId);
  const ratedTips = tips.filter((tip) => tip.rating !== null);

  const tipsAverage = isNaN(
    tips.reduce(function (acc, tip) {
      return acc + tip.rating;
    }, 0) / ratedTips.length
  )
    ? 0
    : tips.reduce(function (acc, tip) {
        return acc + tip.rating;
      }, 0) / ratedTips.length;

  useEffect(() => {
    if (!spot) {
      dispatch(getSpot(spotId));
    }
  }, [dispatch, spotId, spot]);

  useEffect(() => {
    dispatch(getTips());
  }, [dispatch]);

  const openEditModal = () => {
    setShowEditModal(true);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.spotImageCarousel}></div>
      {showEditModal && (
        <Modal className={"modalCard"} onClose={() => setShowEditModal(false)}>
          <SpotAddForm
            spot={spot}
            selectedArea={spot.Area}
            onClose={() => setShowEditModal(false)}
          />
        </Modal>
      )}
      <div className={styles.topsection}>
        <div>
          <div className={styles.spotName}>
            <span>{spot?.name}</span>
            <div>
              {Array.from(Array(Math.ceil(tipsAverage)).keys()).map(
                (star, idx) => (
                  <span key={idx} className="material-icons">
                    grade
                  </span>
                )
              )}
            </div>
          </div>
          <div className={styles.coordinates}>
            {spot?.lat}, {spot?.long}
          </div>
          <div className={styles.areaName}>{spot?.Area.name}</div>
        </div>
        <SpotFinderCard spot={spot} openEditModal={openEditModal} />
      </div>
      <div className={styles.midsection}>
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
        <div className={styles.spotInfo}>
          <p>{spot?.blurb}</p>
          <p className={styles.directions}>Directions:</p>
          <p>{spot?.directions}</p>
        </div>
      </div>
      <TipsList spot={spot} tips={tips} />
      <SpotImages spot={spot} />
    </div>
  );
}

export default SpotIdPage;
