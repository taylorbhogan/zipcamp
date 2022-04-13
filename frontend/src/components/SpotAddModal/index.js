import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
// import { getAllAreas } from "../../store/allAreas";
import SpotAddForm from "../SpotAddForm";
import PleaseLogin from "../parts/PleaseLogin";
import styles from "./SpotAddModal.module.css";
import "../../index.css";

function SpotAddModal({selectedArea, isUsingUserLocation}) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showSpotAddModal, setShowSpotAddModal] = useState(false);
  const [showPleaseLoginModal, setShowPleaseLoginModal] = useState(false);
  const [buttonText, setButtonText] = useState("+");
  // const dispatch = useDispatch();

  // const allAreas = useSelector((state) =>
  //   Object.values(state.allAreas)
  // );

  // useEffect(() => {
  //   dispatch(getAllAreas());
  // }, [dispatch]);

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
          <SpotAddForm onClose={() => setShowSpotAddModal(false)} selectedArea={selectedArea} isUsingUserLocation={isUsingUserLocation}/>
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
