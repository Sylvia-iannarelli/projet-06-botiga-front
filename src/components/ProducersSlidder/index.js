import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.scss';
import { Placeholder } from 'semantic-ui-react';
import { Navigation } from 'swiper';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProducerCard from '../ProducerCard';
import { ProducerContext } from '../../utils/providers/useProducerProvider';

const ProducersSlidder = () => {
  const { producerData } = useContext(ProducerContext);

  return (
    <section className="producer">
      <h2 className="producer--title">Producteurs du coin</h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation
        modules={[Navigation]}
        loop
        className="producer--swiper"
        breakpoints={{
          // when window width is >= 640px
          1350: {
            width: 1350,
            slidesPerView: 4,
          },
          // when window width is >= 768px
          1060: {
            width: 1060,
            slidesPerView: 4,
          },
          730: {
            width: 730,
            slidesPerView: 3,
          },
          500: {
            width: 500,
            slidesPerView: 2,
          },
          300: {
            width: 300,
            slidesPerView: 1,
          },
          0: {
            width: 0,
            slidesPerView: 1,
          },
        }}
      >
        {producerData ? (
          // eslint-disable-next-line arrow-body-style
          producerData.reverse().map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Link to={`/local-market/${item.id}`}>
                  <ProducerCard info={item} />
                </Link>
              </SwiperSlide>
            );
          })
        ) : (
          <div>
            <SwiperSlide>
              <Placeholder style={{ height: 150, width: 150 }}>
                <Placeholder.Image />
              </Placeholder>
            </SwiperSlide>
            <SwiperSlide>
              <Placeholder style={{ height: 150, width: 150 }}>
                <Placeholder.Image />
              </Placeholder>
            </SwiperSlide>
            <SwiperSlide>
              <Placeholder style={{ height: 150, width: 150 }}>
                <Placeholder.Image />
              </Placeholder>
            </SwiperSlide>
          </div>
        )}
      </Swiper>
    </section>
  );
};

export default ProducersSlidder;
