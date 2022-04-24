import { useSelector } from "react-redux";

import styles from "./SpotFinderCard.module.css";

function SpotFinderCard({ setEditModal, spotId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.allSpots[spotId]);

  return (
    <div className={styles.container}>
      {spot?.userId === sessionUser?.id ? (
        <>
          <div className={styles.profileImage}></div>
          <p>You added this spot</p>
          <button onClick={setEditModal}>Need to make changes?</button>
        </>
      ) : (
        <>
          <p>Discovered by:</p>
          <div className={styles.profileImage}></div>
          <p>{spot?.User?.username}</p>
        </>
      )}
    </div>
  );
}

export default SpotFinderCard;
