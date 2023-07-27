import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import './styles.scss';
import { AddressContext } from '../../utils/providers/useAddressProvider';
import mapStyles from './mapStyles';
import useGmap from './useGmap/useGmap';
import { ProducerContext } from '../../utils/providers/useProducerProvider';
import grangeIcon from './marker-ferme-grey-50px.png';
import userIcon from './marker-user-50px.png';
import getStore from '../../utils/apiRequest/GetRequest/getStore';

const MapsGoogle = () => {
  const { address } = useContext(AddressContext);
  const { producerData, setProducerData } = useContext(ProducerContext);
  const { loadCustomerLocation, loadLocations, customerLocation } = useGmap();
  const [locations, setLocations] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  // Permet de set un loader en attendant la carte
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  // Appelle la fonction get afin de recuperer les données du back
  useEffect(() => {
    getStore(setProducerData);
  }, []);
  // Appelle les 2 fonctions en charge de l'apparition des différents markers sur la carte
  useEffect(() => {
    loadLocations(setLocations, producerData);
    loadCustomerLocation(address);
  }, [producerData]);

  return (
    <div className="container">
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <GoogleMap
          zoom={11}
          center={customerLocation}
          mapContainerClassName="container-map"
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            styles: mapStyles,
          }}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={grangeIcon}
              onClick={() => setSelectedInfo(location)}
            />
          ))}

          {selectedInfo && (
            <InfoWindow
              position={selectedInfo.position}
              onCloseClick={() => setSelectedInfo(null)}
            >
              <div>
                <h2>{selectedInfo.name}</h2>
                <p>{selectedInfo.description}</p>
                <p>{selectedInfo.schedules}</p>
                <p>
                  {selectedInfo.number}
                  {selectedInfo.street}
                </p>
                <a
                  target="_blank"
                  href={` https://www.google.com/maps/place/${selectedInfo.street}+${selectedInfo.city}`}
                  rel="noreferrer"
                >
                  <Button color="blue">Ouvrir dans google maps</Button>
                </a>
                <Link to={`/local-market/${selectedInfo.id}`}>
                  <Button color="teal">Voir le producteur</Button>
                </Link>
              </div>
            </InfoWindow>
          )}
          <Marker position={customerLocation} icon={userIcon} />
        </GoogleMap>
      )}
    </div>
  );
};

export default MapsGoogle;
