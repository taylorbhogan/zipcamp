import { NavLink } from 'react-router-dom';
import DemoLoginButton from '../DemoLoginButton';
import styles from './PleaseLogin.module.css'

const PleaseLogin = ({ setShowPleaseLoginModal }) => {

  return (
    <div className={styles.container}>
      <button
        className={styles.xButton}
        onClick={() => setShowPleaseLoginModal(false)}>
        X
      </button>
      <span>Please </span>
      <NavLink className={styles.link} to='/signup'>create an account</NavLink>
      <span>or</span>
      <DemoLoginButton
        buttonText={'log in as a demo user'}
        closeFunction={setShowPleaseLoginModal}
      />
      <span> to add a spot.</span>
    </div>
  )
}

export default PleaseLogin;
