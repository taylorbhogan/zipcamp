import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './../../vars.css'
import styles from './LoginFormModal.module.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={'modalCard'}>
      <button
        onClick={() => setShowModal(true)}
        className={styles.loginButton}
      >log in</button>
      {showModal && (
        <Modal className={'modalCard'} onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
