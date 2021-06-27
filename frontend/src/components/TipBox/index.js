import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Modal } from '../../context/Modal';

import styles from './TipBox.module.css'
// import SpotIdButton from '../ShowSpotIdButton';
// import ActivityIcon from '../ActivityIcon';
// import spotsReducer from '../../store/spots';
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


  return(
    <div className={styles.tipBoxWrapper}>
      <div className={styles.tipCardContainer}>
        {showModal && (
            <Modal className={'modalCard'} onClose={() => setShowModal(false)}>
              <TipEditForm setShowModal={setShowModal} spotId={1} tipId={tip.id}/>
            </Modal>
          )}
        <div className={styles.spotBoxContainerLeft}>
          <div className={styles.spotImageDiv}></div>

        </div>
        <div className={styles.spotBoxContainerRight}>
          {/* <div className={styles.spotName}>{tip.id}</div> */}
          <div className={styles.locationDiv}>
            <div className={styles.invisibleEditWrapper}>
              <button
                hidden={sessionUser && sessionUser.id === tip?.userId ? false : true}
                onClick={() => setShowModal(true)}
                className={styles.invisibleEdit}
                >
              Edit
              </button>
              <button
                hidden={sessionUser && sessionUser.id === tip?.userId ? false : true}
                onClick={() => handleDelete(tip.id)}
                className={styles.invisibleDelete}
              >
              Delete
              </button>
            </div>
            <div className={styles.createdAt}>{tip.createdAt}</div>
            <div className={styles.username}>{tip.User.username} wrote:</div>
            {tip.rating && (
            <div className={styles.rating}>Rating: {tip.rating}</div>)}
          </div>
          <div className={styles.spotBlurb}>{tip.text}</div>
        </div>
      </div>
    </div>
  )
}

export default TipBox;
