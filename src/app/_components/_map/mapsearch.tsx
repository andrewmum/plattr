// SearchBoxComponent.tsx
import React, { useRef, useEffect } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useMap } from "@/app/_providers/mapprovider";

const SearchBoxComponent: React.FC = () => {
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const { setMarkers, center, setCenter, isLoaded } = useMap();

  useEffect(() => {
    if (!isLoaded || !searchBoxRef.current) return;
    const bounds = new google.maps.LatLngBounds(center, center);
    searchBoxRef.current.setBounds(bounds);
  }, [center, setCenter]);

  const onLoad = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  };
  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places) {
        const newMarkers = places.map((place) => ({
          lat: place.geometry?.location?.lat() ?? 0,
          lng: place.geometry?.location?.lng() ?? 0,
        }));
        setMarkers(newMarkers);
        if (places.length > 0 && places[0].geometry) {
          setCenter(
            places[0].geometry.location?.toJSON() as google.maps.LatLngLiteral
          );
        }
      }
    }
  };

  return isLoaded ? (
    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
      <input
        type="text"
        placeholder="Search..."
        className="border-2 bg-black border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
      />
    </StandaloneSearchBox>
  ) : (
    <>Loading...</>
  );
};

export default SearchBoxComponent;
