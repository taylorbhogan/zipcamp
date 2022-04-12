import styles from './PageButton.module.css'

const PageButton = ({ onClick, value }) => {
  return <button className={styles.button} onClick={() => onClick(value)}>{value}</button>;
};

export default PageButton;
