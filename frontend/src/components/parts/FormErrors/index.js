import styles from './FormErrors.module.css'

const FormErrors = ({ errors }) => {
  return (
    <ul className={styles.errors}>
      {errors.filter(error => error !== 'Invalid value').map((error, idx) => (
        <li key={idx}>{error}</li>
      ))}
    </ul>
  )
}

export default FormErrors;
