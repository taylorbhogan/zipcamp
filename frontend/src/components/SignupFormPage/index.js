import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import styles from './SignupForm.module.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div
      className={styles.pageContainer}
    >
      <div className={styles.signupForm}>
        <form
          onSubmit={handleSubmit}
          className={'form'}
        >
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          {/* <label>
            Email<br /> */}
            <input
              type="text"
              value={email}
              className={'formInput'}
              placeholder={' email'}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          {/* </label> */}
          {/* <label>
            Username<br /> */}
            <input
              type="text"
              value={username}
              className={'formInput'}
              placeholder={' username'}
              onChange={(e) => setUsername(e.target.value)}
              required
              />
          {/* </label> */}
          {/* <label>
            Password<br /> */}
            <input
              type="password"
              value={password}
              className={'formInput'}
              placeholder={' password'}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          {/* </label> */}
          {/* <label>
            Confirm Password<br /> */}
            <input
              type="password"
              value={confirmPassword}
              className={'formInput'}
              placeholder={' confirm password'}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          {/* </label> */}
          <button
            type="submit"
            className={'submitButton'}
          >Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
