// SearchBoxComponent.tsx
import React, { useRef, useEffect } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";

type SearchBoxComponentProps = {
  onPlacesChanged: (places: google.maps.places.PlaceResult[]) => void;
  onLocationSelected: (position: { lat: number; lng: number }) => void;
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | null;
};

export const SearchBoxComponent: React.FC<SearchBoxComponentProps> = ({
  onPlacesChanged,
  onLocationSelected,
  bounds,
}) => {
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  useEffect(() => {
    if (searchBoxRef.current) {
      searchBoxRef.current.setBounds(bounds ?? null);
    }
  }, [bounds]);

  const onLoad = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChange = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const location = places[0].geometry?.location;
        if (location) {
          onPlacesChanged(places);
          onLocationSelected({ lat: location.lat(), lng: location.lng() });
        }
      }
    }
  };

  return (
    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChange}>
      <input
        type="text"
        placeholder="Search..."
        className="bg-white border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
      />
    </StandaloneSearchBox>
  );
};

export default SearchBoxComponent;
