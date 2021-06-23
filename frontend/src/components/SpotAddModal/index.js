import React, { useState } from "react";
import { Modal } from '../../context/Modal'
import SpotAddForm from "../SpotAddForm";


function SpotAddModal(){
  const [showSpotAddModal, setShowSpotAddModal] = useState(false);

  return(
    <div>
      <button
        onClick={() => setShowSpotAddModal(true)}
      >click me to add a spot</button>
      {showSpotAddModal && (
        <Modal onClose={() => setShowSpotAddModal(false)}>
          <SpotAddForm />
        </Modal>
      )}
    </div>
  )
}

export default SpotAddModal;
