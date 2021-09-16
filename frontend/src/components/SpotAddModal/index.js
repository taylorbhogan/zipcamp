import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal'
import SpotAddForm from "../SpotAddForm";
import PleaseLogin from '../parts/PleaseLogin'
import styles from './SpotAddModal.module.css'
import '../../index.css'


function SpotAddModal(){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const [showSpotAddModal, setShowSpotAddModal] = useState(false);
  const [showPleaseLoginModal, setShowPleaseLoginModal] = useState(false);

  const handleClick = () => {
    if (sessionUser) {
      setShowSpotAddModal(true)
    } else {
      setShowPleaseLoginModal(true)
    }
  }

  return(
    <div className={styles.addSpotButtonWrapper}>
      <button
        onClick={handleClick}
        className={styles.addSpotButton}
        // className={'submitButton'}
      >ADD A NEW SPOT</button>
      {showSpotAddModal && (
        <Modal onClose={() => setShowSpotAddModal(false)}>
          <SpotAddForm />
        </Modal>
      )}
      {showPleaseLoginModal && (
        <Modal onClose={() => setShowPleaseLoginModal(false)}>
          <PleaseLogin setShowPleaseLoginModal={setShowPleaseLoginModal}/>
        </Modal>
      )}
    </div>
  )
}

export default SpotAddModal;
