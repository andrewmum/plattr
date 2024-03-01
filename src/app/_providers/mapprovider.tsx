import { useJsApiLoader } from "@react-google-maps/api";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

type Marker = { lat: number; lng: number };

type MapContextType = {
  map: google.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
  mapRef?: React.MutableRefObject<google.maps.Map | undefined>;
  markers: Marker[];
  setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>;
  placeResult: google.maps.places.PlaceResult[] | null;
  setPlaceResult: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult[] | null>
  >;
  center: google.maps.LatLngLiteral;
  setCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>;
  onPlacesChanged: (places: google.maps.places.PlaceResult[]) => void;
  onLocationSelected: (position: { lat: number; lng: number }) => void;
  handleMapLoad?: (map: google.maps.Map) => void;
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | null;
  isLoaded?: boolean;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
}

interface MapProviderProps {
  children: ReactNode;
}
export const MapProvider = ({ children }: MapProviderProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map>();

  const handleMapLoad = (map: google.maps.Map) => {
    setMap(map);
    mapRef.current = map;
  };

  const [markers, setMarkers] = useState<Marker[]>([]);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
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
    libraries: ["places"],
    mapIds: ["e3f63456b85d9424"],
  });
  const [placeResult, setPlaceResult] = useState<
    google.maps.places.PlaceResult[] | null
  >([]);

  const value = {
    map,
    setMap,
    mapRef,
    markers,
    setMarkers,
    placeResult,
    setPlaceResult,
    center,
    setCenter,
    onPlacesChanged,
    onLocationSelected,
    isLoaded,
    handleMapLoad,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
