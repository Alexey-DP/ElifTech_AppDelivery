import { useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import MyMap from "./map";
import AddressInput from "./address.input";
import { useState, useCallback } from "react";
import Spinner from "../../../spinner/spinner";

const libraries = ['places'];

const MyGoogleMapWrapper = ({setAddress}) => {

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);

    const [center, setCenter] = useState({ lat: 48.464717, lng: 35.046183 });

    const [zoom, setZoom] = useState(10);

    const onPlaceSelect = useCallback((coordinates) => {
        setCenter(coordinates);
        setZoom(13);
        Geocode.fromLatLng(coordinates.lat, coordinates.lng)
            .then(res => {
                const address = res.results[0].formatted_address;
                setAddress(address);
            })
    // eslint-disable-next-line
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
        libraries
    })

    return (
        <div className="shopping__map">
            {isLoaded ? <MyMap zoom={zoom} center={center} onSelect={onPlaceSelect} /> : <Spinner/>}
            <AddressInput isLoaded={isLoaded} onSelect={onPlaceSelect} />
        </div>
    );
}

export default MyGoogleMapWrapper;