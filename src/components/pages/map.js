import React from 'react';
import MapCanvas from '../mapCanvas';
import { useHistory } from "react-router-dom";

const Map = () => {
  const history = useHistory()

  return (
    <>
      <MapCanvas history={history} />
    </>
  )
};

export default Map;
