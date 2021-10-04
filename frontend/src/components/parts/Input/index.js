import styles from './Input.module.css'

const Input = ({ type, value, placeholder, ariaLabel, onChange, required }) => {
  return (
    <>
      {type === 'text' ?
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          ariaLabel={ariaLabel}
          onChange={onChange}
          required={required}
          className={styles.input}
        ></input>
        :
        <textarea
        ></textarea>
      }
    </>
  )
}

export default Input;
