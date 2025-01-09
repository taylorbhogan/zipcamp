import React, { useState, useEffect } from "react";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import styles from "./Maps.module.css";
import PinIcon from "./PinIcon";

const MapsUserLocation = ({ apiKey, setLat, setLong, pins, setFunction }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.76737,
    lng: -122.49986,
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

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
    <div style={containerStyle}>
      <Map
        defaultCenter={currentPosition}
        defaultZoom={14}
        mapId="custom-map"
        apiKey={apiKey}
        reuseMaps={true}
        options={{ gestureHandling: "greedy" }}
      >
        {Object.values(pins).map((pushpin) => (
          <AdvancedMarker
            key={pushpin.id ?? "pin"}
            position={{
              lat: +pushpin.latitude || currentPosition.lat,
              lng: +pushpin.longitude || currentPosition.lng,
            }}
            draggable={true}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            onClick={() => setFunction(pushpin)}
          >
            <Pin background={"#2BA84A"} borderColor={"#248232"}>
              <PinIcon icon={"place"} />
            </Pin>
          </AdvancedMarker>
        ))}
      </Map>
      <div className={styles.footer}>
        <p className={styles.locationPrompt}>
          Drag the pin to set your spot location, then click:
        </p>
        <button className={styles.submitButton}>Save spot</button>
      </div>
    </div>
  );
};

export default React.memo(MapsUserLocation);
