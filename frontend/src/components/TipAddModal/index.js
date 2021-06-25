import React, { useState } from "react";
import { Modal } from '../../context/Modal'
import TipAddForm from "../TipAddForm";


function TipAddModal(){
  const [showTipAddModal, setShowTipAddModal] = useState(false);

  return(
    <div>
      <button
        onClick={() => setShowTipAddModal(true)}
      >click me to add a tip</button>
      {showTipAddModal && (
        <Modal onClose={() => setShowTipAddModal(false)}>
          <TipAddForm setShowTipAddModal={setShowTipAddModal} />
        </Modal>
      )}
    </div>
  )
}

export default TipAddModal;
