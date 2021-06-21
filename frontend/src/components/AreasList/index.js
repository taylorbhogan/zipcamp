import React from 'react'
import styles from './AreasList.module.css'
import AreaBox from '../AreaBox'

function AreasList(){
  return(
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <p>hello</p>
        <AreaBox />
        <AreaBox />
        <AreaBox />
      </div>
    </div>
  )
}

export default AreasList;
