import { useSelector } from 'react-redux';


import styles from './SpotFinderCard.module.css'

function SpotFinderCard ({setEditModal, spotId}) {
  const sessionUser = useSelector(state => state.session.user);
  const spot = useSelector((state) => state.spots.allSpots[spotId])


  return (

  <div className={styles.SpotDivInfoLeft}>
  <div className={styles.profileImage}></div>
  {(spot?.userId === sessionUser?.id ?
    <>
      <p>You added this spot</p>
      <button
        onClick={setEditModal}
        // onClick={() => setShowEditModal(true)}
        className={styles.editButton}>
        Need to make changes?
      </button>
    </>
    :
    <>
      <p>Discovered by</p>
      <p>{spot?.User?.username}</p>
    </>
  )}
</div>
  )

}

export default SpotFinderCard;
