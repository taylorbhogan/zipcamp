import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session'
import styles from './DemoLoginButton.module.css'

const DemoLoginButton = ({buttonText, closeFunction}) => {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleDemoLogin = () => {
    if (closeFunction) closeFunction(false)
    return dispatch(sessionActions.login({ credential: "Levi Shaber", password: "password" })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  }

  return (
    <button
      onClick={handleDemoLogin}
      className={styles.button}
      >
      {errors.length > 0 ? errors : buttonText}
    </button>
  )
}

export default DemoLoginButton;
