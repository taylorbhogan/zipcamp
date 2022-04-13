import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import SpotAddForm from "../SpotAddForm";
import PleaseLogin from "../parts/PleaseLogin";
import styles from "./SpotAddModal.module.css";
import "../../index.css";

function SpotAddModal({selectedArea}) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showSpotAddModal, setShowSpotAddModal] = useState(false);
  const [showPleaseLoginModal, setShowPleaseLoginModal] = useState(false);
  const [buttonText, setButtonText] = useState("+");

  const handleClick = () => {
    if (sessionUser) {
      setShowSpotAddModal(true);
    } else {
      setShowPleaseLoginModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={styles.addSpotButton}
        onMouseEnter={() => setButtonText("+ spot")}
        onMouseLeave={() => setButtonText("+")}
      >
        {buttonText}
      </button>
      {showSpotAddModal && (
        <Modal onClose={() => setShowSpotAddModal(false)}>
          <SpotAddForm onClose={() => setShowSpotAddModal(false)} selectedArea={selectedArea?.id}/>
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

export default SpotAddModal;
