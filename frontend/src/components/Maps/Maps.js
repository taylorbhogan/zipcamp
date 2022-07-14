// the purpose of this component is to load & customize the map. first we declare customizations that are then applied by the GoogleMap component. then we use useJsApiLoader to do all the heavy lifting
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./Maps.module.css";

const Maps = ({
  apiKey,
  isAdding = false,
  setLat,
  setLong,
  pins,
  zoom = 3,
  setFunction,
  singlePin = false,
}) => {
console.log("pins",pins);
  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLat(lat.toFixed(6));
    setLong(lng.toFixed(6));
  };

  const footer = (
    <div className={styles.footer}>
      <p className={styles.locationPrompt}>
        Drag the pin to set your spot location, then click:
      </p>
      <button className={styles.submitButton}>Save spot</button>
    </div>
  );

  return (
    <>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              singlePin
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
                  lat: +pushpin.latitude,
                  lng: +pushpin.longitude,
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
          {/* is adding at all */}
          {isAdding ? footer : null}
        </>
      ) : null}
    </>
  );
};

export default React.memo(Maps);
