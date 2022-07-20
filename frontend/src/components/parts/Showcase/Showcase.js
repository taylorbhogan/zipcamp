import styles from "./Showcase.module.css";
import { Modal } from "../../../context/Modal";
import CloseModalButton from "../CloseModalButton";

const Showcase = ({ spot, setShowModal, selectedPhoto, setSelectedPhoto }) => {
  const rotateLeft = () => {
    if (selectedPhoto === 0) {
      setSelectedPhoto(spot.SpotImages.length - 1);
    } else {
      setSelectedPhoto(selectedPhoto - 1);
    }
  };

  const rotateRight = () => {
    if (selectedPhoto === spot.SpotImages.length - 1) {
      setSelectedPhoto(0);
    } else {
      setSelectedPhoto(selectedPhoto + 1);
    }
  };

  return (
    <Modal onClose={() => setShowModal(false)}>
      <CloseModalButton closeFunction={() => setShowModal(false)} />
      <div className={styles.showcaseWrapper}>
        <button onClick={rotateLeft}>{"<"}</button>
        <img
          src={spot.SpotImages[selectedPhoto]?.imgUrl}
          alt="a user-submitted spot"
        />
        <button onClick={rotateRight}>{">"}</button>
      </div>
    </Modal>
  );
};

export default Showcase;
