import styles from './MessageNoAreas.module.css'

const MessageNoAreas = () => {
  return (
    <div className={styles.message}>
      <p>There are no Federal public lands with that distinction in that location in the rec.gov database.</p>
      <p>Try changing your selection or click clear to view all areas.</p>
    </div>
  )
}

export default MessageNoAreas;
