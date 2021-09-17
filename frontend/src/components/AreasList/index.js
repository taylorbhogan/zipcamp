import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import { getUsStates } from '../../store/usStates';
import MapContainer from '../Maps';
import { getAreas, searchAreas } from '../../store/areas';
import AreaBox from '../AreaBox';
import Dropdown from '../parts/Dropdown';
import styles from './AreasList.module.css'


function AreasList() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null)
  const [designation, setDesignation] = useState(null)
  const [designations, setDesignations] = useState([])
  const [usStates, setUsStates] = useState([])

  const areas = useSelector(state => Object.values(state.areas))

  useEffect(() => {
    if (Object.keys(areas).length === 0) dispatch(getAreas())
  },[dispatch, areas])

useEffect(() => {
  const fetchDesignations = async () => {
    const res = await csrfFetch('/api/designations')
    const data = await res.json()
    setDesignations(data)
  }
  fetchDesignations()
},[])

useEffect(() => {
  (async () => {
    const usStates = await dispatch(getUsStates())
    setUsStates(usStates)
  })()
},[dispatch])

useEffect(() => {
  dispatch(searchAreas(designation, location))
},[dispatch, designation, location])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageLeft}>
        <div className={styles.search}>
          <span>Explore</span>
          <Dropdown
            placeholder={'Public Lands'}
            items={designations}
            setFunction={setDesignation}/>
          <span>in</span>
          <Dropdown
            placeholder={'The United States'}
            items={usStates}
            setFunction={setLocation}/>
        </div>
        {areas.map(area => (
          <AreaBox area={area} />
        ))}
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
