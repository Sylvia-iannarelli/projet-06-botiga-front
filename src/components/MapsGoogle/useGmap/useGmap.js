import { createContext, useState } from 'react';
import Geocode from 'react-geocode';

// création d'un context via createContext
export const AddressContext = createContext();

Geocode.setApiKey(process.env.REACT_PUBLIC_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage('fr');
Geocode.setRegion('fr');
Geocode.setLocationType('ROOFTOP');
Geocode.enableDebug();

const useGmap = () => {
  const [customerLocation, setCustomerLocation] = useState();

  const loadLocations = async (setLocations, producerData) => {
    const newLocations = await Promise.all(
      producerData.map(async (item) => {
        const addressStringify = `${item.zip} ${item.street} ${item.city} ${item.number}`;
        try {
          const response = await Geocode.fromAddress(addressStringify);
          const { lat, lng } = response.results[0].geometry.location;
          return { ...item, position: { lat, lng } };
        }
        catch (error) {
          console.error(error);
        }
      }),
    );
    setLocations(newLocations.filter((location) => location !== null));
  };

  const loadCustomerLocation = async (currentAddress) => {
    try {
      const response = await Geocode.fromAddress(currentAddress);
      const { lat, lng } = response.results[0].geometry.location;
      setCustomerLocation({ lat, lng });
    }
    catch (error) {
      console.error(error);
    }
  };
  return {
    loadCustomerLocation,
    customerLocation,
    loadLocations,
  };
};

export default useGmap;
