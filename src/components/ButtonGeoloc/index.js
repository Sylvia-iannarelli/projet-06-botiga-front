import { useContext, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import Geocode from 'react-geocode';
import { AddressContext } from '../../utils/providers/useAddressProvider';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const ButtonGeoloc = () => {
  const { address, setAddress } = useContext(AddressContext);
  const navigate = useNavigate();
 
  // Chergement des données nécéssaire à géocoding
  Geocode.setApiKey(process.env.REACT_PUBLIC_GOOGLE_MAPS_API_KEY);
  Geocode.setLanguage('fr');
  Geocode.setRegion('fr');
  Geocode.setLocationType('ROOFTOP');
  Geocode.enableDebug();

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          Geocode.fromLatLng(lat, lng).then(
            (response) => {
              const currentAddress = response.results[0].formatted_address;
              setAddress(currentAddress);
              navigate('/local-market');
            },
            (error) => {
              console.error(error);
            },
          );
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    }
    else {
      console.error('Geolocation not supported in this browser');
    }
  };

  return (
    <div className="buttonGeoloc">
      <button
        className="buttonGeoloc--button"
        type="button"
        name="geolocate"
        onClick={handleClick}
      >
        <Icon
          className="buttonGeoloc--icon"
          name="map marker alternate"
          size="large"
          link
        />
      </button>
    </div>
  );
};
export default ButtonGeoloc;
