import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import styles from './SpotIdPage.module.css'
import { deleteSpot } from '../../store/spots'
import { getSpot } from '../../store/spots'
import ActivityIcon from '../ActivityIcon';
import SpotEditForm from '../SpotEditForm';
import TipsList from '../TipsList';

function SpotIdPage(){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const spot = useSelector((state) => state.spots.allSpots[spotId])
  // const spot = useSelector((state) => state.spots.currSpot)

  const [showModal, setShowModal] = useState(false);

  // without this, the info doesn't hit the page
  // with it, we're not deleting from state
  useEffect(() => {
    if (!spot){
      console.log('inside the SpotIdPage useEffect');
      // the below is running when we try to delete.
      dispatch(getSpot(spotId))
    }
  }, [dispatch, spotId, spot])


  // console.log('spot', spot);
  const handleDelete = async (spotId) => {
    // successfully got this far...
    console.log(spotId);
    // dispatch THUNK
    let deletedSpot = await dispatch(deleteSpot(spotId))
    if (deletedSpot) {
      //act on the response
      history.push(`/spots`);
    }
  }


  return(
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.spotImageCarouselUnused}></div>
        <div className={styles.mainSpotDivUnused}>
          {showModal && (
          <Modal className={'modalCard'} onClose={() => setShowModal(false)}>
            <SpotEditForm setShowModal={setShowModal} spotId={spot?.id}/>
          </Modal>
        )}
          <div className={styles.SpotDivHeader}>
            <div className={styles.spotName}>{spot?.name}</div>
            <div className={styles.coordinates}>{spot?.lat}, {spot?.long}</div>
            {/* <div className={styles.areaName}>{spot?.areaId}</div> */}
            {/* 11:52 problem is here vVv */}
            <div className={styles.areaName}>{spot?.Area?.name}</div>
          </div>
          <div className={styles.SpotDivInfo}>
            <div className={styles.SpotDivInfoLeft}>
              <div className={styles.userInfo}>
                <div>Discovered by</div>
                {/* removed ? after user */}
                {/* code renders faster than it gets the info. so rather than do this, reformat the info we need so there is not a race */}
                {/* justin did that by.... */}
                <div>{spot?.User?.username}</div>
                <div className={styles.editOuterDiv}></div>
                  <button
                  // LOOK HERE
                    hidden={sessionUser && sessionUser.id === spot?.User?.id ? false : true}
                    onClick={() => setShowModal(true)}
                    className={styles.editDiv}>
                    Edit
                  </button>
                <div className={styles.deleteOuterDiv}></div>
                  <button
                    hidden={sessionUser && sessionUser.id === spot?.User?.id ? false : true}
                    onClick={() => handleDelete(spotId)}
                    className={styles.deleteOuterDiv}>
                    Delete
                  </button>
              </div>
              <div className={styles.profileImage}></div>
            </div>
            <div className={styles.SpotDivInfoRight}>
              <div>{spot && spot.blurb}</div>
              <div className={styles.directionsHeader}>Directions:</div>
              <div className={styles.directions}>{spot && spot.directions}</div>
            </div>
          </div>
          <div className={styles.SpotDivActivities}>
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
            <ActivityIcon />
          </div>
        </div>
        <div className={styles.TipsUnused}>
          <TipsList />
        </div>
      </div>
    </div>
  )
}

export default SpotIdPage;
