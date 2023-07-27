import './styles.scss';
import { Card, Icon, Image } from 'semantic-ui-react';
import fruitLegume from '../../../Photo-Botiga/fruit-legume.png';

const LocalDescription = () => (
  <section className="description">
    <h2>Trouver les producteurs proches de chez vous</h2>
    <Card className="description--card">
      <Image
        className="producerCard--image"
        src={fruitLegume}
        wrapped
        ui={false}
      />
      <Card.Content className="producerCard--content">
        <Card.Header className="producerCard--title">
          {/* {info.name} */}
          Boulangerie du coin
        </Card.Header>
        <Card.Description className="producerCard--description">
          {/* {info.description} */}
          une courte description pour détailler le producteur
        </Card.Description>
      </Card.Content>
      <Card.Content extra className="producerCard--schedules">
        <a>
          <Icon name="clock" />
          Lundi-Vendredi 9h-18h
          {/* {info.schedules} */}
          {/* {info.phone} */}
        </a>
      </Card.Content>
    </Card>
  </section>
);
export default LocalDescription;
