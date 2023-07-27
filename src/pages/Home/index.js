import {
  Divider, Button, Image, Card,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import ConditionnalButton from '../../components/ConditionnalButton';
import './styles.scss';
import Footer from '../../components/Footer';
import LocateComponents from '../../components/LocateComponents';
import speech from '../../__mocks__/homeSpeech';

import logoText from '../../assets/images/logo-botiga/botiga_logo.png';

const Home = () => {
  return (
    <div className="home">
      <Fade duration={1500} triggerOnce>
        <div className="headerMain">
          <header className="headerMain--container container">
            <img
              className="headerMain--container--logo logo"
              src={logoText}
              alt="logo"
            />
            <ConditionnalButton />
          </header>
        </div>
        <div className="home--container">
          <p className="home-title">Botiga vous souhaite la bienvenue</p>
          <div className="home-centered">
            <LocateComponents />
            <Link to="/local-market">
              <Button color="green">rechercher</Button>
            </Link>
          </div>
        </div>
      </Fade>
      <Fade cascade damping={0.2} triggerOnce>
        <div className="home-cards">
          <Card.Group>
            {speech.map((speechInfo) => {
              return (
                <Card centered key={speechInfo.title}>
                  <Image src={speechInfo.image} />
                  <Card.Content>
                    <Card.Header>{speechInfo.title}</Card.Header>
                    <Card.Description>
                      {speechInfo.description}
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </div>
      </Fade>
      <Divider />
      <Footer />
    </div>
  );
};

export default Home;
