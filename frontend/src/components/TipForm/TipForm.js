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
  console.log(tipId);

  const [errors, setErrors] = useState([]);
  const [tipText, setTipText] = useState(tip ? tip.text : "");
  const [rating, setRating] = useState(tip ? tip.rating : null);
  const [hoverRating, setHoverRating] = useState(tip ? tip.rating : null);

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
          rating,
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
          rating,
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
    <div className={styles.addTipFormContainer}>
      <CloseModalButton closeFunction={() => setShowTipForm(false)} />
      <form className="form" onSubmit={handleSubmit}>
        <h1 className={"formHeader"}>add a tip</h1>
        {errors.length > 0 && <Errors errors={errors} />}
        <div className={styles.buttons}>
          <button
            style={
              rating >= 1
                ? { color: "var(--green1)", transform: "var(--starScale)" }
                : hoverRating >= 1
                ? { transform: "var(--starScale)" }
                : null
            }
            type="button"
            className="material-icons"
            onClick={(e) => setRating(e.target.dataset.rating)}
            onMouseEnter={(e) => setHoverRating(e.target.dataset.rating)}
            data-rating={1}
          >
            grade
          </button>
          <button
            style={
              rating >= 2
                ? { color: "var(--green1)", transform: "var(--starScale)" }
                : hoverRating >= 2
                ? { transform: "var(--starScale)" }
                : null
            }
            type="button"
            className="material-icons"
            onClick={(e) => setRating(e.target.dataset.rating)}
            onMouseEnter={(e) => setHoverRating(e.target.dataset.rating)}
            data-rating={2}
          >
            grade
          </button>
          <button
            style={
              rating >= 3
                ? { color: "var(--green1)", transform: "var(--starScale)" }
                : hoverRating >= 3
                ? { transform: "var(--starScale)" }
                : null
            }
            type="button"
            className="material-icons"
            onClick={(e) => setRating(e.target.dataset.rating)}
            onMouseEnter={(e) => setHoverRating(e.target.dataset.rating)}
            data-rating={3}
          >
            grade
          </button>
          <button
            style={
              rating >= 4
                ? { color: "var(--green1)", transform: "var(--starScale)" }
                : hoverRating >= 4
                ? { transform: "var(--starScale)" }
                : null
            }
            type="button"
            className="material-icons"
            onClick={(e) => setRating(e.target.dataset.rating)}
            onMouseEnter={(e) => setHoverRating(e.target.dataset.rating)}
            data-rating={4}
          >
            grade
          </button>
          <button
            style={
              rating >= 5
                ? { color: "var(--green1)", transform: "var(--starScale)" }
                : hoverRating >= 5
                ? { transform: "var(--starScale)" }
                : null
            }
            type="button"
            className="material-icons"
            onClick={(e) => setRating(e.target.dataset.rating)}
            onMouseEnter={(e) => setHoverRating(e.target.dataset.rating)}
            data-rating={5}
          >
            grade
          </button>
        </div>
        <Input
          type="textarea"
          value={tipText}
          placeholder={" what do you want to remember for next time?"}
          ariaLabel={"what do you want to remember for next time?"}
          onChange={handleChange}
          required={false}
        />
        <button type="submit" className={"submitButton"}>
          {tipId ? "save your tip" : "add your tip"}
        </button>
      </form>
    </div>
  );
}

export default TipForm;
