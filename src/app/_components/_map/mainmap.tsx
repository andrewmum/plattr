import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMap } from "@/app/_providers/mapprovider";

const containerStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "relative",
};
const MapComponent = (): JSX.Element => {
  const { markers, center, isLoaded, handleMapLoad } = useMap();
  return isLoaded ? (
    <div className="relative w-full h-screen">
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={containerStyle}
        options={{ mapId: "e3f63456b85d9424" }}
        onLoad={handleMapLoad}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <>Loading...</>
  );
};

export default MapComponent;
