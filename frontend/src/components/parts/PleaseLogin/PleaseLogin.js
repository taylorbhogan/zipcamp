import { NavLink } from "react-router-dom";
import CloseModalButton from "../CloseModalButton/CloseModalButton";
import DemoLoginButton from "../DemoLoginButton";
import styles from "./PleaseLogin.module.css";

const PleaseLogin = ({ setShowPleaseLoginModal }) => {
  return (
    <div className={styles.container}>
      {setShowPleaseLoginModal !== undefined && (
        <CloseModalButton
          closeFunction={() => setShowPleaseLoginModal(false)}
        />
      )}
      <span>Please </span>
      <NavLink className={styles.link} to="/signup">
        create an account
      </NavLink>
      <span>or</span>
      <DemoLoginButton
        buttonText={"log in as a demo user"}
        closeFunction={setShowPleaseLoginModal}
      />
      <span> to add your own spots.</span>
    </div>
  );
};

export default PleaseLogin;
