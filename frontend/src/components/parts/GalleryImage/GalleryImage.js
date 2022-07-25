import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSpotImage } from "../../../store/spots";
import Image from "../Image";

import styles from "./GalleryImage.module.css";

const GalleryImage = ({ src, fallbackSrc, onClick, alt, id, img }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteSpotImage(id));
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
    >
      <Image
        src={src}
        alt={alt}
        onClick={onClick}
        fallbackSrc={fallbackSrc}
        id={id}
      />
      {showDeleteButton && (
        <button
          className={`material-icons ${styles.deleteButton}`}
          onClick={() => handleDelete(img.id)}
        >
          delete
        </button>
      )}
    </div>
  );
};

export default GalleryImage;
