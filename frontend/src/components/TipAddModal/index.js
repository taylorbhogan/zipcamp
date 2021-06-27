import React, { useState } from "react";
import { Modal } from '../../context/Modal'
import TipAddForm from "../TipAddForm";
import styles from './TipAddModal.module.css'


function TipAddModal(){
  const [showTipAddModal, setShowTipAddModal] = useState(false);

  return(
    <div className={styles.buttonWrapper}>
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
