import styles from './MessageNoAreas.module.css'

const MessageNoAreas = () => {
  return (
    <div className={styles.message}>
      <p>There are no Federal pulic lands with that distinction in that location.</p>
      <p>Try changing your selection or click clear to view all areas.</p>
    </div>
  )
}

export default MessageNoAreas;
