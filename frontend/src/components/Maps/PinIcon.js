const PinIcon = ({
  color = "green",
  fontSize = "18px",
  icon }) => {
  return (
    <div
      style={{
        fontSize: fontSize,
        color: color,
      }}
      className="material-icons"
    >
      {icon}
    </div>
  );
};

export default PinIcon;