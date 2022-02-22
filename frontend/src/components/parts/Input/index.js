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
        ariaLabel={ariaLabel}
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
        ariaLabel={ariaLabel}
        onChange={onChange}
        required={required}
        className={styles.formTextAreaInput}
      ></textarea>
    );
  } else if (type === "password") {
    return (
      <input
        type="password"
        value={value}
        placeholder={placeholder}
        ariaLabel={ariaLabel}
        onChange={onChange}
        required={required}
        className={styles.input}
      ></input>
    );
  }
};

export default Input;
