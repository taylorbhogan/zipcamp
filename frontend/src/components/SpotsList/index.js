import React from 'react'
import styles from './SpotsList.module.css'
import SpotBox from '../SpotBox';

function SpotsList(){
  return(
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <p>hello</p>
        <SpotBox />
        <SpotBox />
        <SpotBox />
      </div>
    </div>
  )
}

export default SpotsList;
