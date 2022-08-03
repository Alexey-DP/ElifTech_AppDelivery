import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect } from "react";

const AddressInput = ({isLoaded, onSelect}) => {

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        init,
        clearSuggestions,
    } = usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
            () => {
                setValue(description, false);
                clearSuggestions();

                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    onSelect({ lat, lng })
                });
            };

    const renderSuggestions = () =>
        data.map((suggestion, index) => {
            if(index < 2) {
                const {
                    place_id,
                    structured_formatting: { main_text, secondary_text },
                } = suggestion;

                return (
                    <li key={place_id} onClick={handleSelect(suggestion)}>
                        <strong>{main_text}</strong> <small>{secondary_text}</small>
                    </li>
                );
            } else {
                return null;
            }
        });

        useEffect(() => {
            if(isLoaded) {
                init();
            }
        }, [isLoaded, init])

    return (
        <div className="shopping__find-address" ref={ref} style={{ marginTop: '20px' }}>
            <label
                style={{ marginRight: '10px' }}
                htmlFor="address">Find address:</label>
            <input
                type="text"
                name="address"
                id="address"
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Where to deliver?" />
            {status === "OK" && <ul className="shopping__address-list">{renderSuggestions()}</ul>}
        </div>
    )
}

export default AddressInput;