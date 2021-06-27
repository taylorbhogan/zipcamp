// the purpose of this component is to load & customize the map
// first we declare customizations that are then applied by the GoogleMap component
// then we use useJsApiLoader to do alllll the heavy lifting

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import styles from './Maps.module.css'


const containerStyle = {
  width: '500px',
  height: '400px',
};


const Maps = ({ apiKey, lat, long, isAdding = false, getLocation }) => {
  const [ currentPosition, setCurrentPosition ] = useState({lat: 0, lng: 0});
  // const [ pinLocation, setpinLocation ] = useState({});



  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  // const markerRef = useRef(null);

  // console.log('-------isAdding--------->',isAdding);

  const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const currentPosition = {
      lat: latitude,
      lng: longitude
    }
    // console.log('running success', currentPosition);
    setCurrentPosition(currentPosition);
  }

  useEffect(() => {
    // console.log('running navigator useEffect');
    navigator.geolocation.getCurrentPosition(success);
  },[])


  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng})
  };

  const pin = {
      name: 'location 1',
      location: {
        lat: +lat,
        lng: +long,
      }
    }
// console.log('this is the gmaps info:',lat,long);

// trying to stop submit behavior
    // const handleClick = (e) => {
    //   e.stopPropagation()
    //   getLocation(currentPosition)
    // }

const footer = (
  <div className={styles.footerWrapper}>
    <div className={styles.footerContainer}>
      <p className={styles.locationPrompt}>Drag the pin to set your spot location, then click:</p>
      <button
        className={styles.submitButton}
        onClick={() => getLocation(currentPosition)}
      >
      {/* trying to stop submit behavior */}
      {/* <button onClick={(e) => handleClick(e)}> */}
        Create new spot
      </button>
    </div>
  </div>
);

  return (
    // whereas in the docs the component is wrapped in LoadScript, here the map is only rendered if the loading happens
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={isAdding ? currentPosition : pin.location}
          zoom={10}
        >
          <Marker
            key={pin.name}
            position={isAdding ? currentPosition : pin.location}
            draggable={true}
            onDragEnd={(e) => onMarkerDragEnd(e)}
          />
          {/* {
            isAdding ?
            <Marker
            position={currentPosition}
            ref={() => markerRef}
            // onDragEnd={(e) => onMarkerDragEnd(e)}
            draggable={true} /> :
            null
          } */}
        </GoogleMap>
      )}
      {
        isAdding ?
        footer :
        null
      }
    </>
  );
};

export default React.memo(Maps);
