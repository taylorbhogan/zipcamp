import styles from './CloseModalButton.module.css'

const CloseModalButton = ({ closeFunction }) => {
  return (
    <button
      onClick={closeFunction}
      className={styles.button}
      >Close</button>
  )
}

export default CloseModalButton;
