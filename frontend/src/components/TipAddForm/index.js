import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import '../../index.css'
import { createTip } from '../../store/tips';
import styles from './TipAddForm.module.css'
import Input from '../parts/Input';

function TipAddForm({ setShowTipAddModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();

  const [errors, setErrors] = useState([])
  const [tipText, setTipText] = useState('')

  const userId = useSelector(state => state.session.user?.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if (!tipText) errors.push('Please add a tip!');

    setErrors(errors)

    const newTip = {
      userId,
      spotId,
      text: tipText,
      tipRating: 0
    };

    let createdTip = await dispatch(createTip(newTip))
    if (createdTip) {
      setShowTipAddModal(false)
      history.push(`/spots/${spotId}`);
    }
  };


  return (
    <div className={styles.addTipFormWrapper}>
      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <h1
          className={'formHeader'}
        >add a tip</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <Input
          type="textarea"
          value={tipText}
          placeholder={' what do you want to remember for next time?'}
          ariaLabel={'what do you want to remember for next time?'}
          onChange={(e) => setTipText(e.target.value)}
          required={true}
        />
        <button
          type="submit"
          className={'submitButton'}
        >Add your tip</button>
      </form>
    </div>
  )
}

export default TipAddForm;
