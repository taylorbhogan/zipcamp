import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from '../../context/Modal'
import TipForm from "../TipForm";
import styles from './TipButton.module.css'


function TipButton({ spot }) {
  const sessionUser = useSelector(state => state.session.user);

  const [showTipForm, setShowTipForm] = useState(false);

  return (
    <div className={styles.buttonWrapper}>
      {<button
        hidden={sessionUser && sessionUser.id === spot?.userId ? false : true}
        onClick={() => setShowTipForm(true)}
        className={styles.button}
      >
        add a tip
      </button>}
      {showTipForm && (
        <Modal onClose={() => setShowTipForm(false)}>
          <TipForm isNew={true} setShowTipForm={setShowTipForm} />
        </Modal>
      )}
    </div>
  )
}

export default TipButton;
