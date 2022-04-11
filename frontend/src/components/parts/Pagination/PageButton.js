const PageButton = ({ onClick, value }) => {
  return <button onClick={() => onClick(value)}>{value}</button>;
};

export default PageButton;
