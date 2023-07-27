import { useContext} from 'react';
import { Link } from 'react-router-dom';
import {
  Icon, Popup, List, Button,
} from 'semantic-ui-react';
import { BasketContext } from '../../../utils/providers/useBasketProvider';

const BasketList = () => {
  const { userBasket } = useContext(BasketContext);
  return (
    <Popup
      trigger={<Icon name="shoppingCart" />}
      on="click"
      position="bottom right"
      wide="very"
    >
      <List>
        <List.Header>Votre panier</List.Header>
        <List.Item>
          <List.Content>
            <List.Header>articles : {userBasket && userBasket.length} </List.Header>
          </List.Content>
        </List.Item>

        <Link to="/local-market/basket">
          <Button color="orange">Acceder au panier </Button>
        </Link>
      </List>
    </Popup>
  );
};

export default BasketList;
