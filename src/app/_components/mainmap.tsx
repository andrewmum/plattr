import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import SearchBoxComponent from "./mapsearch";

const libraries: "places"[] = ["places"];
const containerStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "relative",
};
const MapComponent: React.FC = () => {
  const [markers, setMarkers] = useState<Array<{ lat: number; lng: number }>>(
    []
  );
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 40.7128,
    lng: -74.006,
  });
  const [bounds, setBounds] = useState<
    google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | null
  >(null);

  const onPlacesChanged = (places: google.maps.places.PlaceResult[]) => {
    const newMarkers = places
      .map((place) => {
        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();
        return lat !== undefined && lng !== undefined ? { lat, lng } : null;
      })
      .filter(
        (marker): marker is { lat: number; lng: number } => marker !== null
      );

    setMarkers(newMarkers);
  };
  const onLocationSelected = (position: { lat: number; lng: number }) => {
    setCenter(position);
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API as string,
    libraries,
    mapIds: ["e3f63456b85d9424"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <SearchBoxComponent
        onPlacesChanged={onPlacesChanged}
        onLocationSelected={onLocationSelected}
        bounds={bounds}
      />
      <br />
      <div>
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={containerStyle}
          options={{ mapId: "e3f63456b85d9424" }}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComponent;
