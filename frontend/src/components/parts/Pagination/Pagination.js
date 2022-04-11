import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Pagination.module.css'

const Pagination = ({ resultsPerPage }) => {
  const totalSearchResults = useSelector(state => state.areas.searchResultsLength)
  const [resultPages, setResultPages] = useState([])
  const [resultPageNum, setResultPageNum] = useState(1)

  useEffect(() => {
    const numResultsPages = Math.ceil(totalSearchResults / resultsPerPage);
    setResultPages(Array(numResultsPages).fill(null))
  },[resultsPerPage, totalSearchResults])

  return (
    <div className={styles.container}>
      {resultPageNum > 1 && <button>Prev</button>}
      {/* {resultPages.map(result => <button>button</button>)} */}
      {resultPageNum < resultPages && <button>Next</button>}
    </div>
  )
}

export default Pagination;
