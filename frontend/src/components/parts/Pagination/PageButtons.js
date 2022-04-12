import PageButton from "./PageButton";

const PageButtons = ({ resultPages, resultPageNum, setResultPageNum }) => {
  if (resultPages.length <= 10) {
    return (
      <>
        {resultPages.map((page, idx) => (
          <PageButton onClick={setResultPageNum} value={idx + 1} />
        ))}
      </>
    );
  }

  if (resultPageNum < 7) {
    return (
      <>
        {resultPages.slice(0, 10).map((page, idx) => (
          <PageButton onClick={setResultPageNum} value={idx + 1} />
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
      <PageButton onClick={setResultPageNum} value={resultPageNum - 5} />
      <PageButton onClick={setResultPageNum} value={resultPageNum - 4} />
      <PageButton onClick={setResultPageNum} value={resultPageNum - 3} />
      <PageButton onClick={setResultPageNum} value={resultPageNum - 2} />
      <PageButton onClick={setResultPageNum} value={resultPageNum - 1} />
      <PageButton onClick={setResultPageNum} value={resultPageNum} />
      <PageButton onClick={setResultPageNum} value={resultPageNum + 1} />
      <PageButton onClick={setResultPageNum} value={resultPageNum + 2} />
      <PageButton onClick={setResultPageNum} value={resultPageNum + 3} />
      <PageButton onClick={setResultPageNum} value={resultPageNum + 4} />
    </>
  );
};

export default PageButtons;
