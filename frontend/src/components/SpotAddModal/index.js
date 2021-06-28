import React, { useState } from "react";
import { Modal } from '../../context/Modal'
import SpotAddForm from "../SpotAddForm";
import styles from './SpotAddModal.module.css'
import '../../index.css'


function SpotAddModal(){
  const [showSpotAddModal, setShowSpotAddModal] = useState(false);

  return(
    <div className={styles.addSpotButtonWrapper}>
      <button
        onClick={() => setShowSpotAddModal(true)}
        className={styles.addSpotButton}
        // className={'submitButton'}
      >ADD A NEW SPOT</button>
      {showSpotAddModal && (
        <Modal onClose={() => setShowSpotAddModal(false)}>
          <SpotAddForm />
        </Modal>
      )}
    </div>
  )
}

export default SpotAddModal;
