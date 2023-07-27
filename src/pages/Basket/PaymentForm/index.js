import {
  Form, Label, Button,
} from 'semantic-ui-react';
import '../styles.scss';
import { Link } from 'react-router-dom';


const PaymentForm = ({postBasketToOrder}) => {
  
  const handleSubmitBasket = (e) => {
    e.preventDefault();
   postBasketToOrder();
  };

  return (
    <Form>
      <Form.Field>
        <Label>Numéro de carte</Label>
        <input placeholder="0--" />
      </Form.Field>
      <Form.Field>
        <Label>Nom</Label>
        <input placeholder="Doe" />
      </Form.Field>
      <Form.Field>
        <Label>minichiffre</Label>
        <input placeholder="123" />
      </Form.Field>
      <Link to="/local-market/order-checkout/confirmation">
        <Button onClick={handleSubmitBasket} basic color="teal">

          Payer
        </Button>
      </Link>
    </Form>
  );
};
export default PaymentForm;
