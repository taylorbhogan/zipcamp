import styles from "./Errors.module.css";

const Errors = ({ errors }) => {
  return (
    <ul className={styles.errors}>
      {errors
        .filter((error) => error !== "Invalid value")
        .map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
    </ul>
  );
};

export default Errors;
