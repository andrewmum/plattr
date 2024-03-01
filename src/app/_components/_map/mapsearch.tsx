import React, { useRef, useEffect } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useMap } from "@/app/_providers/mapprovider";

const SearchBoxComponent = (): JSX.Element => {
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const {
    setMarkers,
    center,
    setCenter,
    isLoaded,
    map,
    setPlaceResult,
    mapRef,
  } = useMap();

  useEffect(() => {
    if (!isLoaded || !searchBoxRef.current) return;
    const bounds = new google.maps.LatLngBounds(center, center);
    searchBoxRef.current.setBounds(bounds);
    setCenter(center);
  }, [center, setCenter, map, isLoaded]);

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

  const searchNearbyPlaces = () => {
    if (!map && !mapRef?.current) return;
    const service = new google.maps.places.PlacesService(
      mapRef?.current as google.maps.Map | HTMLDivElement
    );
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
        setPlaceResult(results);
        setMarkers(newMarkers);
      }
    });
  };

  return isLoaded ? (
    <div>
      <StandaloneSearchBox
        onLoad={(searchBox) => onLoad(searchBox)}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search..."
          className="border-2 bg-black border-gray-300 rounded-md mt-2 py-1 w-2/3 pt-2 focus:outline-none focus:border-blue-500"
        />
      </StandaloneSearchBox>
      <button onClick={searchNearbyPlaces}>Search here</button>
    </div>
  ) : (
    <>Loading...</>
  );
};

export default SearchBoxComponent;
