import React from 'react'
import { useMemo } from "react";
import { GoogleMap, InfoWindow, OverlayView, OverlayViewF, Polygon, useJsApiLoader } from '@react-google-maps/api';

const containerStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    position: 'relative', 
};
const center = {
    lat: 40.7128,
    lng: -74.0060
  };
  
export default function Map() {
    const onClick = () => {
        console.info('I have been clicked!')
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API as string,
    })
    const [map, setMap] = React.useState<google.maps.Map | null>(null)
    const onLoad = React.useCallback(function callback(map: google.maps.Map | null) {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
        }
        setMap(map)
    }, [])
    const onUnmount = React.useCallback(function callback() {
        setMap(null)
    }, [])
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad as (map: google.maps.Map | null) => void}
            onUnmount={onUnmount as (map: google.maps.Map | null) => void | Promise<void>}
        >
        </GoogleMap>
    ) : <></>
}