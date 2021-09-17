import React from 'react'
import { useState } from 'react';
import ExploreResults from '../Explore/ExploreResults';
import MapContainer from '../Maps';
import styles from './AreasList.module.css'


function AreasList() {
  const [location, setLocation] = useState('The United States')
  const [designation, setDesignation] = useState('Public Lands')

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageLeft}>
        <div className={styles.search}>
          <span>Explore</span>
          <input placeholder={designation}></input>
          <span>in</span>
          <input placeholder={location}></input>
        </div>
        <ExploreResults />
      </div>
      <div className={styles.pageRight}>
        <MapContainer
          lat={41.067262}
          long={-119.029180}
        />
      </div>
    </div>
  )
}

export default AreasList;
