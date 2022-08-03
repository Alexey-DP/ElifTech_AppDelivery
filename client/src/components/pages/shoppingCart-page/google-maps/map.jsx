import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useRef } from 'react'
import { defaultTheme } from "./map.thema";

import location from './location.svg';

const MyMap = ({ center, onSelect, zoom }) => {

    const defaultOptions = {
        panControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        clickableIcons: false,
        keyboardShortcuts: false,
        disableDoubleClickZoom: false,
        fullscreenControl: false,
        styles: defaultTheme
    }

    const mapRef = useRef(undefined);

    const containerStyle = {
        width: 'auto',
        height: '300px'
    };

    const onLoad = useCallback(function callback(map) {
        mapRef.current = map;
    }, [])

    const onUnmount = useCallback(function callback(map) {
        mapRef.current = undefined;
    }, [])

    const getLocation = (loc) => {
        return { lat: loc.latLng.lat(), lng: loc.latLng.lng() }
    }

    return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={defaultOptions}
                onClick={(loc) => {
                    onSelect(getLocation(loc));
                }}
            >
                <MarkerF icon={location} position={center} />
            </GoogleMap>
    )
}

export default MyMap;