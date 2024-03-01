import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMap } from "@/app/_providers/mapprovider";

const containerStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "relative",
};
const MapComponent: React.FC = () => {
  const mapRef = useRef<google.maps.Map>();
  const [bounds, setBounds] = useState<
    google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | null
  >(null);
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const searchNearbyPlaces = () => {
    if (mapRef.current) {
      const service = new google.maps.places.PlacesService(mapRef.current);
      const request = {
        location: center,
        radius: 500,
        type: "restaurant",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          console.log(results);
          const newMarkers = results.map((place) => ({
            lat: place.geometry?.location?.lat() ?? 0,
            lng: place.geometry?.location?.lng() ?? 0,
          }));
          setMarkers(newMarkers);
        }
      });
    }
  };

  const { markers, setMarkers, center, setCenter, isLoaded } = useMap();

  return isLoaded ? (
    <div className="relative w-full h-screen">
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={containerStyle}
        options={{ mapId: "e3f63456b85d9424" }}
        onLoad={onMapLoad}
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
