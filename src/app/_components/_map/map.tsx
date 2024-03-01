import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "relative",
};
const center = {
  lat: 40.7128,
  lng: -74.006,
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API as string,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={{ mapId: "e3f63456b85d9424" }}
      onLoad={onLoad as (map: google.maps.Map | null) => void}
      onUnmount={
        onUnmount as (map: google.maps.Map | null) => void | Promise<void>
      }
    ></GoogleMap>
  ) : (
    <></>
  );
}
