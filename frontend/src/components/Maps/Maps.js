import React from "react";
import { Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
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
  selectedItem,
}) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
  };
  const onMarkerDragEnd = (e, pinID) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLat(lat.toFixed(6));
    setLong(lng.toFixed(6));

    // Optionally, update pin's position in state if needed
    setFunction((prevPins) =>
      prevPins.map((pin) =>
        pin.id === pinID ? { ...pin, latitude: lat, longitude: lng } : pin
      )
    );
  };

  const footer = (
    <div className={styles.footer}>
      <p className={styles.locationPrompt}>
        Drag the pin to set your spot location, then click:
      </p>
      <button className={styles.submitButton}>Save spot</button>
    </div>
  );

  const defaultCenter = singlePin
    ? {
        lat: +Object.values(pins)[0]?.latitude || 0,
        lng: +Object.values(pins)[0]?.longitude || 0,
      }
    : {
        lat: 38.118235, // Approx. middle of continental US
        lng: -95.194464,
      };

  return (
    <div style={containerStyle}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={zoom}
        mapId="custom-map"
        apiKey={apiKey}
        reuseMaps={true}
        options={{
          gestureHandling: "greedy",
        }}
      >
        {Object.values(pins).map((pushpin) => (
          <AdvancedMarker
            key={pushpin.id ?? "pin"}
            position={{
              lat: +pushpin.latitude,
              lng: +pushpin.longitude,
            }}
            draggable={true}
            onDragEnd={(e) => onMarkerDragEnd(e, pushpin.id)}
            onClick={() => setFunction(pushpin)}
          >
            <Pin />
            {singlePin === false && selectedItem?.id === pushpin.id && (
              <InfoWindow
                position={{
                  lat: +pushpin.latitude,
                  lng: +pushpin.longitude,
                }}
              >
                <div className={styles.infoWindow}>
                  <h3>{pushpin.name}</h3>
                  <p>{pushpin.orgName}</p>
                </div>
              </InfoWindow>
            )}
          </AdvancedMarker>
        ))}
      </Map>
      {isAdding && footer}
    </div>
  );
};

export default React.memo(Maps);
