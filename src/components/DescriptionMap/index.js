import MapsGoogle from '../MapsGoogle';
import './styles.scss';

const DescriptionMap = () => (
  <section className="descriptionMap">
    <div className="descriptionMap--container container">
      <h2>Trouver des producteurs proches de chez vous</h2>
      <MapsGoogle />
    </div>
  </section>
);
export default DescriptionMap;
