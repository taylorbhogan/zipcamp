import styles from './CloseModalButton.module.css'

const CloseModalButton = ({ closeFunction }) => {
  return (
    <button
      onClick={closeFunction}
      className={`material-icons ${styles.button}`}
      >close</button>
  )
}

export default CloseModalButton;
