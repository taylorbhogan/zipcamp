import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageButtons from "./PageButtons";
import styles from "./Pagination.module.css";

const Pagination = ({ resultsPerPage, resultPageNum, setResultPageNum }) => {
  const totalSearchResults = useSelector(
    (state) => state.areas.searchResultsLength
  );
  const [resultPages, setResultPages] = useState([]);

  useEffect(() => {
    const numResultsPages = Math.ceil(totalSearchResults / resultsPerPage);
    setResultPages(Array(numResultsPages).fill(null));
  }, [resultsPerPage, totalSearchResults]);

  const pagePrev = () => {
    setResultPageNum(--resultPageNum);
  };

  const pageNext = () => {
    setResultPageNum(++resultPageNum);
  };

  return (
    <div className={styles.container}>
      {resultPageNum > 1 && <button className={styles.button} onClick={pagePrev}>Prev</button>}
      <PageButtons
        resultPages={resultPages}
        setResultPageNum={setResultPageNum}
        resultPageNum={resultPageNum}
      />
      {resultPageNum < resultPages.length && (
        <button className={styles.button} onClick={pageNext}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
