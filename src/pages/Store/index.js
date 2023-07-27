import { useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Divider, Button, Icon,
} from 'semantic-ui-react';
import CardInfos from '../../components/CardInfos';
import HeaderMain from '../../components/HeaderMain';
import Footer from '../../components/Footer';
import fakeImage from '../../../Photo-Botiga/fruit-legume.png';
import './styles.scss';
import { ProducerContext } from '../../utils/providers/useProducerProvider';

const Store = () => {
  const navigate = useNavigate();

  const {
    producerData,
    producerProducts,
    getProductByProducer,
    getProducerById,
  } = useContext(ProducerContext);
  const { store } = useParams();

  useEffect(() => {
    getProductByProducer(store);
    getProducerById(store);
  }, []);
  return (
    <>
      <HeaderMain />
      <main className="store">
        <div className="store-background">
          <Button
            onClick={() => navigate(-1)}
            color="teal"
            className="store-custombutton"
          >
            Retour
          </Button>
        </div>
        <section className="store-description">
          {producerData.map((producer) => {
            return (
              <section key={producer.id}>
                <h1 className="store-customh1" key={producer.id}>
                  {producer.name}
                </h1>
                <p>{producer.schedules}</p>
                <div className="store-customsection">
                  <p>{producer.description}</p>
                  <p>
                    <span> {producer.city}</span>
                    <span> {producer.street}</span>
                    <span> {producer.zip}</span>
                  </p>
                  <a href={producer.website}>
                    Site internet <span><Icon name="linkify" /></span>
                  </a>
                </div>
              </section>
            );
          })}
          <Divider />
        </section>
        <div className="store-products">
          {producerProducts.map((product) => {
            return (
              <Link
                key={product.id}
                to={`/local-market/${store}/${product.id}`}
              >
                <CardInfos
                  props={product}
                  image={fakeImage}
                  className="store-product"
                />
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Store;
