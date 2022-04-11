import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Pagination.module.css'

const Pagination = ({ resultsPerPage, resultPageNum, setResultPageNum }) => {
  const totalSearchResults = useSelector(state => state.areas.searchResultsLength)
  const [resultPages, setResultPages] = useState([])

  useEffect(() => {
    const numResultsPages = Math.ceil(totalSearchResults / resultsPerPage);
    setResultPages(Array(numResultsPages).fill(null))
    // console.log('resultPages',resultPages);
  },[resultsPerPage, totalSearchResults])

  const pagePrev = () => {
    setResultPageNum(--resultPageNum);
  }

  const pageNext = () => {
    setResultPageNum(++resultPageNum);
  }

  return (
    <div className={styles.container}>
      {resultPageNum > 1 && <button onClick={pagePrev}>Prev</button>}
      {/* {resultPages.map(result => <button>button</button>)} */}
      
       {/* how many buttons? */}
           {/* const buttonCount = resultPages >= 9 ? 9 : resultPages */}
       {/* which buttons to render? */}
          {/* if resultPages <= 10, render a button for each resultPage and be done with it */}
          {/* else */}
              {/* if resultPageNum < 7 */}
                  {/* render the first 10 */}
              {/* if resultPageNum > resultPages - 5  */}
                  {/* render the last 10 */}
              {/* else */}
                  {/* render resultPageNum, the 5 before it, and the 4 after it */}
      {resultPageNum < resultPages.length && <button onClick={pageNext}>Next</button>}
    </div>
  )
}

export default Pagination;
