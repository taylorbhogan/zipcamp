import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import styles from './SpotIdPage.module.css'
import { getSpot, deleteSpot } from '../../store/spots'
import ActivityIcon from '../ActivityIcon';
import SpotEditForm from '../SpotEditForm';

function SpotIdPage(){
  // declare variables from hooks
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const {spotId} = useParams();
  // console.log("THIS IS MY CONSOLE LOG", spotId);
  const spot = useSelector((state) => state.spots[spotId])

  const [showModal, setShowModal] = useState(false);


  // // use a react hook and cause a side effect
  useEffect(() => {
    dispatch(getSpot(spotId))
  }, [dispatch, spotId])

  // console.log('spot', spot);
  const handleDelete = async (spotId) => {
    // successfully got this far...
    console.log(spotId);
    // WARNING: clicking the delete button => stack overflow
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
            <SpotEditForm spotId={spot?.id}/>
          </Modal>
        )}
          <div className={styles.SpotDivHeader}>
            <div className={styles.spotName}>{spot?.name}</div>
            <div className={styles.coordinates}>{spot?.lat}, {spot?.long}</div>
            {/* <div className={styles.areaName}>{spot?.areaId}</div> */}
            <div className={styles.areaName}>{spot?.Area?.name}</div>
          </div>
          <div className={styles.SpotDivInfo}>
            <div className={styles.SpotDivInfoLeft}>
              <div className={styles.userInfo}>
                <div>Discovered by</div>
                <div>{spot?.User?.username}</div>
                <div className={styles.editOuterDiv}></div>
                  <button
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


          {/* right now, I need the spot &&. why? */}
          {/* <p>{spot && spot.id}</p> */}
            <p>. </p>
            <p>. </p>
            <p>. </p>
            <p>. </p>
            <p>. </p>
            <p>hi :)</p>

        </div>
        <div className={styles.TipsUnused}></div>
      </div>
    </div>
  )
}

export default SpotIdPage;
