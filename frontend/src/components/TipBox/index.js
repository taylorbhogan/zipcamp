import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Modal } from '../../context/Modal';

import styles from './TipBox.module.css'
import SpotIdButton from '../ShowSpotIdButton';
import ActivityIcon from '../ActivityIcon';
import spotsReducer from '../../store/spots';
import { deleteTip } from '../../store/tips'

import TipEditForm from '../TipEditForm';


function TipBox({tip}){
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();



  const handleDelete = async (tipId) => {
    // successfully got this far...
    // console.log(spotId);
    // dispatch THUNK
    let deletedTip = await dispatch(deleteTip(tipId))
    if (deletedTip) {
      //act on the response
      history.push(`/spots/${tip.spotId}`);
    }
  }


  // console.log("THIS IS A TIP LOG",tip);
  return(
    <div className={styles.spotBoxWrapper}>
      <div className={styles.spotBoxContainer}>
        {showModal && (
            <Modal className={'modalCard'} onClose={() => setShowModal(false)}>
              <TipEditForm setShowModal={setShowModal} spotId={1} tipId={tip.id}/>
            </Modal>
          )}
        <div className={styles.spotBoxContainerLeft}>
          <div className={styles.spotImageDiv}>
            {/* <img
              className={styles.spotImage}
              alt={'a glimpse of this spot'}
              src={''}
            /> */}
          <div className={styles.profileImage}></div>
          </div>

        </div>
        <div className={styles.spotBoxContainerRight}>
          {/* <div className={styles.spotName}>{tip.id}</div> */}
          <div className={styles.locationDiv}>
            <div className={styles.areaName}>{tip.User.username} wrote:</div>
            <div className={styles.areaName}>Rating: {tip.rating}</div>
            <div className={styles.areaName}>{tip.createdAt}</div>
          </div>
          <div className={styles.spotBlurb}>{tip.text}</div>
          <div>
            <button
              hidden={sessionUser && sessionUser.id === tip?.userId ? false : true}
              onClick={() => setShowModal(true)}
              className={styles.editDiv}>
              Edit
            </button>
          </div>
          <div className={styles.deleteOuterDiv}>
            <button
              hidden={sessionUser && sessionUser.id === tip?.userId ? false : true}
              onClick={() => handleDelete(tip.id)}
              className={styles.deleteOuterDiv}>
              Delete
            </button>
          </div>
          {/* <SpotIdButton
            buttonText={'Check it out'}
            lightBackground={true}
            // spotId={spot.id}
            href={`/spots`}/> */}
        </div>
      </div>
    </div>
  )
}

export default TipBox;
