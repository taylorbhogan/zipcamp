import { useEffect } from "react";
import { useState } from "react";
import styles from "./Image.module.css";

const Image = ({
  src,
  fallbackSrc = "/images/defaults/undraw_404.svg",
  onClick,
  alt,
  id,
}) => {
  const [hasErrored, setHasErrored] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const onError = () => {
    if (!hasErrored) {
      setHasErrored(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      id={id ?? null}
      src={imgSrc}
      alt={alt}
      onClick={onClick}
      onError={onError}
      className={styles.img}
      key={id}
    />
  );
};

export default Image;
