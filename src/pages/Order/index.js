import {
  Header, Segment, List, Divider, Button, Image,
} from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import HeaderMain from '../../components/HeaderMain';
import producerimg from '../../../Photo-Botiga/fruit-legume.png';
import { UserContext } from '../../utils/providers/useUserProvider';

import './styles.scss';
import Footer from '../../components/Footer';

function OrderDetails() {
  const { id } = useParams();
  const { orders, getOrders } = useContext(UserContext);
  const [currentProduct, setCurrentProduct] = useState();
  const [currentTotal, setCurrentTotal] = useState();
  const [currentName, setCurrentName] = useState();
  const [currentId, setCurrentId] = useState();

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    const orderArray = [];
    if (orders) {
      orders.filter((detail) => {
        if (detail.id === parseInt(id)) {
          orderArray.push(detail);
        }
      });
      setCurrentTotal(orderArray[0].orderPrice);
      setCurrentProduct(orderArray[0].orderlines);

      setCurrentName(orderArray[0].orderlines[0].product.store.name);
      setCurrentId(orderArray[0].orderlines[0].product.store.id);
    }
  }, [orders]);
  console.log(currentId);
  // const { date, paymentMethod, products, shop } = order;
  // const totalAmount = products.reduce((total, product) => total + (product.price * product.quantity), 0);
  return (
    <>
      <HeaderMain />
      <div className="order-detail-page container">
        <Link to="/user/orders">
          <Button className="order-button">
            Retour à la liste des commandes
          </Button>
        </Link>
        <div className="order-and-shop-container">
          <div className="order-container">
            <Segment>
              <Header as="h2">Détails de la commande</Header>
              <p>Passé le</p>
              {/* <p>Méthode de paiement :</p> */}
            </Segment>

            <Divider />

            <Segment>
              <Header as="h3">Produits</Header>
              <List>
                {currentProduct
                  && currentProduct.map((item) => {
                    console.log(item);
                    return (
                      <List.Item key={item.id}>
                        <List.Content>
                          <List.Header>{item.product.name}</List.Header>
                          <List.Description>
                            {item.quantity} x {item.product.price} €
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    );
                  })}
              </List>
            </Segment>

            <Segment>
              <Header as="h3">Total de la commande</Header>
              <p>{currentTotal && currentTotal} €</p>
            </Segment>
          </div>

          <div className="shop-container">
            <Segment>
              <Header as="h2">{currentName && currentName}</Header>
              <Image src={producerimg} />
              <p>Adresse : shop Adresse</p>
              <p>Horaires d'ouverture : schedules</p>
              <Link to={`/local-market/${currentId && currentId}`}>
                <Button className="order-button">
                  Voir la boutique du producteur
                </Button>
              </Link>
            </Segment>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails;
