import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, StandaloneSearchBox, Marker, useJsApiLoader } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];
const containerStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    position: 'relative', 
    
};
const MapComponent: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number; }>({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState<Array<{ lat: number; lng: number; }>>([]);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCurrentLocation({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API as string,
    libraries,
    mapIds: ['google-map-script']
  });

  const onPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces() || [];
    const newMarkers = places
      .map(place => {
        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();
        if (typeof lat === 'number' && typeof lng === 'number') {
          return { lat, lng };
        }
        return null; 
      })
      .filter((marker): marker is { lat: number; lng: number } => marker !== null);
  
    setMarkers(newMarkers);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
      <div>
          <div id="searchbox">
              <StandaloneSearchBox
              onLoad={(ref) => (searchBoxRef.current = ref)}
              onPlacesChanged={onPlacesChanged}
              >
              <input
                  type="text"
                  placeholder="Search for a place"
                  className='bg-white border-2 border-gray-300 rounded-md px-2 py-1 w-1/2'
              />
              </StandaloneSearchBox>
          </div>
      <br />
          <div>
              <GoogleMap
              center={currentLocation}
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
