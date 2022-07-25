import PageButton from "./PageButton";

const PageButtons = ({ resultPages, resultPageNum, setResultPageNum }) => {
  // if there are fewer than 10 result pages given the current query, display buttons for all result pages
  if (resultPages.length <= 10) {
    return (
      <>
        {resultPages.map((page, idx) => (
          <PageButton
            key={idx}
            onClick={setResultPageNum}
            value={idx + 1}
            isSelected={resultPageNum === idx + 1}
          />
        ))}
      </>
    );
  }

  // if the current result page number is < 7, display buttons for the first 10 result pages
  if (resultPageNum < 7) {
    return (
      <>
        {resultPages.slice(0, 10).map((page, idx) => (
          <PageButton
            key={idx}
            onClick={setResultPageNum}
            value={idx + 1}
            isSelected={resultPageNum === idx + 1}
          />
        ))}
      </>
    );
  }

  // if the current result page number is < 6 from the end, display buttons for the last 10 result pages
  if (resultPageNum > resultPages.length - 5) {
    return (
      <>
        {resultPages.slice(-10).map((page, idx) => (
          <PageButton
            key={idx}
            onClick={setResultPageNum}
            value={resultPages.length - 9 + idx}
            isSelected={resultPageNum === resultPages.length - 9 + idx}
          />
        ))}
      </>
    );
  }

  // else we're somewhere in the middle of the search results; display buttons 5 previous pages and the 4 following pages
  return (
    <>
      <PageButton onClick={setResultPageNum} value={resultPageNum - 5} />
      <PageButton onClick={setResultPageNum} value={resultPageNum - 4} />
      <PageButton onClick={setResultPageNum} value={resultPageNum - 3} />
      <PageButton onClick={setResultPageNum} value={resultPageNum - 2} />
      <PageButton onClick={setResultPageNum} value={resultPageNum - 1} />
      <PageButton
        onClick={setResultPageNum}
        value={resultPageNum}
        isSelected={true}
      />
      <PageButton onClick={setResultPageNum} value={resultPageNum + 1} />
      <PageButton onClick={setResultPageNum} value={resultPageNum + 2} />
      <PageButton onClick={setResultPageNum} value={resultPageNum + 3} />
      <PageButton onClick={setResultPageNum} value={resultPageNum + 4} />
    </>
  );
};

export default PageButtons;
