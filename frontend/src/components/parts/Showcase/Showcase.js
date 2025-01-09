import { useEffect, useCallback } from "react";
import styles from "./Showcase.module.css";
import { Modal } from "../../../context/Modal";
import Image from "../Image";
import CloseModalButton from "../CloseModalButton";

const Showcase = ({ spot, setShowModal, selectedPhoto, setSelectedPhoto }) => {
  const rotateLeft = useCallback(() => {
    setSelectedPhoto((selectedPhoto) =>
      selectedPhoto <= 0 ? spot.SpotImages.length - 1 : selectedPhoto - 1
    );
  }, [setSelectedPhoto, spot.SpotImages.length]);

  const rotateRight = useCallback(() => {
    setSelectedPhoto((selectedPhoto) =>
      selectedPhoto >= spot.SpotImages.length - 1 ? 0 : selectedPhoto + 1
    );
  }, [setSelectedPhoto, spot.SpotImages.length]);

  const handleKeydown = useCallback(
    (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 8:
        case 37:
          rotateLeft();
          break;
        case 39:
        case 32:
        case 13:
          rotateRight();
          break;
        case 27:
          setShowModal(false);
          break;
        default:
          break;
      }
    },
    [rotateLeft, rotateRight, setShowModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <Modal onClose={() => setShowModal(false)}>
      <CloseModalButton closeFunction={() => setShowModal(false)} />
      <div className={styles.showcaseContainer}>
        <button onClick={rotateLeft}>{"<"}</button>
        <div className={styles.showcaseWrapper}>
          <Image
            src={spot.SpotImages[selectedPhoto]?.imgUrl}
            alt={"a user-submitted spot"}
            onClick={rotateRight}
          />
        </div>
        <button onClick={rotateRight}>{">"}</button>
      </div>
    </Modal>
  );
};

export default Showcase;
