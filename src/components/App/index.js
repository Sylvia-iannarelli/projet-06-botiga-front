import './styles.scss';
import { ToastContainer } from 'react-toastify';
import useAddressProvider, {
  AddressContext,
} from '../../utils/providers/useAddressProvider';
import useProducerProvider, {
  ProducerContext,
} from '../../utils/providers/useProducerProvider';
import useUserProvider, {
  UserContext,
} from '../../utils/providers/useUserProvider';
import useBasketProvider, {
  BasketContext,
} from '../../utils/providers/useBasketProvider';
import AppRoutes from '../../utils/AppRoutes';
// import { AllProviders } from '../../utils/providers';
// TODO changer en flechées
function App() {
  // use context remplace consumer
  // et nous permet de passer dans le provider data qui nous vient de Adress context
  // on englobe tout le projet de se provider
  const dataProducerContext = useProducerProvider();
  const dataAdresseContext = useAddressProvider();
  const dataUserContext = useUserProvider();
  const dataBasketContext = useBasketProvider();

  return (
    <div className="app">
      <UserContext.Provider value={dataUserContext}>
        <BasketContext.Provider value={dataBasketContext}>
          <ProducerContext.Provider value={dataProducerContext}>
            <AddressContext.Provider value={dataAdresseContext}>
              <ToastContainer />
              <AppRoutes />
            </AddressContext.Provider>
          </ProducerContext.Provider>
        </BasketContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
export default App;
