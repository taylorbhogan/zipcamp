// the purpose of this component is to load & customize the map. first we declare customizations that are then applied by the GoogleMap component. then we use useJsApiLoader to do all the heavy lifting
import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./Maps.module.css";

const MapsUserLocation = ({ apiKey, setLat, setLong, pins, setFunction }) => {
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
  useEffect(() => {
    // use current location
    const positionSuccessAftereffect = (devicePosition) => {
      const lat = devicePosition.coords.latitude;
      const lng = devicePosition.coords.longitude;
      setLat(lat.toFixed(6));
      setLong(lng.toFixed(6));
      setCurrentPosition({ lat, lng });
    };
    const error = () => {
      alert(
        "An error occurred while accessing your position. Did a recent update change your device settings?"
      );
    };
    navigator.geolocation.getCurrentPosition(positionSuccessAftereffect, error);
  }, [setLat, setLong]);

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLat(lat.toFixed(6));
    setLong(lng.toFixed(6));
    setCurrentPosition({ lat, lng });
  };

  return (
    <>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={14}
          >
            {Object.values(pins).map((pushpin) => (
              <Marker
                key={pushpin.id ?? "pin"}
                title={pushpin.name ?? "pin"}
                position={{
                  lat: currentPosition.lat,
                  lng: currentPosition.lng,
                }}
                draggable={true}
                label={{
                  text: "\uea99",
                  fontFamily: "Material Icons",
                  color: "#ffffff",
                  fontSize: "18px",
                }}
                onClick={() => setFunction(pushpin)}
                onDragEnd={(e) => onMarkerDragEnd(e)}
              />
            ))}
          </GoogleMap>
          <div className={styles.footer}>
            <p className={styles.locationPrompt}>
              Drag the pin to set your spot location, then click:
            </p>
            <button className={styles.submitButton}>Save spot</button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default React.memo(MapsUserLocation);
