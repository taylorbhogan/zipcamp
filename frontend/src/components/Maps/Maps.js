// the purpose of this component is to load & customize the map
// first we declare customizations that are then applied by the GoogleMap component
// then we use useJsApiLoader to do alllll the heavy lifting

import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '500px',
  height: '400px',
};

// const defaultCenter = {
//   lat: 41.9072,
//   lng: -119.0369,
// };
const Maps = ({ apiKey, lat, long }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const defaultCenter = {
    lat: +lat,
    lng: +long,
  };
  const pins = [
    {
      name: 'location 1',
      location: {
        lat: +lat,
        lng: +long,
      }
    }
  ]
console.log('this is the gmaps info:',lat,long);


  return (
    // whereas in the docs the component is wrapped in LoadScript, here the map is only rendered if the loading happens
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={10}
        >
          {
            pins.map(item => {
              return (
              <Marker
                key={item.name}
                position={item.location}
              />
              )
            })
         }
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
