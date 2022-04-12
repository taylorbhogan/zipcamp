import styles from './PageButton.module.css'

const PageButton = ({ onClick, value, isSelected = false }) => {
  return <button className={`${styles.button} ${isSelected && styles.isSelected}`} onClick={() => onClick(value)}>{value}</button>;
};

export default PageButton;
