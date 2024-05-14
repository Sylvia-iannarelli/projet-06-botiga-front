import {
  createContext, useEffect, useState, useContext,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../useUserProvider';
import 'react-toastify/dist/ReactToastify.css';

//

// création d'un context via createContext
export const BasketContext = createContext();

const useBasketProvider = () => {
  const getBasketStorage = (key, initialValue) => {
    const value = JSON.parse(window.localStorage.getItem(key));
    return value || initialValue;
  };
  // const { token } = useContext(UserContext);
  const navigate = useNavigate();
  // changer le nom par basketProducts
  const [basketProducts, setBasketProducts] = useState(() => getBasketStorage('basketProducts', []));

  // fonction permettant de remplir les données du panier en récupérent le produit courant
  const addProduct = (newProduct) => {
    // Création d'un nouveau tableau dans lequel on déstructure le tableau de produits
    const myArray = [...basketProducts];

    if (myArray.length > 0) {
      // Verifie si le produit existe dans le tableau et renvoie true ou false
      const isExist = myArray.find((element) => element.id === newProduct.id);
      // boucle sur chaque produit pour ajouté une quantité
      if (isExist) {
        myArray.forEach((basketProduct) => {
          if (basketProduct.id === newProduct.id) {
            basketProduct.quantity += 1;
          }
        });
      }
      else {
        // Si il n'y a rien dans le tableau set directement un nouveau produit dans le panier
        myArray.push({ ...newProduct, quantity: 1 });
      }
      setBasketProducts(myArray);
    }
    else {
      setBasketProducts([{ ...newProduct, quantity: 1 }]);
    }
  };

  const postBasketToOrder = async () => {
    const authToken = localStorage.getItem('authToken');
    // ici baksetProduct

    // 1) On itère sur notre liste de produit , pour en ressortir APRES TOUTES LES ITERATIONS, une liste de producteurs avec leurs produits
    const arrayOfProducers = basketProducts.reduce((previousState, product) => {
      // 2)  On itère sur l'état précédent du reduce (produit après produit), pour obtenir, pour le produit en quesiton
      // l'index du producteur, dans notre liste de producteur qui est entrain de se former.
      const indexOfProducer = previousState.findIndex((producer) => producer.id === product.store.id);

      // 3) On copy l'ancien état de notre reduce pour ne pas le modifier directement
      const newArrayOfProducers = [...previousState];

      // 4) Si l'index du producteur est trouvé, c'est qu'il existe déjà dans la liste que nous sommes entrains de créer.
      if (indexOfProducer !== -1) {
        // Donc nous ajoutons le produit à la liste de produits du producteur en question
        newArrayOfProducers[indexOfProducer].products.push({ productId: product.id, quantity: product.quantity });
      }
      else {
        // 5) Sinon c'est qu'il n'existe pas et dans ce cas là nous créons un producteur, utilisons son id (venant de product.store.id)
        // pour qu'il puisse être retrouvé par la prochaine itération du reduce.
        // En même temps , nous ajoutons le premier produit dans la liste de produits de ce producteur.
        newArrayOfProducers.push({ id: product.store.id, products: [{ productId: product.id, quantity: product.quantity }] });
      }

      // 6) Nous retournons la nouvelle version de l'arrêt pour passer à l'itération suivante (sauf si c'est la dernière auquel cas)
      // l'itération s'arrêtera
      return newArrayOfProducers;
    }, []);

    console.log(arrayOfProducers);

    const config = {

      headers: { Authorization: `Bearer ${authToken}` },
    };
    console.log('authToken', authToken);
    if (authToken) {
      try {
        const result = await axios.post(
          'http://localhost:8000/api/orders/new',
          arrayOfProducers,
          config,
        );

        console.log(result);
        localStorage.removeItem('basketProducts');
        navigate('/local-market/order-checkout/confirmation');
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      toast.info('Vous devez être connecter pour pouvoir passer une commande', { theme: 'colored', autoClose: 3000, hideProgressBar: true });
      navigate('/login');
    }
  };
  useEffect(() => {
    window.localStorage.setItem('basketProducts', JSON.stringify(basketProducts));
  }, [basketProducts]);

  const handleDelete = (indexToDelete) => {
    const myArray = [];
    basketProducts.filter((item) => {
      if (item.id !== basketProducts[indexToDelete].id) {
        myArray.push(item);
      }
    });
    setBasketProducts(myArray);
  };
  const setProductQuantity = (newQuantity, productIndex) => {
    const myArray = [...basketProducts];
    myArray[productIndex].quantity = newQuantity;
    setBasketProducts(myArray);
  };
  return {
    basketProducts,
    addProduct,
    handleDelete,
    setProductQuantity,
    postBasketToOrder,
  };
};

export default useBasketProvider;
