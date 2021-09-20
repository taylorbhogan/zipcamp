// the purpose of this component is to fetch the key from the backend db if it cannot retrieve it from the Redux state
// note: we didn't dispatch our thunk in this component in order to avoid an extra render when we haven't received the API key from the
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';
import Maps from './Maps';

const MapContainer = ({ lat, long, isAdding, getLocation }) => {
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
    <Maps
      apiKey={key}
      lat={lat}
      long={long}
      isAdding={isAdding}
      getLocation={getLocation}
    />
  );
};

export default MapContainer;
