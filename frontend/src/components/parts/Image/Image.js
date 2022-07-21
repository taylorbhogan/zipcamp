import { useState } from "react";
import styles from "./Image.module.css";

const Image = ({
  src,
  fallbackSrc = "/images/defaults/undraw_404.svg",
  onClick,
  alt,
}) => {
  const [hasErrored, setHasErrored] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  const onError = () => {
    if (!hasErrored) {
      setHasErrored(true);
      setImgSrc(fallbackSrc);
    }
  };

  return <img src={imgSrc} alt={alt} onClick={onClick} onError={onError} />;
};

export default Image;
