import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session'
import styles from './DemoLoginButton.module.css'

const DemoLoginButton = ({ buttonText, closeFunction }) => {
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
    <div>
      {errors.length > 0 &&
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>}
      <button
        onClick={handleDemoLogin}
        className={styles.button}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default DemoLoginButton;
