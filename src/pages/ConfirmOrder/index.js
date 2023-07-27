import { Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import HeaderMain from '../../components/HeaderMain';
import './styles.scss';
import farmer1 from '../Error404/paysan1.png';
import farmer2 from '../Error404/paysan2.png';

const ConfirmOrder = () => {
  return (
    <div>
    <HeaderMain />
    <Container className="order-confirmation">
      <main className='order-confirmation__images'>
        <img src={farmer1} />
        <p className="order-confirmation__images--message">Merci pour votre commande. Nous vous enverrons un email de confirmation sous peu.</p>
        <img src={farmer2} />
      </main>
      <Link to="/local-market">
        <Button primary className="order-confirmation__button">Retour à l'accueil</Button>
      </Link>
    </Container>
    </div>
  );
};

export default ConfirmOrder;
