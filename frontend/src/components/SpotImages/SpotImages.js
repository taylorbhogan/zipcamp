import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { createSpotImage } from "../../store/spots";
import PleaseLogin from "../parts/PleaseLogin";
import LoadingContent from "../parts/LoadingContent";
import styles from "./SpotImages.module.css";
import Showcase from "../parts/Showcase/Showcase";
import GalleryImage from "../parts/GalleryImage/GalleryImage";

const SpotImages = ({ spot }) => {
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPleaseLoginModal, setShowPleaseLoginModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const spotImages = useSelector((state) => state.spots[0]?.SpotImages);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let newErrors = [];
    dispatch(createSpotImage({ image, spotId: spot.id }))
      .then(() => {
        setImage(null);
        setIsLoading(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          newErrors = data.errors;
          setErrors(newErrors);
        }
      });
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleClick = (e) => {
    setSelectedPhoto(+e.target.id);
    setShowModal(true);
  };

  const onLabelClick = (e) => {
    if (!sessionUser) {
      e.preventDefault();
      setShowPleaseLoginModal(true);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add your own photos of this spot!</h2>
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
      {isLoading ? (
        <LoadingContent />
      ) : (
        <form onSubmit={handleSubmit}>
          <label onClick={onLabelClick} className={styles.fileSelect}>
            <input type="file" onChange={updateFile} />
            choose file
          </label>
          {image !== null && (
            <button type="submit" className={styles.fileUpload}>
              upload image
            </button>
          )}
        </form>
      )}
      {showPleaseLoginModal && (
        <Modal onClose={() => setShowPleaseLoginModal(false)}>
          <PleaseLogin setShowPleaseLoginModal={setShowPleaseLoginModal} />
        </Modal>
      )}
      <div className={styles.imageContainer}>
        {spotImages?.length > 0 ? (
          spotImages?.map((img, idx) => (
            <GalleryImage
              src={img.imgUrl}
              alt={"a user-submitted spot"}
              key={idx}
              id={idx}
              onClick={handleClick}
              img={img}
            />
          ))
        ) : (
          <img
            src={"/images/defaults/undraw_photo.svg"}
            alt="upload your own spot view!"
          />
        )}
      </div>
      {showModal && (
        <Showcase
          setShowModal={setShowModal}
          spot={spot}
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
        />
      )}
    </div>
  );
};

export default SpotImages;
