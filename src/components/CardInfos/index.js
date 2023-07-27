import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import './styles.scss';

const CardInfos = ({ props, image }) => {
  return (
    <div className="customCard">
      <Card centered>
        <Image src={image} />
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Meta>
            <span className="date"> Produit de qualité</span>
          </Card.Meta>
          <Card.Description>{props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {props.price} € / {props.unitOfMeasurement}
        </Card.Content>
      </Card>
    </div>
  );
};
CardInfos.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  unitOfMeasurement: PropTypes.string,
  price: PropTypes.string,
  props: PropTypes.object,
};
CardInfos.defaultProps = {
  name: null,
  image: null,
  description: null,
  unitOfMeasurement: null,
  price: null,
  props: null,
};
export default CardInfos;
