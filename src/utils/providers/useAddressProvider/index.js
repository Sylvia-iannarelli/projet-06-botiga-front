import { createContext, useEffect, useState } from 'react';
// création d'un context via createContext
export const AddressContext = createContext();

const useAddressProvider = () => {
  const getLocalStorage = (key, initialValue) => {
    const value = window.localStorage.getItem(key);
    return value || initialValue;
  };
  const [address, setAddress] = useState(() => getLocalStorage('address', null));
  const [currentPostalCode, setCurrentPostalCode] = useState();

  // permet de set le local storage le setItem à besoin d'une clef et d'une valeur
  // la valeur reçue doit être uen string

  // TODO  a suppr
  const setLocalStorage = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    window.localStorage.setItem('address', address);
  }, [address]);
  // permet de récupérer la valeur dans le local storage
  // on a besoin  de parse le résultat pour avoir une donnée lisible

  // on retourne l'objet qu'on passera au provider afin qu'il soit disponible partout
  return {
    address,
    setAddress,
    setLocalStorage,
    currentPostalCode,
    setCurrentPostalCode,
  };
};

export default useAddressProvider;

// import { createContext, useContext, useState } from 'react';

// const AddressContext = createContext();

// const AddressProvider = ({ children }) => {
//   const [address, setAddress] = useState(null);

//   return (
//     <AddressContext.Provider value={{ address, setAddress }}>
//       {children}
//     </AddressContext.Provider>
//   );
// };

// export const useAddress = () => {
//   const context = useContext(AddressContext);
//   if (context === undefined) {
//     throw new Error('useAddress must be used within an AddressProvider');
//   }
//   return context;
// };

// export default AddressProvider;
// export { AddressContext };
