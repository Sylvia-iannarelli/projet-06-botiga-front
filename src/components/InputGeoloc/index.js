import { useContext, useEffect, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { AddressContext } from '../../utils/providers/useAddressProvider';
import './styles.scss';

const InputGeoloc = () => {
  const {
    address, setAddress, currentPostalCode, setCurrentPostalCode,
  } = useContext(AddressContext);
  const [currentValue, setCurrentValue] = useState({});
  const [placeId, setPlaceId] = useState();

  useEffect(() => {
    if (currentValue.label) {
      setPlaceId(currentValue.value.place_id);
      setAddress(`${currentPostalCode} ${currentValue.label}`);
    }
  }, [currentValue, currentPostalCode]);

  useEffect(() => {
    const handleSelect = async () => {
      if (placeId) {
        const [place] = await geocodeByPlaceId(placeId);
        const { long_name: postalCode = '' } = (place.address_components.find((c) => c.types.includes('postal_code')) || {});
        setCurrentPostalCode(postalCode);
      }
    };
    handleSelect();
  }, [placeId]);

  return (
    <div className="inputGeoloc">
      <GooglePlacesAutocomplete
        className="inputGeoloc--input"
        apiKey={process.env.REACT_PUBLIC_GOOGLE_MAPS_API_KEY}
        selectProps={{
          placeholder: 'Rentrez votre adresse ici',
          address,
          onChange: setCurrentValue,
        }}
        onLoadFailed={(error) => console.error('Could not inject Google script', error)}
      />
    </div>
  );
};
export default InputGeoloc;
