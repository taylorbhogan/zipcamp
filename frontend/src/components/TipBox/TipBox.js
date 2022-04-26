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
  const [showButtons, setShowButtons] = useState(true);
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
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className={styles.container}
    >
      {showModal && (
        <Modal className={"modalCard"} onClose={() => setShowModal(false)}>
          <TipForm setShowTipForm={setShowModal} tipId={tip.id} />
        </Modal>
      )}
      {showButtons && (
        <>
          <button
            hidden={
              sessionUser && sessionUser.id === tip?.userId ? false : true
            }
            onClick={() => setShowModal(true)}
            className={`material-icons ${styles.editButton}`}
          >
            edit
          </button>
          <button
            hidden={
              sessionUser && sessionUser.id === tip?.userId ? false : true
            }
            onClick={() => handleDelete(tip.id)}
            className={`material-icons ${styles.deleteButton}`}
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
      <div className={styles.tipText}>{tip.text}</div>
    </div>
  );
}

export default TipBox;
