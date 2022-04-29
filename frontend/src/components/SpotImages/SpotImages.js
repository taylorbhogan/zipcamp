import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpotImage } from '../../store/spotImages';
import styles from './SpotImages.module.css'

const SpotImages = ({spot}) => {
  const [ image, setImage ] = useState(null)
  const [errors, setErrors] = useState([])
  const spotImages = spot?.SpotImages
  console.log("spotImages",spotImages);
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    let newErrors = [];
    dispatch(createSpotImage({image, spotId: spot.id}))
      .then(() => {
        setImage(null)

      })
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          newErrors = data.errors;
          setErrors(newErrors)
        }
      })
  }

  const updateFile = e => {
    const file = e.target.files[0]
    if (file) setImage(file)
  }

  return (
    <div className={styles.container}>
      <h2>Add your own photos of this spot!</h2>
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
      <form onSubmit={handleSubmit}>
        <label>
          <input type='file' onChange={updateFile} />
        </label>
        <button type='submit'>Upload image</button>
      </form>
      <div className={styles.imageContainer}>
        {spot?.SpotImages.map(img => (
          <img src={img.imgUrl} alt={"spot"}/>
        ))}
      </div>
    </div>
  )
}

export default SpotImages;
