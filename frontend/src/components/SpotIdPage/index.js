import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { getSpot } from '../../store/spots'
import SpotEditForm from '../SpotEditForm';
import TipsList from '../TipsList';
import MapContainer from '../Maps';
import styles from './SpotIdPage.module.css'


function SpotIdPage() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.allSpots[spotId])

  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (!spot) {
      dispatch(getSpot(spotId))
    }
  }, [dispatch, spotId, spot])


  return (
    <div className={styles.contentWrapper}>
      <div className={'contentContainer'}>
        <div className={styles.spotImageCarousel}></div>
        {showModal && (
          <Modal className={'modalCard'} onClose={() => setShowModal(false)}>
            <SpotEditForm setShowModal={setShowModal} spotId={spot?.id} />
          </Modal>
        )}
        <div className={styles.SpotDivHeader}>
          <div className={styles.spotName}>{spot?.name}</div>
          <div className={styles.coordinates}>{spot?.lat}, {spot?.long}</div>
          <div className={styles.areaName}>{spot?.Area?.name}</div>
        </div>
        <div className={styles.midsection}>
          <div className={styles.SpotDivInfo}>
            <div className={styles.SpotDivInfoLeft}>
              <div className={styles.profileImage}></div>
              {(spot?.userId === sessionUser?.id ?
                <>
                  <p>You added this spot</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className={styles.editButton}>
                    Need to make changes?
                  </button>
                </>
                :
                <>
                  <p>Discovered by</p>
                  <p>{spot?.User?.username}</p>
                </>
              )}
            </div>
            <div className={styles.SpotDivInfoRight}>
              <div>{spot?.blurb}</div>
              <div className={styles.directionsHeader}>Directions:</div>
              <div className={styles.directions}>{spot?.directions}</div>
            </div>
          </div>
            <div className={styles.mapContainerWrapper}>
              <MapContainer
                lat={spot?.lat}
                long={spot?.long}
              />
            </div>

        </div>
        {/* <div className={styles.SpotDivActivities}>
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
          </div> */}
        <TipsList spot={spot} />
      </div>
    </div>
  )
}

export default SpotIdPage;
