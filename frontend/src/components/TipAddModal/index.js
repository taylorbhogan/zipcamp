import React, { useState } from "react";
import { Modal } from '../../context/Modal'
import TipAddForm from "../TipAddForm";
import styles from './TipAddModal.module.css'


function TipAddModal({thisSpotTips}){
  const [showTipAddModal, setShowTipAddModal] = useState(false);

  return(
    <div className={styles.buttonWrapper}>
      {/* {(thisSpotTips.length === 0) && (<div className={styles.buttonBackground}></div>)} */}
      <button
        onClick={() => setShowTipAddModal(true)}
        className={styles.button}
      >
        add a tip
      </button>
      {showTipAddModal && (
        <Modal onClose={() => setShowTipAddModal(false)}>
          <TipAddForm setShowTipAddModal={setShowTipAddModal} />
        </Modal>
      )}
    </div>
  )
}

export default TipAddModal;
