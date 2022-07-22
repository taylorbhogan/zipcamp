import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import Input from "../parts/Input";
import styles from "./LoginForm.module.css";
import "./../../index.css";
import Errors from "../parts/Errors";

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
      <form className={"form"} onSubmit={handleSubmit}>
        <h1 className={"formHeader"}>welcome back.</h1>
        {errors.length > 0 && <Errors errors={errors} />}
        <Input
          type="text"
          value={credential}
          placeholder={" username"}
          ariaLabel={"username"}
          onChange={(e) => setCredential(e.target.value)}
          required={true}
        />
        <Input
          type="password"
          value={password}
          placeholder={" password"}
          ariaLabel={"password"}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <button type="submit" className={"submitButton"}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
