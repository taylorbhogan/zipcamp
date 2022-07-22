const Star = ({ rating, setRating, hoverRating, setHoverRating, starNumber }) => {
  return (
    <button
      style={
        rating >= starNumber
          ? { color: "var(--green1)", transform: "var(--starScale)" }
          : hoverRating >= starNumber
          ? { transform: "var(--starScale)" }
          : null
      }
      type="button"
      className="material-icons"
      onClick={(e) => setRating(e.target.dataset.rating)}
      onMouseEnter={(e) => setHoverRating(e.target.dataset.rating)}
      data-rating={starNumber}
    >
      grade
    </button>
  );
};

export default Star;
