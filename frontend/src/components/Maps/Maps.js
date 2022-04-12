// the purpose of this component is to load & customize the map. first we declare customizations that are then applied by the GoogleMap component. then we use useJsApiLoader to do all the heavy lifting
import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./Maps.module.css";

const Maps = ({
  apiKey,
  isAdding = false,
  getLocation,
  pins,
  zoom = 10,
  setFunction,
}) => {
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
    if (isAdding) {
      const positionSuccessAftereffect = (devicePosition) => {
        const lat = devicePosition.coords.latitude;
        const lng = devicePosition.coords.longitude;
        setCurrentPosition({ lat, lng });
      };
      const error = () => {
        alert(
          "An error occurred while accessing your position. Did a recent update change your device settings?"
        );
      };
      navigator.geolocation.getCurrentPosition(
        positionSuccessAftereffect,
        error
      );
    }
  }, [isAdding]);

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
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
            center={
              isAdding
                ? currentPosition
                : Object.values(pins).length === 1
                ? {
                    lat: +Object.values(pins)[0].latitude,
                    lng: +Object.values(pins)[0].longitude,
                  }
                : {
                    // approx. middle of continental US
                    lat: 38.118235,
                    lng: -95.194464,
                  }
            }
            zoom={zoom}
          >
            {Object.values(pins).map((pushpin) => (
              <Marker
                key={pushpin.id ?? "pin"}
                title={pushpin.name ?? "pin"}
                position={{
                  lat:
                    pushpin.latitude === ""
                      ? currentPosition.lat
                      : +pushpin.latitude,
                  lng:
                    pushpin.longitude === ""
                      ? currentPosition.lng
                      : +pushpin.longitude,
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
          {isAdding ? footer : null}
        </>
      ) : null}
    </>
  );
};

export default React.memo(Maps);
