import { useDispatch } from "react-redux";
import { deleteSpotImage } from "../../../store/spots";
import Image from "../Image";

import styles from "./GalleryImage.module.css";

const GalleryImage = ({ src, fallbackSrc, onClick, alt, id, img }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteSpotImage(id));
  };
  return (
    <>
      <Image
        src={src}
        alt={alt}
        onClick={onClick}
        fallbackSrc={fallbackSrc}
        id={id}
        key={id}
      />
      <button onClick={() => handleDelete(img.id)}>delete</button>
    </>
  );
};

export default GalleryImage;
