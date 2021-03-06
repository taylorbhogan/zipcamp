import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../parts/Input";
import * as sessionActions from "../../store/session";

import styles from "./SignupForm.module.css";
import Errors from "../parts/Errors";

function SignupForm() {
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
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.signupForm}>
        <form onSubmit={handleSubmit} className={"form"}>
          {errors.length > 0 && <Errors errors={errors} />}
          <Input
            type="text"
            value={email}
            placeholder={" email"}
            ariaLabel={"email"}
            onChange={(e) => setEmail(e.target.value)}
            required={false}
          />
          <Input
            type="text"
            value={username}
            placeholder={" username"}
            ariaLabel={"username"}
            onChange={(e) => setUsername(e.target.value)}
            required={false}
          />
          <Input
            type="password"
            value={password}
            placeholder={" password"}
            ariaLabel={"password"}
            onChange={(e) => setPassword(e.target.value)}
            required={false}
          />
          {password.length > 0 && (
            <Input
              type="password"
              value={confirmPassword}
              placeholder={" confirm password"}
              ariaLabel={"confirm password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={false}
            />
          )}
          <button type="submit" className={"submitButton"}>
            sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
