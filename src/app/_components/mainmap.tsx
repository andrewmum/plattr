import React, { useState, useEffect, useRef } from "react";
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
  const mapRef = useRef<google.maps.Map>();
  const [bounds, setBounds] = useState<
    google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | null
  >(null);
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };
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
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 mt-4">
        <SearchBoxComponent
          onPlacesChanged={onPlacesChanged}
          onLocationSelected={onLocationSelected}
          bounds={bounds}
        />
        <button
          onClick={searchNearbyPlaces}
          className="absolute top-10 left-10 z-20"
        >
          Search Nearby Restaurants
        </button>
      </div>
      <div>
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
    </div>
  );
};

export default MapComponent;
