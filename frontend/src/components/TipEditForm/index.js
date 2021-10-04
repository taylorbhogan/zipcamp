import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import '../../index.css'
import { editTip } from '../../store/tips';
import Input from '../parts/Input';

function TipEditForm({spotId, setShowModal, tipId}){
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([])
  const userId = useSelector(state => state.session.user?.id);
  const tip = useSelector(state => state.tips.allTips[tipId]);

  const [tipText , setTipText] = useState(tip.text)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if(!tipText) errors.push('Please add a tip!');
    setErrors(errors)

  //use the values set in state by the form inputs to build our payload
  const newTip = {
    ...tip,
    userId,
    spotId,
    text: tipText,
    tipRating: 0
    // directions,
    // areaId: +area,
    // stateId: +stateId,
  };
// console.log(newSpot);
// TODO: Convert the below to an edit! Done. Just changed the words. Time to do the real work in the store
    //await the dispatch of the thunk creator
    let editedTip = await dispatch(editTip(newTip))
    console.log("editedTip", editedTip);
    if (editedTip) {
      //act on the response
      setShowModal(false)
      history.push(`/spots/${spotId}`);
    }
    // let createdSpot = await dispatch(createSpot(newSpot))
    // console.log("createdSpot", createdSpot);
    // if (createdSpot) {
    //   //act on the response
    //   history.push(`/spots/${createdSpot.id}`);
    // }
  };

  return(
    <div>
      <form 
        className='form'
        onSubmit={handleSubmit}
        >
        <h1
          className={'formHeader'}
        >what's important to remember?</h1>
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
        >Save your changes</button>
      </form>
    </div>
  )
}

export default TipEditForm;
