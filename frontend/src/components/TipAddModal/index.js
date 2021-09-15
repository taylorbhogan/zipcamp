import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from '../../context/Modal'
import TipAddForm from "../TipAddForm";
import styles from './TipAddModal.module.css'


function TipAddModal({thisSpotTips, spot}){
  const sessionUser = useSelector(state => state.session.user);

  const [showTipAddModal, setShowTipAddModal] = useState(false);

  return(
    <div className={styles.buttonWrapper}>
      {<button
        hidden={sessionUser && sessionUser.id === spot?.userId ? false : true}
        onClick={() => setShowTipAddModal(true)}
        className={styles.button}
      >
        add a tip
      </button>}
      {showTipAddModal && (
        <Modal onClose={() => setShowTipAddModal(false)}>
          <TipAddForm setShowTipAddModal={setShowTipAddModal} />
        </Modal>
      )}
    </div>
  )
}

export default TipAddModal;
