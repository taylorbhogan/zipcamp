import styles from './Input.module.css'

const Input = ({ type, value, placeholder, ariaLabel, onChange, required }) => {
  return (
    <>
      {type === 'text' ?
        <input
          type='text'
          value={value}
          placeholder={placeholder}
          ariaLabel={ariaLabel}
          onChange={onChange}
          required={required}
          className={styles.input}
        ></input>
        :
        <textarea
          type='textarea'
          value={value}
          placeholder={placeholder}
          ariaLabel={ariaLabel}
          onChange={onChange}
          required={required}
          className={styles.formTextAreaInput}
        ></textarea>
      }
    </>
  )
}

export default Input;
