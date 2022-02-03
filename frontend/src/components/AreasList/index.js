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
  const [usState, setUsState] = useState(null)
  const [usStates, setUsStates] = useState([])
  const [organization, setOrganization] = useState(null)
  const [organizations, setOrganizations] = useState([])

  const areas = useSelector(state => Object.values(state.areas))
  // console.log('areas---------->',areas);

  const areaStats = {
    'Alabama': {
      'lat': 32.833572,
      'long': -86.678706,
    }
  }

  useEffect(() => {
    dispatch(getAreas())
  }, [dispatch])

  useEffect(() => {
    (async () => {
      const usStates = await dispatch(getUsStates())
      setUsStates(usStates)
    })()
  }, [dispatch])

  useEffect(() => {
    dispatch(searchAreas(organization?.id, usState?.abbreviation))
  }, [dispatch, organization, usState])


  useEffect(() => {

    (async () => {
      const res = await fetch(`/api/areas/from-rec-gov/organizations`)
      const data = await res.json()
      const filterOut = [
        'STATE PARKS',
        'FEDERAL',
        'Smithsonian Institution',
        'Utah',
        'Maryland',
        'Texas',
        'Virginia',
        'New Mexico',
        'US Air Force',
        'Smithsonian Institution Affiliations Program',
        '',
      ]
      const filteredData = data.filter(datum => {
        return !filterOut.includes(datum.name)
      })
      setOrganizations(filteredData)
    })()
  }, [])
  // console.log('organizations-------------->',organizations);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageLeft}>
        <div className={styles.search}>
          <span>Explore</span>
          {organizations.length > 0 ? <Dropdown
            placeholder={'Public Lands'}
            items={organizations}
            setFunction={setOrganization}
            plural={true}
          /> : 'Public Lands'
          }
          <span>in</span>
          <Dropdown
            placeholder={'The United States'}
            items={usStates}
            setFunction={setUsState} />
        </div>
        {areas.map(area => (
          <AreaBox key={area.id} area={area} />
        ))}
      </div>
      <div className={styles.pageRight}>
        <MapContainer
          lat={areaStats['Alabama'].lat}
          long={areaStats['Alabama'].long}
        // lat={41.067262}
        // long={-119.029180}
        />
      </div>
    </div>
  )
}

export default AreasList;
