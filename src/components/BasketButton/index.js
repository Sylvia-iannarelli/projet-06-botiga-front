import {
  Button, Icon, Popup, List,
} from 'semantic-ui-react';
import './styles.scss';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BasketContext } from '../../utils/providers/useBasketProvider';

const BasketButton = () => {
  const { basketProducts } = useContext(BasketContext);

  return (
    <Popup
      trigger={(
        <Button animated="vertical">
          <Button.Content hidden>Panier</Button.Content>
          <Button.Content visible>
            <Icon name="shop" />
          </Button.Content>
        </Button>
      )}
      on="click"
      position="bottom right"
      wide="very"
    >
      <List>
        <List.Header>Votre panier</List.Header>
        <List.Item>
          <List.Content>
            <List.Header>
              articles : {basketProducts && basketProducts.length}
            </List.Header>
          </List.Content>
        </List.Item>

        <Link to="/local-market/basket">
          <Button color="orange">Acceder au panier </Button>
        </Link>
      </List>
    </Popup>
  );
};
export default BasketButton;
