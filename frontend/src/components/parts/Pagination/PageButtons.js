import PageButton from "./PageButton";

const PageButtons = ({ resultPages, resultPageNum, setResultPageNum }) => {
  if (resultPages.length <= 10) {
    return (
      <>
        {resultPages.map((page, idx) => (
          <button onClick={() => setResultPageNum(idx + 1)} key={idx}>
            {idx + 1}
          </button>
        ))}
      </>
    );
  }

  if (resultPageNum < 7) {
    return (
      <>
        {resultPages.slice(0, 10).map((page, idx) => (
          <button onClick={() => setResultPageNum(idx + 1)} key={idx}>
            {idx + 1}
          </button>
        ))}
      </>
    );
  }

  if (resultPageNum > resultPages.length - 5) {
    return (
      <>
        {resultPages.slice(-10).map((page, idx) => (
          <PageButton
            onClick={setResultPageNum}
            value={resultPages.length - 9 + idx}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <button onClick={() => setResultPageNum(resultPageNum - 5)}>
        {resultPageNum - 5}
      </button>
      <button onClick={() => setResultPageNum(resultPageNum - 4)}>
        {resultPageNum - 4}
      </button>
      <button onClick={() => setResultPageNum(resultPageNum - 3)}>
        {resultPageNum - 3}
      </button>
      <button onClick={() => setResultPageNum(resultPageNum - 2)}>
        {resultPageNum - 2}
      </button>
      <button onClick={() => setResultPageNum(resultPageNum - 1)}>
        {resultPageNum - 1}
      </button>
      <button onClick={() => setResultPageNum(resultPageNum)}>
        {resultPageNum}
      </button>
      <button onClick={() => setResultPageNum(resultPageNum + 1)}>
        {resultPageNum + 1}
      </button>
      <button onClick={() => setResultPageNum(resultPageNum + 2)}>
        {resultPageNum + 2}
      </button>
      <button onClick={() => setResultPageNum(resultPageNum + 3)}>
        {resultPageNum + 3}
      </button>
      <button onClick={() => setResultPageNum(resultPageNum + 4)}>
        {resultPageNum + 4}
      </button>
    </>
  );
};

export default PageButtons;
