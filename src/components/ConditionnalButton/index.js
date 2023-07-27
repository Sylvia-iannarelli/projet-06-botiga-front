import { Button } from 'semantic-ui-react';
import './styles.scss';
import { Link } from 'react-router-dom';

const ConditionnalButton = () => (
  <div className="ButtonDouble">
    <Button.Group>
      <Link to="/sign-in">
        <Button>Inscription</Button>
      </Link>
      <Button.Or />
      <Link to="/login">
        <Button positive>Connexion</Button>
      </Link>
    </Button.Group>
  </div>
);

export default ConditionnalButton;
