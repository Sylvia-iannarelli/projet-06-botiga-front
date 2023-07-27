import {
  Image, Divider, Input, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../styles.scss';

const BasketProduct = ({
  quantity,
  productName,
  price,
  index,
  setProductQuantity,
  handleDelete,
}) => {
  return (
    <>
      <div className="basket-product">
        <Image
          floated="left"
          size="small"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <h5>{productName}</h5>
        <h5>prix unitaire:{price}$</h5>
        <div className="basket-label">
          Quantité : {quantity}
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setProductQuantity(Number(e.target.value), index)}
          />
          {price * quantity}
          <div
            onClick={() => {
              handleDelete(index);
            }}
          >
            <Icon name="trash alternate outline" />
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};
BasketProduct.propTypes = {
  quantity: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  handleDelete: PropTypes.func.isRequired,
};

export default BasketProduct;
