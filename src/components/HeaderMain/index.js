import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Icon, Popup, List, Button,
} from 'semantic-ui-react'; // Importez Popup, List et Button
import BasketButton from '../BasketButton';
import ConditionnalButton from '../ConditionnalButton';
import './styles.scss';
import logoText from '../../assets/images/logo-botiga/botiga_logo.png';
import { UserContext } from '../../utils/providers/useUserProvider';

const HeaderMain = () => {
  const {
    user, logout, login, isConnected, setIsConnected,
  } = useContext(UserContext);
  const handleLogout = () => {
    logout();
  };
  // permet de transformer une valeur stockée dans le local
  // storage en string en un booléen afin de gérer un affichage conditionnel
  const toBooleanify = () => {
    if (isConnected === 'true') {
      setIsConnected(true);
    }
    else if (isConnected === 'false') {
      setIsConnected(false);
    }
  };
  useEffect(() => {
    toBooleanify();
  }, [login, logout]);

  return (
    <header className="headerMain">
      <div className="headerMain--container container">
        <Link to="/local-market">
          <img
            src={logoText}
            alt="logo"
            className="headerMain--container--logo logo"
          />
        </Link>
        <section className="headerMain-rightSection">
          <BasketButton />
          {isConnected ? (
            <Popup
              trigger={<Icon name="user" />}
              on="click"
              position="bottom right"
              wide="very"
            >
              <List>
                <List.Item>
                  <List.Icon name="user" />
                  <List.Content>
                    <List.Header>
                      {user.firstname} {user.lastname}
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="mail" />
                  <List.Content>
                    <List.Header>{user.email}</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="address card outline" />
                  <List.Content>
                    <Link to="/account">
                      <List.Header>Modifier mes informations </List.Header>
                    </Link>
                  </List.Content>
                </List.Item>
                <List.Item>
                <List.Icon name="unordered list" />
                <List.Content>
                  <Link to="/user/orders">
                    <List.Header>Liste des commandes</List.Header>
                  </Link>
                </List.Content>
              </List.Item>
              </List>
              <Button color="red" onClick={handleLogout}>
                Se déconnecter
              </Button>
            </Popup>
          ) : (
            <ConditionnalButton />
          )}
        </section>
      </div>
    </header>
  );
};

export default HeaderMain;
