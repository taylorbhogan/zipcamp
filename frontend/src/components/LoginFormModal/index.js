import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './../../vars.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={'modalCard'}>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal className={'modalCard'} onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
