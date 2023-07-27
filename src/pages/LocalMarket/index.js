import CategoriesSlidder from '../../components/CategoriesSlidder';
import DescriptionMap from '../../components/DescriptionMap';
import Footer from '../../components/Footer';
import HeaderMain from '../../components/HeaderMain';
import ProducersSlidder from '../../components/ProducersSlidder';
import './styles.scss';

const LocalMarket = () => {
  return (
    <div className="home-container">
      <HeaderMain />
      <CategoriesSlidder />
      <main>
        <DescriptionMap />
        <ProducersSlidder />
        <ProducersSlidder />
      </main>
      <Footer />
    </div>
  );
};

export default LocalMarket;
