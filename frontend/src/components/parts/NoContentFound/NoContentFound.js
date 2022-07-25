import styles from "./NoContentFound.module.css";

const NoContentFound = ({ line1, line2 }) => {
  return (
    <div className={styles.message}>
      <p>{line1}</p>
      <p>{line2}</p>
    </div>
  );
};

export default NoContentFound;
