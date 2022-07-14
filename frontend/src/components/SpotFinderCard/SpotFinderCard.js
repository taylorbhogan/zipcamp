import { useSelector } from "react-redux";

import styles from "./SpotFinderCard.module.css";

function SpotFinderCard({ setEditModal, spotId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.allSpots[spotId]);

  return (
    <div className={styles.container}>
      {spot?.userId === sessionUser?.id ? (
        <>
          <div>
            <p>You added this spot</p>
            <button onClick={setEditModal}>Need to make changes?</button>
          </div>
          <div className={styles.profileImage}></div>
        </>
      ) : (
        <>
          <div>
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
