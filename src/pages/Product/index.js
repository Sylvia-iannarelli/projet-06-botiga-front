import { useContext, useEffect, useState } from 'react';
import {
  Grid, Image, Card, Segment, Header, Button,
} from 'semantic-ui-react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HeaderMain from '../../components/HeaderMain';
import Footer from '../../components/Footer';
import './styles.scss';
import { BasketContext } from '../../utils/providers/useBasketProvider';

const Product = () => {
  const { product } = useParams();
  const navigate = useNavigate();

  const { addProduct } = useContext(BasketContext);

  const [productData, setProductData] = useState();

  const getProduct = async () => {
    try {
      const result = await axios.get(
        // URL
        `http://localhost:8000/api/products/${product}`,
      );
      setProductData(result.data);
    }
    catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="product">
      <HeaderMain />
      <section className="product--container">
        <Button onClick={() => navigate(-1)} color="teal">
          Retour
        </Button>
        <div className="product--layout">
          <article className="product--images">
              <img className="product--imgBig" src="https://react.semantic-ui.com/images/wireframe/image.png" />
              <div className="product--imageGroup">
                <img src="https://react.semantic-ui.com/images/wireframe/image.png" />
                <img src="https://react.semantic-ui.com/images/wireframe/image.png" />
                <img src="https://react.semantic-ui.com/images/wireframe/image.png" />
              </div>
          </article>
          <div className="product--info">
              {productData && (
                <Card>
                  <Card.Content>
                    <Card.Header>{productData.name}</Card.Header>
                    <Card.Meta>
                      <span className="date">{productData.store.name}</span>
                    </Card.Meta>
                    <Card.Description>
                      {productData.description}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Segment compact>
                      <h3 style={{ textAlign: 'center', margin: '0' }}>
                        {productData.price} €
                      </h3>
                    </Segment>
                    <Button
                      color="blue"
                      labelPosition="right"
                      icon="cart"
                      content="Ajouter 1 au panier"
                      onClick={() => {
                        toast.success("Le produit à été ajouté au panier", { theme: "colored", autoClose: 1200});
                        addProduct(productData);
                      }}
                    />
                  </Card.Content>
                </Card>
              )}

              <Segment>
                <Header as="h3">Informations supplémentaires</Header>
                <p>
                  Informations supplémentaires sur le produit. Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam.
                </p>
              </Segment>
            </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Product;
