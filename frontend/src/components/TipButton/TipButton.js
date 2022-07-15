import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import TipForm from "../TipForm";
import styles from "./TipButton.module.css";

function TipButton({ spot }) {
  const sessionUser = useSelector((state) => state.session.user);

  const [showTipForm, setShowTipForm] = useState(false);

  return (
    <>
      <button
        hidden={sessionUser ? false : true}
        onClick={() => setShowTipForm(true)}
        className={styles.button}
      >
        add a tip
      </button>
      {showTipForm && (
        <Modal onClose={() => setShowTipForm(false)}>
          <TipForm isNew={true} setShowTipForm={setShowTipForm} />
        </Modal>
      )}
    </>
  );
}

export default TipButton;
