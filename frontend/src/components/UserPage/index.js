import { useSelector } from "react-redux";
import styles from "./UserPage.module.css";

const UserPage = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className={"contentWrapper"}>
      <div className={"contentContainer"}>
        <div className={styles.userContent}>
          <div className={styles.left}>Left</div>
          <div className={styles.right}>
            <div>{user.username}</div>
            <div>{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
