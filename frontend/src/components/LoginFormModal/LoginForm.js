import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import styles from './LoginForm.module.css'
import './../../index.css'


function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className={styles.loginForm}>
      <form
        className={'form'}
        onSubmit={handleSubmit}
      >
        <h1 className={'formHeader'}>Welcome back.</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        {/* <label className={'formInputLabel'}>
          Username or Email:
          <br /> */}
        <input
          type="text"
          className={'formInput'}
          value={credential}
          placeholder={' username'}
          onChange={(e) => setCredential(e.target.value)}
          required
          />
        {/* </label> */}
        {/* <label className={'formInputLabel'}>
          Password:
          <br /> */}
        <input
          type="password"
          className={'formInput'}
          value={password}
          placeholder={' password'}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* </label> */}
        <button
          type="submit"
          className={'submitButton'}
        >Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
