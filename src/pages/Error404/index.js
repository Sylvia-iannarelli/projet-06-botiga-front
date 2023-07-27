import { Link } from 'react-router-dom';
import { MouseParallaxContainer, MouseParallaxChild } from 'react-parallax-mouse';
import HeaderMain from '../../components/HeaderMain';
import Footer from '../../components/Footer';
import farmer1 from './paysan1.png';
import farmer2 from './paysan2.png';
import farmer3 from './paysan3.png';
import farmer4 from './paysan4.png';
import bg from './bg.jpg';

import './styles.scss';

const Error404 = () => {
  return (
    <div className="error404">
      <HeaderMain />
      <main className="error404--container">
        <div className="error404--container--ground">
          <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
            <MouseParallaxChild factorX={0} factorY={0}>
              <img src={bg} className="error404--container--ground--bg" />
            </MouseParallaxChild>
            <MouseParallaxChild factorX={-0.3} factorY={0.2}>
              <img src={farmer1} className="error404--container--ground--farmer farmer1" />
            </MouseParallaxChild>
            <MouseParallaxChild factorX={0.1} factorY={0.4}>
              <img src={farmer2} className="error404--container--ground--farmer farmer2" />
            </MouseParallaxChild>
            <MouseParallaxChild factorX={-0.1} factorY={0.2}>
              <div className="error404--messageContainer">
                <h2 className="error404--messageContainer--title">404</h2>
                <p className="error404--messageContainer--message">Il semblerait que cette page n'existe pas. </p>
                <Link to="/local-market">
                  <span>cliquer ici pour revenir à l'accueil</span>
                </Link>
              </div>
            </MouseParallaxChild>
            <MouseParallaxChild factorX={-0.1} factorY={0.15}>
              <img src={farmer3} className="error404--container--ground--farmer farmer3" />
            </MouseParallaxChild>
            <MouseParallaxChild factorX={-0.2} factorY={-0.2}>
              <img src={farmer4} className="error404--container--ground--farmer farmer4" />
            </MouseParallaxChild>
          </MouseParallaxContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Error404;
