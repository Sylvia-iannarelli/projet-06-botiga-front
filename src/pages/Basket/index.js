import { useContext, useState, useEffect } from 'react';
import {
  Divider, Form, Label, Button,
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import HeaderMain from '../../components/HeaderMain';
import Footer from '../../components/Footer';
import './styles.scss';
import BasketProduct from './BasketProduct';
import PaymentForm from './PaymentForm';
import { BasketContext } from '../../utils/providers/useBasketProvider';

const Basket = () => {
 const { basketProducts, handleDelete, setProductQuantity, postBasketToOrder } = useContext(BasketContext);
 const navigate = useNavigate();
 const [total, setTotal] = useState(5);

  useEffect(() => {
    let newTotal = 0;
    basketProducts.forEach((product) => {
      newTotal += product.price * product.quantity;
    });
    setTotal(newTotal);
  }, [basketProducts]);


  return (
    <>
      <HeaderMain />
      <Button
        onClick={() => navigate(-1)}
        color="teal"
      >
        Retour
      </Button>
      <div className="basket">
        <section className="basket-products">
          <h2>Mon panier</h2>
          <Divider />
          {basketProducts.map((product, index) => {
            return (
              <BasketProduct
                key={product.id}
                quantity={product.quantity}
                productName={product.name}
                price={product.price}
                index={index}
                setProductQuantity={setProductQuantity}
                handleDelete={handleDelete}
              />
            );
          })}
        </section>
        <section className="basket-checkout">
          <h2>Validation de ma commande</h2>
          <Divider />
          <Form>
            <Form.Field>
              <p>Total de la commande</p>
              <p>{total} $</p>
              <Label>un code promo ?</Label>
              <input placeholder="BotigaF0r4v4r" />
            </Form.Field>
          </Form>
          <Divider />
          <h2>Paiement</h2>
          <PaymentForm postBasketToOrder={postBasketToOrder}/>
        </section>
      </div>
      <Footer />
    </>
  );
};
export default Basket;
