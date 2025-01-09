const PinIcon = ({
  color = "green",
  fontSize = "24px",
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