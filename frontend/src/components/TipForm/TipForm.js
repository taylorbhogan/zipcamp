import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "../../index.css";
import { createTip, editTip } from "../../store/tips";
import styles from "./TipForm.module.css";
import Input from "../parts/Input";
import Errors from "../parts/Errors";
import CloseModalButton from "../parts/CloseModalButton";

function TipForm({ setShowTipForm, tipId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();

  const userId = useSelector((state) => state.session.user?.id);
  const tip = useSelector((state) => state.tips.allTips[tipId]);

  const [errors, setErrors] = useState([]);
  const [tipText, setTipText] = useState(tip ? tip.text : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tipText) {
      setErrors(["Please add a tip!"]);
    } else {
      if (tipId) {
        const newTip = {
          ...tip,
          userId,
          spotId,
          text: tipText,
          tipRating: 0,
        };

        const editedTip = await dispatch(editTip(newTip));
        if (editedTip) {
          setShowTipForm(false);
          history.push(`/spots/${spotId}`);
        }
      } else {
        const newTip = {
          userId,
          spotId,
          text: tipText,
          tipRating: 0,
        };

        const createdTip = await dispatch(createTip(newTip));
        if (createdTip) {
          setShowTipForm(false);
          history.push(`/spots/${spotId}`);
        }
      }
    }
  };

  const handleChange = (e) => {
    setErrors([]);
    setTipText(e.target.value);
  };

  return (
    <div className={styles.addTipFormWrapper}>
      <CloseModalButton closeFunction={() => setShowTipForm(false)} />
      <form className="form" onSubmit={handleSubmit}>
        <h1 className={"formHeader"}>add a tip</h1>
        <Errors errors={errors} />
        <Input
          type="textarea"
          value={tipText}
          placeholder={" what do you want to remember for next time?"}
          ariaLabel={"what do you want to remember for next time?"}
          onChange={handleChange}
          required={false}
        />
        <button type="submit" className={"submitButton"}>
          Add your tip
        </button>
      </form>
    </div>
  );
}

export default TipForm;
