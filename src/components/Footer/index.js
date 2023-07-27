import { Link } from 'react-router-dom';
import './styles.scss';
import { Icon } from 'semantic-ui-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer--icon">
        <Icon name="facebook" />
        <Icon name="instagram" />
        <Icon name="twitter" />
      </div>
      <Link to="/legal-notices">
        <p>Mentions légales</p>
      </Link>
      <p>contact : botiga-corp@botiga.com</p>
      <Link to="/rgpd">
        <span>RGPD</span>
      </Link>
    </footer>
  );
};

export default Footer;
