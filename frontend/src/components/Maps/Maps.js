// the purpose of this component is to load & customize the map. first we declare customizations that are then applied by the GoogleMap component. then we use useJsApiLoader to do all the heavy lifting
import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./Maps.module.css";

const Maps = ({ apiKey, lat, long, isAdding = false, getLocation }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.76737,
    lng: -122.49986,
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const positionSuccessAftereffect = (devicePosition) => {
    const lat = devicePosition.coords.latitude;
    const lng = devicePosition.coords.longitude;
    setCurrentPosition({ lat, lng });
  };
  const error = () => {
    alert("There was an error accessing your position");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(positionSuccessAftereffect, error);
  }, []);

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  const pin = {
    name: "location 1",
    location: {
      lat: +lat,
      lng: +long,
    },
  };

  const footer = (
    <div className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        <p className={styles.locationPrompt}>
          Drag the pin to set your spot location, then click:
        </p>
        <button
          className={styles.submitButton}
          onClick={() => getLocation(currentPosition)}
        >
          Create new spot
        </button>
      </div>
    </div>
  );

  return (
    <>
      {isLoaded ? (
        <>
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
          </GoogleMap>
          {isAdding ? footer : null}
        </>
      ) : null}
    </>
  );
};

export default React.memo(Maps);
