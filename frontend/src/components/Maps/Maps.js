// the purpose of this component is to load & customize the map
// first we declare customizations that are then applied by the GoogleMap component
// then we use useJsApiLoader to do alllll the heavy lifting

import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '400px',
};

const center = {
  lat: 38.9072,
  lng: 77.0369,
};
const Maps = ({ apiKey }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  return (
    // whereas in the docs the component is wrapped in LoadScript, here the map is only rendered if the loading happens
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        />
      )}
    </>
  );
};

export default React.memo(Maps);
