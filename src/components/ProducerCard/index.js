import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';
import fruitLegume from '../../../Photo-Botiga/fruit-legume.png';

import './styles.scss';

const ProducerCard = ({ info }) => (
  <Card className="producerCard">
    <Image
      className="producerCard--image"
      src={fruitLegume}
      wrapped
      ui={false}
    />
    <Card.Content className="producerCard--content">
      <Card.Header className="producerCard--title">{info.name}</Card.Header>
      <Card.Description className="producerCard--description">
        {info.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra className="producerCard--schedules">
      <Icon name="clock" />
      {info.schedules}
    </Card.Content>
    <Card.Content extra>
      <Icon name="phone" />
      {info.phone}
    </Card.Content>
  </Card>
);

ProducerCard.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    schedules: PropTypes.string,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProducerCard;
