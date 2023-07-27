import { useEffect, useContext } from 'react';
import {
  Container, Header, Segment, Button, Image, Grid,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../utils/providers/useUserProvider';

import HeaderMain from '../../components/HeaderMain';
import Footer from '../../components/Footer';
import './styles.scss';
import OrderLine from '../../components/OrderLine';

const OrderList = () => {
  const { getOrders, orders } = useContext(UserContext);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orderList">
      <HeaderMain />
      <Container className="orderList--container">
        <div className="orderList--items">
          <h2 className="orderList--title">Liste des commandes</h2>

          {orders
            && orders.reverse().map((order) => {
              return <OrderLine key={order.id} order={order} />;
            })}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default OrderList;
