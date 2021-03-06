import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpot } from "../../store/spots";

import styles from "./SpotFinderCard.module.css";

function SpotFinderCard({ openEditModal, spot }) {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showConfirmDeleteButton, setShowConfirmDeleteButton] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleMenu = () => {
    setShowDeleteButton(!showDeleteButton);
    if (showConfirmDeleteButton) {
      setShowConfirmDeleteButton(false);
    }
  };

  const handleDelete = async () => {
    const response = await dispatch(deleteSpot(spot.id));
    if (response) {
      history.push("/spots");
    }
  };

  const handleEditClick = () => {
    openEditModal();
    toggleMenu();
  };

  return (
    <div className={styles.container}>
      {spot?.userId === sessionUser?.id ? (
        <>
          <div className={styles.left}>
            <p>you added this spot</p>
            <div className={styles.buttons}>
              <button onClick={toggleMenu}>
                {showDeleteButton ? "close" : "need to make changes?"}
              </button>
              {showDeleteButton && (
                <>
                  <button onClick={handleEditClick}>edit spot</button>
                  {showConfirmDeleteButton ? (
                    <button onClick={handleDelete} id={styles.confirmDelete}>
                      are you sure?
                    </button>
                  ) : (
                    <button onClick={() => setShowConfirmDeleteButton(true)}>
                      delete spot
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={styles.profileImage}></div>
        </>
      ) : (
        <>
          <div className={styles.left}>
            <p>Discovered by:</p>
            <p>{spot?.User?.username}</p>
          </div>
          <div className={styles.profileImage}></div>
        </>
      )}
    </div>
  );
}

export default SpotFinderCard;
