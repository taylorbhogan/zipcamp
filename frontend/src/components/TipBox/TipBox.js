import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteTip } from "../../store/tips";
import TipForm from "../TipForm";
import { Modal } from "../../context/Modal";
import styles from "./TipBox.module.css";

function TipBox({ tip }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = async (tipId) => {
    let deletedTip = await dispatch(deleteTip(tipId));
    if (deletedTip) {
      history.push(`/spots/${tip.spotId}`);
    }
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {showModal && (
        <Modal className={"modalCard"} onClose={() => setShowModal(false)}>
          <TipForm setShowTipForm={setShowModal} tipId={tip.id} />
        </Modal>
      )}
      {showButtons && sessionUser && sessionUser.id === tip?.userId && (
        <>
          <button
            className={`material-icons ${styles.editButton}`}
            onClick={() => setShowModal(true)}
          >
            edit
          </button>
          <button
            className={`material-icons ${styles.deleteButton}`}
            onClick={() => handleDelete(tip.id)}
          >
            delete
          </button>
        </>
      )}
      <span className={styles.username}>{tip.User.username}:</span>
      <span className={styles.createdAt}>{tip.createdAt}</span>
      {tip.rating && (
        <div className={styles.rating}>
          {Array.from(Array(tip.rating).keys()).map((star, idx) => (
            <span key={idx} className="material-icons">
              grade
            </span>
          ))}
        </div>
      )}
      <p className={styles.tipText}>{tip.text}</p>
    </div>
  );
}

export default TipBox;
