import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import PleaseLogin from "../parts/PleaseLogin";
import TipForm from "../TipForm";
import styles from "./TipButton.module.css";

function TipButton({ spot }) {
  const sessionUser = useSelector((state) => state.session.user);

  const [showTipForm, setShowTipForm] = useState(false);
  const [showPleaseLoginModal, setShowPleaseLoginModal] = useState(false);

  const handleClick = () => {
    if (sessionUser) {
      setShowTipForm(true);
    } else {
      setShowPleaseLoginModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={styles.button}
      >
        add a tip
      </button>
      {showTipForm && (
        <Modal onClose={() => setShowTipForm(false)}>
          <TipForm isNew={true} setShowTipForm={setShowTipForm} />
        </Modal>
      )}
      {showPleaseLoginModal && (
        <Modal onClose={() => setShowPleaseLoginModal(false)}>
          <PleaseLogin setShowPleaseLoginModal={setShowPleaseLoginModal} />
        </Modal>
      )}
    </>
  );
}

export default TipButton;
