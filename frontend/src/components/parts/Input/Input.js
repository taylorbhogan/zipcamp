import styles from "./Input.module.css";

const Input = ({
  type,
  value,
  placeholder,
  ariaLabel,
  onChange,
  required,
  rows = "4",
}) => {
  if (type === "text") {
    return (
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={onChange}
        required={required}
        className={styles.input}
      ></input>
    );
  } else if (type === "textarea") {
    return (
      <textarea
        type="textarea"
        rows={rows}
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={onChange}
        required={required}
        className={styles.input}
      ></textarea>
    );
  } else if (type === "password") {
    return (
      <input
        type="password"
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={onChange}
        required={required}
        className={styles.input}
      ></input>
    );
  } else {
    return null;
  }
};

export default Input;
