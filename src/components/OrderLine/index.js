import { Button, Image, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// TODO propTypes
const OrderLine = ({ order }) => {
  const orderName = order.orderlines[0].product.store.name;
  const orderId = order.orderlines[0].product.store.id;
  return (
    <div className="orderList--item">
      <Grid>
        <Grid.Row>
          <Grid.Column computer={3} tablet={5} mobile={5}>
            <Image
              floated="left"
              size="large"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column
            computer={4}
            tablet={5}
            mobile={5}
            className="customColumn"
          >
            <div className="orderList--item--info">
              <h3 className="orderList--item--title">{orderName}</h3>
              {/* <span className="orderList--item--detail">16/03/2023</span> */}
              <span className="orderList--item--detail">
                Prix total : {order.orderPrice} €
              </span>
              <span className="orderList--item--detail">
                Nombre(s) d'article(s) : {order.quantity}
              </span>
            </div>
          </Grid.Column>
          <Grid.Column
            computer={4}
            tablet={6}
            mobile={6}
            className="customColumn"
          >
            <div className="orderList--item--info">
              {order
                && order.orderlines.map((item) => {
                  return (
                    <div className="orderList--item--articleInfo" key={item.id}>
                      <span className="orderList--item--articleInfo--quantity">
                        {item.quantity}
                      </span>
                      <span className="orderList--item--articleInfo--article">
                        - {item.product.name}
                      </span>
                    </div>
                  );
                })}
            </div>
          </Grid.Column>
          <Grid.Column computer={5} tablet={16} mobile={16}>
            <div className="orderList--buttons">
              <Link to={`/local-market/${orderId && orderId}`}>
                <Button primary>Voir producteur</Button>
              </Link>
              <Link to={`/user/orders/${order.id}`}>
                <Button
                  secondary
                  onClick={() => console.log('Détails de la commande')}
                >
                  Voir détails
                </Button>
              </Link>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default OrderLine;
