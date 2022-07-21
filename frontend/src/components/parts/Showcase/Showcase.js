import styles from "./Showcase.module.css";
import { Modal } from "../../../context/Modal";
import Image from "../Image";
import CloseModalButton from "../CloseModalButton";
import { useEffect } from "react";

const Showcase = ({ spot, setShowModal, selectedPhoto, setSelectedPhoto }) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  function handleKeydown(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 8:
        rotateLeft();
        break;
      case 37:
        rotateLeft();
        break;
      case 39:
        rotateRight();
        break;
      case 32:
        rotateRight();
        break;
      case 13:
        rotateRight();
        break;
      case 27:
        setShowModal(false);
        break;
      default:
        break;
    }
  }

  function rotateLeft() {
    setSelectedPhoto((selectedPhoto) =>
      selectedPhoto <= 0 ? spot.SpotImages.length - 1 : selectedPhoto - 1
    );
  }

  function rotateRight() {
    setSelectedPhoto((selectedPhoto) =>
      selectedPhoto >= spot.SpotImages.length - 1 ? 0 : selectedPhoto + 1
    );
  }

  return (
    <Modal onClose={() => setShowModal(false)}>
      <CloseModalButton closeFunction={() => setShowModal(false)} />
      <div className={styles.showcaseWrapper}>
        <button onClick={rotateLeft}>{"<"}</button>
        <Image
          src={spot.SpotImages[selectedPhoto]?.imgUrl}
          alt={"a user-submitted spot"}
          onClick={rotateRight}
        />
        <button onClick={rotateRight}>{">"}</button>
      </div>
    </Modal>
  );
};

export default Showcase;
