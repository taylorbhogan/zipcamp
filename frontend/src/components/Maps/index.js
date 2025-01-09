// the purpose of this component is to fetch the key from the backend db if it cannot retrieve it from the Redux state
// note: we didn't dispatch our thunk in this component in order to avoid an extra render when we haven't received the API key from the
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getKey } from "../../store/maps";
import Maps from "./Maps";
import MapsUserLocation from "./MapsUserLocation";
import {APIProvider} from '@vis.gl/react-google-maps';

const MapContainer = ({
  isAdding,
  setLat,
  setLong,
  pins,
  zoom,
  setFunction,
  singlePin,
  isUsingUserLocation,
  selectedItem,
}) => {
  const key = useSelector((state) => state.maps.key);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <APIProvider
      apiKey={key}
      // onLoad={() => console.log('Maps API has loaded.')}
    >
      {isUsingUserLocation ? (
        <MapsUserLocation
          apiKey={key}
          setLat={setLat}
          setLong={setLong}
          pins={pins}
          setFunction={setFunction}
        />
      ) : (
        <Maps
          apiKey={key}
          isAdding={isAdding}
          setLat={setLat}
          setLong={setLong}
          pins={pins}
          zoom={zoom}
          setFunction={setFunction}
          singlePin={singlePin}
          selectedItem={selectedItem}
        />
      )};
    </APIProvider>
  )
};

export default MapContainer;
