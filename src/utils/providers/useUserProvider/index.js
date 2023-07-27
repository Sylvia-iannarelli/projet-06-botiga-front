import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import usersData from './users.json';

export const UserContext = createContext();

const useUserContext = () => {
  /* getLocalStorage permet de récuperer dans le local storage
      la string disponible et de gérer les erreurs
  */
  const getLocalStorage = (key, initialValue) => {
    const value = window.localStorage.getItem(key);
    return value || initialValue;
  };
  /* getLocalStorage permet de récuperer dans le local storage
      l'objet disponible et de gérer les erreurs
  */
  const getLocalStorageObject = (key, initialValue) => {
    const value = JSON.parse(window.localStorage.getItem(key));
    return value || initialValue;
  };

  const [signInValues, setSignInValues] = useState(null);
  // Permet de définir la state à une fonction qui partage le contenu du local storage, si il est vide la state est définit à false
  const [isConnected, setIsConnected] = useState(() => getLocalStorage('isConnected', false));
  const [user, setUser] = useState(() => getLocalStorageObject('user', {}));
  const [token, setToken] = useState();
  const [orders, setOrders] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem('isConnected', isConnected);
  }, [isConnected]);

  //
  // Permet de trouver un utilisateur en fonction des données qu'il aura rentré dans les champs email et password de la page login
  const login = async (email, password) => {
    // username: 'soven@oclock.io',
    // password: "Ereul9Aeng",
    await axios
      .post('http://sylvia-iannarelli-server.eddi.cloud/api/login_check', {
        username: email,
        password: password,
      })
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setIsConnected(true);
        }
      })
      .catch((error) => {
        // console.log(error);
        const err = new Error(
          'Adresse E-mail et /ou le mot de passe incorects',
        );
        throw err;
      });
  };
  
  const getOrders = async () => {
    const authToken = localStorage.getItem("authToken");
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
      console.log("🚀 ~ file: index.js:70 ~ getOrders ~ token:", authToken);
    try {
      const result = await axios.get(

        'http://sylvia-iannarelli-server.eddi.cloud/api/orders',config
      );
      setOrders(result.data);
      console.log("🚀 ~ file: index.js:80 ~ getOrders ~ result:", result);
      // on a recuperé les recettes préférées on va les ajouter dans le state
    }
      
    catch (e) {
      // afficher une erreur
       console.log(e);
    }
  };
  const signIn = async (userData) => {
    await axios
      .post('http://sylvia-iannarelli-server.eddi.cloud/api/users/new', {
        email: userData.email,
        password: userData.password,
        roles: ['ROLE_USER'],
        firstname: userData.firstname,
        lastname: userData.lastname,
        phone: userData.phone,
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Fonction permettant de supprimer toute informatioon du local storage et de passer la valeur de isConnected à false
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    usersData.connected = false;
    setIsConnected(false);
    navigate('/login');
  };

  const updateAccount = async (userData) => {
    const authToken = localStorage.getItem('authToken');
    const userId = user.id;

    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const bodyParameters = {
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      phone: userData.phone,
    };

    await axios
      .put(
        `http://sylvia-iannarelli-server.eddi.cloud/api/users/${userId}`,
        bodyParameters,
        config,
      )
      .then(
        console.log('changements prit en compte'), // ici reset pour avoir les données utilisateurs
      )
      .catch(console.log);
  };

  return {
    user,
    setUser,
    login,
    logout,
    signInValues,
    setSignInValues,
    isConnected,
    setIsConnected,
    updateAccount,
    signIn,
    orders,
    setOrders,
    getOrders
  };
};

export default useUserContext;
